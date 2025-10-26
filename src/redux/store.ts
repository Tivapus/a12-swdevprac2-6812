import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { bookSlice } from "./features/bookSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['bookSlice'] // Only bookSlice will be persisted
};

const rootReducer = combineReducers({
    bookSlice: bookSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;