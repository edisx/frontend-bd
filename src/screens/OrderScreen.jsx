import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../features/orderSlice";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { payOrder } from "../features/orderSlice";
import { deliverOrder } from "../features/orderSlice";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  // Fetch order data when the component mounts
  useEffect(() => {
    dispatch(getOrderById(id));
  }, [dispatch, id]);

  // Access the order data from the Redux store
  const orderData = useSelector((state) => state.order.currentOrder);
  const userInfo = useSelector((state) => state.user.userInfo);

  if (!orderData) {
    return <Loader />;
  }

  const handleMarkAsDelivered = () => {
    dispatch(deliverOrder(orderData.id));
  }

  return (
    <div className="flex flex-wrap md:flex-nowrap justify-between p-4 gap-4">
      <div className="md:w-1/2 space-y-6">
        {/* Shipping Information */}
        <div className="bg-white p-4 rounded shadow-lg border border-gray-200">
          <h2 className="font-bold text-lg text-gray-800">Shipping</h2>
          <p className="text-gray-600">
            {orderData.shippingAddress.address},{" "}
            {orderData.shippingAddress.city}
          </p>
          <p className="text-gray-600">
            {orderData.shippingAddress.postal_code},{" "}
            {orderData.shippingAddress.country}
          </p>
          <p
            className={`${
              orderData.is_delivered ? "text-green-500" : "text-red-500"
            } font-semibold`}
          >
            {orderData.is_delivered ? "Delivered" : "Not Delivered"}
          </p>
        </div>

        {/* Payment Method */}
        <div className="bg-white p-4 rounded shadow-lg border border-gray-200">
          <h2 className="font-bold text-lg text-gray-800">Payment Method</h2>
          <p className="text-gray-600">{orderData.payment_method}</p>
          <p
            className={`${
              orderData.is_paid ? "text-green-500" : "text-red-500"
            } font-semibold`}
          >
            {orderData.is_paid ? "Paid" : "Not Paid"}
          </p>
        </div>

        {/* Order Items */}
        <div className="bg-white p-4 rounded shadow-lg border border-gray-200">
          <h2 className="font-bold text-lg text-gray-800">Order Items</h2>
          {orderData.orderItems.map((item) => (
            <div key={item.id} className="border-b border-gray-200 py-2">
              <p className="text-gray-600">
                {item.name} - ${item.price}
              </p>
              {/* image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="md:w-1/2 bg-gray-50 p-4 rounded shadow-lg">
        <h2 className="font-bold text-lg text-gray-800">Order Summary</h2>
        <div className="space-y-2">
          <p className="text-gray-600">
            Items: $
            {orderData.orderItems
              .reduce((acc, item) => acc + parseFloat(item.price), 0)
              .toFixed(2)}
          </p>
          <p className="text-gray-600">Shipping: ${orderData.shipping_price}</p>
          <p className="text-gray-600">Tax: ${orderData.tax_price}</p>
          <p className="text-gray-600 font-bold">
            Total: ${orderData.total_price}
          </p>
        </div>
        {/* paypal part */}
        {!orderData.is_paid && (
          <div className="mt-4">
            <PayPalScriptProvider
              options={{
                "client-id":
                  "ATjFh9E-QHXFcxUFOst0Pdt5d7mv0yS8kZc-7Fz7eY0B5H06vOicLq9EAWmuHPGgV7yPaqTWsN52sKHV",
              }}
            >
              <PayPalButtons
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: orderData.total_price,
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then(function (details) {
                    // alert('Transaction completed by ' + details.payer.name.given_name);

                    dispatch(
                      payOrder({ id: orderData.id, paymentResult: details })
                    );
                  });
                }}
              ></PayPalButtons>
            </PayPalScriptProvider>
          </div>
        )}
        {/* if user is admin and order is paid */}
        {userInfo && userInfo.isAdmin && orderData.is_paid && !orderData.is_delivered && (
          <div className="mt-4">
            <button
              onClick={handleMarkAsDelivered}
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Mark As Delivered
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default OrderScreen;
