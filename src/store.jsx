import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./features/productSlice";
import cartReducer from "./features/cartSlice";
import userReducer from "./features/userSlice";
import categoryReducer from "./features/categorySlice";





const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    user: userReducer,
    categories: categoryReducer,




  },
});

store.subscribe(() => {
  localStorage.setItem("cart", JSON.stringify(store.getState().cart));
});

export default store;
