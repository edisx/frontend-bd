import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingInfo } from '../features/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';

const ShippingScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const userInfo = useSelector((state) => state.user.userInfo);
  const { shippingInfo } = cart;

  const dispatch = useDispatch();

  const [address, setAddress] = useState(shippingInfo.address || '');
  const [city, setCity] = useState(shippingInfo.city || '');
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode || '');
  const [country, setCountry] = useState(shippingInfo.country || '');

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingInfo({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <Box sx={{ p: 5 }}>
      <CheckoutSteps step1 step2 />
      <Paper elevation={3} sx={{ maxWidth: 'md', mx: 'auto', p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Shipping
        </Typography>
        <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <TextField
            label="Address"
            type="text"
            required
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="City"
            type="text"
            required
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Postal Code"
            type="text"
            required
            placeholder="Enter postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Country"
            type="text"
            required
            placeholder="Enter country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Continue
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default ShippingScreen;
