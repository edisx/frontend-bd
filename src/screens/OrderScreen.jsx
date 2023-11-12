import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../features/orderSlice";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  // Fetch order data when the component mounts
  useEffect(() => {
    dispatch(getOrderById(id));
  }, [dispatch, id]);

  // Access the order data from the Redux store
  const orderData = useSelector((state) => state.order.currentOrder);

  if (!orderData) {
    return <Loader />;
  }

  return (
    <div className="flex justify-between p-4">
      <div className="w-1/2 space-y-6">
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-bold">Shipping</h2>
          <p>
            {orderData.shippingAddress.address},{" "}
            {orderData.shippingAddress.city}
          </p>
          <p>
            {orderData.shippingAddress.postal_code},{" "}
            {orderData.shippingAddress.country}
          </p>
          <p>{orderData.is_delivered ? "Delivered" : "Not Delivered"}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-bold">Payment Method</h2>
          <p>{orderData.payment_method}</p>
          <p>{orderData.is_paid ? "Paid" : "Not Paid"}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-bold">Order Items</h2>
          {orderData.orderItems.map((item) => (
            <div key={item.id}>
              <p>
                {item.name} - ${item.price}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="w-1/2 bg-gray-200 p-4 rounded">
        <div>
          <h2 className="font-bold">Order Summary</h2>
          <p>
            Items: $
            {orderData.orderItems
              .reduce((acc, item) => acc + parseFloat(item.price), 0)
              .toFixed(2)}
          </p>
          <p>Shipping: ${orderData.shipping_price}</p>
          <p>Tax: ${orderData.tax_price}</p>
          <p>Total: ${orderData.total_price}</p>
        </div>
        <div>
            pay here
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
