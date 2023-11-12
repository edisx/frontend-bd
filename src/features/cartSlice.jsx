import { createSlice } from "@reduxjs/toolkit";

let savedCart;
try {
  savedCart = JSON.parse(localStorage.getItem("cart"));
} catch (error) {
  console.error("Error parsing cart from localStorage", error);
}

const defaultState = {
  cartItems: [],
  shippingInfo: {},
  paymentMethod: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState: savedCart ? savedCart : defaultState,
  reducers: {
    addToCart: (state, action) => {
      // Simply add the new item to the cart without qty
      const item = action.payload;
      state.cartItems.push(item);
    },
    removeFromCart: (state, action) => {
      const uniqueId = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.uniqueId !== uniqueId
      );
    },
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingInfo,
  savePaymentMethod,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
