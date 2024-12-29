import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import loaderReducer from './slices/loaderSlice';
import userReducer from './slices/userSlice';






export const makeStore = () => {
    return configureStore({
        reducer: {
            counter: counterReducer,
            loader: loaderReducer,
            user:userReducer

        },
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];