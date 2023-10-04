import { configureStore } from "@reduxjs/toolkit";

import productAllReducer from "./features/productAllSlice";
import productSingleReducer from "./features/productSingleSlice";




const store = configureStore({
  reducer: {
    productAll: productAllReducer,
    productSingle: productSingleReducer,




  },
});

export default store;
