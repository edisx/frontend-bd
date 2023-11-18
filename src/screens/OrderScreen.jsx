import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../features/orderSlice";
import { useParams } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { payOrder } from "../features/orderSlice";
import { deliverOrder } from "../features/orderSlice";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Alert } from "@mui/material";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch order data when the component mounts
  useEffect(() => {
    dispatch(getOrderById(id));
  }, [dispatch, id]);

  // Access the order data from the Redux store
  const orderData = useSelector((state) => state.order.currentOrder);
  const error = useSelector((state) => state.order.error?.detail);
  const userInfo = useSelector((state) => state.user.userInfo);

  const orderTotalRef = useRef(orderData?.total_price);

  useEffect(() => {
    orderTotalRef.current = orderData?.total_price;
  }, [orderData?.total_price]);

  useEffect(() => {
    if (error) {
      console.log(error);
      console.log(error.status);
      navigate("/");
    }
  }, [error, navigate]);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: orderTotalRef.current,
          },
        },
      ],
    });
  };

  const handleMarkAsDelivered = () => {
    dispatch(deliverOrder(orderData.id));
  };

  const getColorMappingString = (colors) => {
    const mappingString = colors
      .map((colorObj) => {
        const [meshName, colorName] = Object.entries(colorObj)[0];
        return `${meshName}: ${colorName}`;
      })
      .join(", ");

    return mappingString.length > 20
      ? `${mappingString.substring(0, 100)}...`
      : mappingString;
  };

  if (!orderData) {
    return <CircularProgress />;
  }

  return (
    <div className="flex flex-wrap md:flex-nowrap justify-between p-4 gap-4">
      <div className="md:w-1/2 space-y-6">
        {/* Shipping Information */}
        <div className="bg-white p-4 rounded shadow-md border border-gray-200">
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
        <div className="bg-white p-4 rounded shadow-md border border-gray-200">
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
        <Card className="bg-white p-4 rounded shadow-md border border-gray-200">
          <Typography variant="h5" gutterBottom>
            Order Items
          </Typography>
          {orderData.orderItems.map((item) => (
            <Grid container spacing={2} key={item.id} className="py-2">
              <Grid item xs={3}>
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover"
                />
              </Grid>
              <Grid item xs={6}>
                <CardContent>
                  <Typography variant="subtitle1">{item.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Size: {item.size.size} -{" "}
                    {getColorMappingString(item.colors)}
                  </Typography>
                </CardContent>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" color="textPrimary">
                  ${item.price}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Card>
      </div>

      {/* Order Summary */}
      <div className="md:w-1/2 bg-gray-50 p-4 rounded shadow-md">
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
        {orderData && !orderData.is_paid && orderData.total_price > 0 && (
          <div className="mt-4">
            <PayPalScriptProvider
              options={{
                "client-id":
                  "ATjFh9E-QHXFcxUFOst0Pdt5d7mv0yS8kZc-7Fz7eY0B5H06vOicLq9EAWmuHPGgV7yPaqTWsN52sKHV",
              }}
            >
              <PayPalButtons
                createOrder={createOrder}
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
        {userInfo &&
          userInfo.isAdmin &&
          orderData.is_paid &&
          !orderData.is_delivered && (
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
