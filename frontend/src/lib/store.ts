import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import createWebStorage from "redux-persist/es/storage/createWebStorage";

import {userAPI} from "@/lib/services/UserService";
import {weatherAPI} from "@/lib/services/WeatherService";

import userReducer from './reducers/userSlice';

const createNoopStorage = () => {
    return {
        getItem() {
            return Promise.resolve(null);
        },
        setItem(_key: string, value: number) {
            return Promise.resolve(value);
        },
        removeItem() {
            return Promise.resolve();
        },
    };
};

const storage =
  typeof window !== "undefined"
      ? createWebStorage("local")
      : createNoopStorage();

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['userReducer']
}

const rootReducer = combineReducers({
    userReducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [weatherAPI.reducerPath]: weatherAPI.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(userAPI.middleware).concat(weatherAPI.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
