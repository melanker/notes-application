import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import http from "../utils/http";

const initialState = {
    notes: [],
    errors: null,
}

const getHandler = async (url, {rejectWithValue}) => {
    try {
        const response = await http.get(url)
        return response.data;
    }
    catch (err) {
        return rejectWithValue(err.toJSON().message)
    }
}

export const getNotes = createAsyncThunk(
    'notes/getNotes',
    getHandler
)

export const deleteNote = createAsyncThunk(
    'notes/deleteNode',
    async (noteId, {rejectWithValue}) => {
        try {
            const response = await http.delete(`api/note/${noteId}`)
            return response.data;
        }
        catch (err) {
            return rejectWithValue(err.toJSON().message)
        }
    }
)

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        initNotes: (state, action) => {
            state.errors = null;
            state.notes = [];
        },
    },
    extraReducers:
        (builder) => {
            builder
                .addCase(getNotes.fulfilled, (state, action) => {
                    state.loading = false
                    state.notes = action.payload?.data;
                })
                .addCase(deleteNote.fulfilled, (state, action) => {
                    state.loading = false
                    state.notes = state.notes.filter((note) => note._id !== action.payload?.data?._id);
                })
                .addMatcher(
                    // matcher can be defined inline as a type predicate function
                    (action) => action.type.endsWith('getNotes/rejected'),
                    (state, action) => {
                        state.loading = false
                        state.errors = action.payload;
                    }
                )
                // matcher can just return boolean and the matcher can receive a generic argument
                .addMatcher(
                    (action) => action.type.endsWith('notes/pending'),
                    (state, action) => {
                        state.loading = true
                        state.errors = null
                    }
                )
        }
})

// Action creators are generated for each case reducer function
export const {initNotes} = notesSlice.actions;

export default notesSlice.reducer;
