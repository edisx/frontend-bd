import { configureStore } from "@reduxjs/toolkit";

import productAllReducer from "./features/productAllSlice";




const store = configureStore({
  reducer: {
    productAll: productAllReducer,




  },
});

export default store;
