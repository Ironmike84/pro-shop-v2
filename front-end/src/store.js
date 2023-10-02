import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './Slices/apiSlice';
import authSliceReducer from './Slices/authSlice';
import cartSliceReducer from './Slices/cartSlice';

const store = configureStore({
    reducer : {
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartSliceReducer,
        auth: authSliceReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
    
});

export default store;