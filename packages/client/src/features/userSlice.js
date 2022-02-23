import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import http from "../utils/http";

const initialState = {
    userId: null,
    email: null,
    loading: false,
    errors: null,
}

const postUser = async (data, {rejectWithValue}) => {
    try {
        const response = await http.post(data.url, data.body)
        return response.data;
    }
    catch (err) {
        return rejectWithValue(err.response.data)
    }
}

export const addUser = createAsyncThunk(
    'user/signup',
    postUser
)

export const verifyToken = createAsyncThunk(
    'user/verifyToken',
    async (data = {}, {rejectWithValue}) => {
        try {
            const response = await http.get('user/verify')
            return response.data;
        }
        catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const logoutUser = createAsyncThunk(
    'user/logout',
    async (data = {}, {rejectWithValue}) => {
        try {
            const response = await http.get('user/logout')
            return response.data;
        }
        catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // setCurrentCity: (state, action) => {
        //     state.currentCity = action.payload
        // },
        // addToFavorites: (state, action) => {
        //     state.favorites.push(action.payload);
        //
        //     if (state.favorites.length > 5) {
        //         state.favorites.shift();
        //     }
        // },
        // removeFromFavorites: (state, action) => {
        //     const index = state.favorites.findIndex( city => city.Key === action.payload)
        //
        //     state.favorites.splice(index, 1);
        // }
    },
    extraReducers:
        (builder) => {
            builder
                .addCase(addUser.fulfilled, (state, action) => {
                    state.loading = false
                    state.userId = action.payload.userId;
                })
                .addCase(addUser.rejected, (state, action) => {
                    state.loading = false
                    state.errors = action.payload?.errors;
                })
                .addCase(addUser.pending, (state, action) => {
                    state.loading = true
                    state.errors = null
                })
                .addCase(verifyToken.fulfilled, (state, action) => {
                    state.loading = false
                    state.email = action.payload.email;
                })
                .addCase(logoutUser.fulfilled, (state, action) => {
                    state.loading = false
                    state.email = null;
                    state.userId = null;
                })
        }
})

// Action creators are generated for each case reducer function
export const {} = userSlice.actions;

export default userSlice.reducer;
