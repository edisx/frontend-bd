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
    // cart
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find(
        (x) => x.product === item.product && x.size === item.size
      );

      if (existItem) {
        // You can increment the quantity here if desired or replace the existing item
        state.cartItems = state.cartItems.map((x) =>
          x.product === existItem.product && x.size === existItem.size
            ? { ...item, qty: existItem.qty + 1 }
            : x
        );
      } else {
        state.cartItems.push({ ...item, qty: 1 }); // Every time a new item is added, qty will be 1
      }
    },
    removeFromCart: (state, action) => {
      const uniqueId = action.payload; // Payload is the uniqueId
      state.cartItems = state.cartItems.filter(
        (item) => item.uniqueId !== uniqueId
      );
    },
    // shipping
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
    },
    // payment
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    // remove all items from cart
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
