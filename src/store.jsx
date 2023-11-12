import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./features/productSlice";
import cartReducer from "./features/cartSlice";
import userReducer from "./features/userSlice";
import categoryReducer from "./features/categorySlice";
import sizeReducer from "./features/sizeSlice";
import colorReducer from "./features/colorSlice";
import orderReducer from "./features/orderSlice";





const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    user: userReducer,
    categories: categoryReducer,
    sizes: sizeReducer,
    colors: colorReducer,
    order: orderReducer,




  },
});

store.subscribe(() => {
  localStorage.setItem("cart", JSON.stringify(store.getState().cart));
  localStorage.setItem("colors", JSON.stringify(store.getState().colors));
});

export default store;
