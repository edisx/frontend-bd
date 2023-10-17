import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./features/productSlice";
import cartReducer from "./features/cartSlice";
import userReducer from "./features/userSlice";




const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    user: userReducer,




  },
});

store.subscribe(() => {
  localStorage.setItem("cart", JSON.stringify(store.getState().cart));
});

export default store;
