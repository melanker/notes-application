import { configureStore } from '@reduxjs/toolkit'
import userSlice from "./features/userSlice";
import notesSlice from "./features/notesSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        notes: notesSlice,
    },
})

export default store;
