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
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.product === existItem.product ? item : x
        );
      } else {
        state.cartItems.push(item);
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (x) => x.product !== action.payload
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
