import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { Link, useNavigate } from 'react-router-dom';
import { addOrder } from '../features/orderSlice';
import { clearCart } from '../features/cartSlice';
import { Alert, Paper, Box, Typography, Button, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);
  const [orderDetails, setOrderDetails] = useState({});
  const orderData = useSelector((state) => state.order);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * 1, 0);
    const shippingPrice = itemsPrice >= 100 ? 0 : 10;
    const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
    const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));

    setOrderDetails({
      ...cart,
      itemsPrice: itemsPrice.toFixed(2),
      shippingPrice: shippingPrice.toFixed(2),
      taxPrice: taxPrice.toFixed(2),
      totalPrice: totalPrice.toFixed(2),
    });
  }, [cart]);

  const placeOrderHandler = () => {
    dispatch(
      addOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingInfo,
        paymentMethod: cart.paymentMethod,
        itemsPrice: orderDetails.itemsPrice,
        shippingPrice: orderDetails.shippingPrice,
        taxPrice: orderDetails.taxPrice,
        totalPrice: orderDetails.totalPrice,
      })
    ).then((newOrder) => {
      if (newOrder.payload && !newOrder.error) {
        navigate(`/order/${newOrder.payload.id}`);
        dispatch(clearCart());
      } else {
        setError(orderData.error.detail);
      }
    }).catch((error) => {
      setError("Something went wrong. Please try again.");
    });
  };

  const getColorMappingString = (colors) => {
    const mappingString = colors
      .map((colorObj) => {
        const [meshName, colorName] = Object.entries(colorObj)[0];
        return `${meshName}: ${colorName}`;
      })
      .join(", ");

    return mappingString.length > 50 ? `${mappingString.substring(0, 100)}...` : mappingString;
  };

  return (
    <Box className="m-4">
      <CheckoutSteps step1 step2 step3 step4 />
      {error && <Alert severity="error">{error}</Alert>}

      <Box className="flex flex-col md:flex-row gap-8">
        {/* Shipping Information */}
        <Box className="flex-grow">
          <Paper elevation={1} sx={{ mb: 6, p: 3 }}>
            <Typography variant="h5" gutterBottom>Shipping</Typography>
            <Typography variant="body1">
              <strong>Shipping:</strong> {cart.shippingInfo.address}, {cart.shippingInfo.city} {cart.shippingInfo.postalCode}, {cart.shippingInfo.country}
            </Typography>
          </Paper>

          {/* Payment Method */}
          <Paper elevation={1} sx={{ mb: 6, p: 3 }}>
            <Typography variant="h5" gutterBottom>Payment Method</Typography>
            <Typography variant="body1">
              <strong>Method: </strong> {cart.paymentMethod}
            </Typography>
          </Paper>

          {/* Order Items */}
          <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Order Items</Typography>
            <List>
              {cart.cartItems.length === 0 ? (
                <Alert severity="info">Your cart is empty</Alert>
              ) : (
                cart.cartItems.map((item, index) => (
                  <ListItem key={index} divider>
                    <ListItemIcon>
                      <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', borderRadius: '8px' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={<Link to={`/product/${item.product}`} style={{ textDecoration: 'none', color: '#1976d2' }}>{item.name}</Link>}
                      secondary={`Size: ${item.size.size} - ${getColorMappingString(item.colors)}`}
                    />
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{item.price} €</Typography>
                  </ListItem>
                ))
              )}
            </List>
          </Paper>
        </Box>

        {/* Order Summary */}
        <Box sx={{ width: '100%', maxWidth: '400px' }}>
          <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Order Summary</Typography>
            <Box sx={{ my: 2 }}>
              <Typography variant="body1" gutterBottom>Items: {orderDetails.itemsPrice} €</Typography>
              <Typography variant="body1" gutterBottom>Shipping: {orderDetails.shippingPrice} €</Typography>
              <Typography variant="body1" gutterBottom>Tax: {orderDetails.taxPrice} €</Typography>
              <Typography variant="h6" gutterBottom>Total: {orderDetails.totalPrice} €</Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={placeOrderHandler}
              disabled={cart.cartItems.length === 0}
              sx={{ mt: 2 }}
            >
              Place Order
            </Button>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default PlaceOrderScreen;
