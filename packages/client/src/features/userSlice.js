import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import http from "../utils/http";

const initialState = {
    notes: [],
    user: null,
    loading: false,
}

export const addUser = createAsyncThunk(
    'user/signup',
    async (body) => {
        const response = await http.post('user/signup', body)

        return response.data;
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
                    state.userId = action?.userId;
                })
                .addMatcher(
                    // matcher can be defined inline as a type predicate function
                    (action) => action.type.endsWith('/rejected'),
                    (state, action) => {
                        state.loading = false
                    }
                )
                // matcher can just return boolean and the matcher can receive a generic argument
                .addMatcher(
                    (action) => action.type.endsWith('/pending'),
                    (state, action) => {
                        state.loading = true
                    }
                )
        }
})

// Action creators are generated for each case reducer function
export const {} = userSlice.actions;

export default userSlice.reducer;
