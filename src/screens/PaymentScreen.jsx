import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../features/cartSlice";

const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const { shippingInfo } = cart;

  if (!shippingInfo.address) {
    navigate("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div className="p-5">
      <CheckoutSteps step1 step2 step3 />

      <form onSubmit={submitHandler} className="max-w-md mx-auto">
        <fieldset className="mb-4">
          <legend className="text-lg font-semibold mb-2">Select Method</legend>

          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked={paymentMethod === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="PayPal" className="flex-1 cursor-pointer">
              PayPal or Credit Card
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              checked={paymentMethod === "Stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="Stripe" className="flex-1 cursor-pointer">
              Stripe
            </label>
          </div>
        </fieldset>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default PaymentScreen;
