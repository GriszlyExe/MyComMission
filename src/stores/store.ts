// Import reducers
import { authReducer } from "./features/authSlice";
import { userReducer } from "./features/userSlice";
import { postReducer } from "./features/postSlice";
import { reviewReducer } from "./features/reviewSlice";
import { chatReducer } from "./features/chatSlice";
import { commissionReducer } from "./features/commisionSlice";

import { configureStore, combineReducers, createAction } from '@reduxjs/toolkit';
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist"
import storage from 'redux-persist/lib/storage';
import { adminReducer } from "./features/adminSlice";

export const resetState = createAction("resetState");

const appReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    post: postReducer,
    review: reviewReducer,
    chat: chatReducer,
    commission: commissionReducer,
    admin: adminReducer,
});

const rootReducer = (state: any, action: any) => {
    if (action.type === resetState.type) {
        storage.removeItem("persist:root"); 
        return appReducer(undefined, action);  
    }
    return appReducer(state, action);
};

const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER
                ]
            }
        }),
})

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>

export default store;