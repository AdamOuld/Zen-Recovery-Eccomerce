import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducer";
import wishlistReducer from "./reducers/wishlistReducer";

const rootReducer = {
  cart: cartReducer,
  wishlist: wishlistReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
