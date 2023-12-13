import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../features/orderSlice";
import { useParams } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { payOrder } from "../features/orderSlice";
import {
  updateOrderToShipped,
  resetOrderToUnshipped,
  updateOrderToDelivered,
  resetOrderToUndelivered,
} from "../features/orderSlice";
import { getSizes } from "../features/sizeSlice";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Alert } from "@mui/material";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Paper,
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch order data when the component mounts
  useEffect(() => {
    dispatch(getOrderById(id));
    dispatch(getSizes());
  }, [dispatch, id]);

  // Access the order data from the Redux store
  const orderData = useSelector((state) => state.order.currentOrder);
  const error = useSelector((state) => state.order.error?.detail);
  const userInfo = useSelector((state) => state.user.userInfo);
  const sizes = useSelector((state) => state.sizes.sizes);

  const orderTotalRef = useRef(orderData?.total_price);

  useEffect(() => {
    orderTotalRef.current = orderData?.total_price;
  }, [orderData?.total_price]);

  useEffect(() => {
    if (error) {
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

  const handleMarkAsShipped = () => {
    dispatch(updateOrderToShipped(orderData.id));
  };

  const handleUnmarkAsShipped = () => {
    dispatch(resetOrderToUnshipped(orderData.id));
  };

  const handleMarkAsDelivered = () => {
    dispatch(updateOrderToDelivered(orderData.id));
  };

  const handleUnmarkAsDelivered = () => {
    dispatch(resetOrderToUndelivered(orderData.id));
  };

  const getColorMappingString = (colors) => {
    const mappingString = colors
      .map((colorObj) => {
        const [meshName, colorName] = Object.entries(colorObj)[0];
        return `${meshName}: ${colorName}`;
      })
      .join(", ");

    return mappingString;
};


  const getSizeFromId = (sizeId) => {
    return sizes.find((size) => size.id === sizeId) || { size: "" };
  };

  if (!orderData || !sizes) {
    return <CircularProgress />;
  }

  return (
    <Box className="m-4">
      {error && <Alert severity="error">{error}</Alert>}
      <Box className="flex flex-col md:flex-row gap-8">
        {/* Shipping Information */}
        <Box className="flex-grow">
          <Paper elevation={1} sx={{ mb: 6, p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Shipping
            </Typography>
            <Typography variant="body1">
              <strong>Address:</strong> {orderData.shippingAddress.address},{" "}
              {orderData.shippingAddress.city}
            </Typography>
            <Typography variant="body1">
              <strong>Postal Code:</strong>{" "}
              {orderData.shippingAddress.postal_code},{" "}
              {orderData.shippingAddress.country}
            </Typography>
            {/* shipped status*/}
            <Typography
              variant="body1"
              color={orderData.is_shipped ? "green" : "red"}
            >
              <strong>Shipping status:</strong>{" "}
              {orderData.is_shipped ? "Shipped" : "Not Shipped"}
            </Typography>

            <Typography
              variant="body1"
              color={orderData.is_delivered ? "green" : "red"}
            >
              <strong>Delivery status:</strong>{" "}
              {orderData.is_delivered ? "Delivered" : "Not Delivered"}
            </Typography>
          </Paper>

          {/* Payment Method */}
          <Paper elevation={1} sx={{ mb: 6, p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Payment Method
            </Typography>
            <Typography variant="body1">
              <strong>Method:</strong> {orderData.payment_method}
            </Typography>
            <Typography
              variant="body1"
              color={orderData.is_paid ? "green" : "red"}
            >
              <strong>Status:</strong> {orderData.is_paid ? "Paid" : "Not Paid"}
            </Typography>
          </Paper>

          {/* Order Items */}
          <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Order Items
            </Typography>
            <List>
              {orderData.orderItems.map((item, index) => (
                <ListItem key={index} divider className="flex flex-row gap-4">
                  <ListItemIcon>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "8px",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    secondary={`Size: ${
                      getSizeFromId(item.size).size
                    } - ${getColorMappingString(item.colors)}`}
                  />
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    ${item.price}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>

        {/* Order Summary */}
        <Box sx={{ width: "100%", maxWidth: "400px" }}>
          <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Order Summary
            </Typography>
            <Box sx={{ my: 2 }}>
              <Typography variant="body1" gutterBottom>
                Items: $
                {orderData.orderItems
                  .reduce((acc, item) => acc + parseFloat(item.price), 0)
                  .toFixed(2)}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Shipping: ${orderData.shipping_price}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Tax: ${orderData.tax_price}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Total: ${orderData.total_price}
              </Typography>
            </Box>
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
            {userInfo && userInfo.isAdmin && orderData.is_paid && (
              <div className="mt-4 flex space-x-2">
                {orderData.is_shipped ? (
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={handleUnmarkAsShipped}
                  >
                    Unmark As Shipped
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleMarkAsShipped}
                  >
                    Mark As Shipped
                  </Button>
                )}

                {orderData.is_delivered ? (
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={handleUnmarkAsDelivered}
                  >
                    Unmark As Delivered
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleMarkAsDelivered}
                  >
                    Mark As Delivered
                  </Button>
                )}
              </div>
            )}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderScreen;
