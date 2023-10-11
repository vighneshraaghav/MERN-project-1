import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';
import {combineReducers} from '@reduxjs/toolkit';

const persistConfig = {
  key: "root",
  storage
};

const reducer = combineReducers({
  auth: authSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer:persistedReducer,
  middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
});

export default store;