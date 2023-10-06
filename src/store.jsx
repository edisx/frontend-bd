import { configureStore } from "@reduxjs/toolkit";

import productAllReducer from "./features/productAllSlice";
import productSingleReducer from "./features/productSingleSlice";
import cartReducer from "./features/cartSlice";
import userReducer from "./features/userSlice";




const store = configureStore({
  reducer: {
    productAll: productAllReducer,
    productSingle: productSingleReducer,
    cart: cartReducer,
    user: userReducer,




  },
});

store.subscribe(() => {
  localStorage.setItem("cart", JSON.stringify(store.getState().cart));
});

export default store;
