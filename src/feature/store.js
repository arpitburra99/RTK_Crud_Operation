import { configureStore } from "@reduxjs/toolkit";
import { todosApi } from "./todos/todoSlice";

const store = configureStore({
    reducer: {
        [todosApi.reducerPath]: todosApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(todosApi.middleware),
});

export default store;