import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../features/cartSlice';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Paper,
  Box
} from '@mui/material';

const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const { shippingInfo } = cart;

  if (!shippingInfo.address) {
    navigate('/shipping');
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <Box sx={{ p: 5 }}>
      <CheckoutSteps step1 step2 step3 />

      <Paper elevation={3} sx={{ maxWidth: 'md', mx: 'auto', p: 3 }}>
        <form onSubmit={submitHandler}>
          <FormControl component="fieldset" sx={{ mb: 3 }}>
            <FormLabel component="legend" sx={{ mb: 2, fontWeight: 'bold' }}>
              Select Method
            </FormLabel>
            <RadioGroup
              name="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel
                value="PayPal"
                control={<Radio />}
                label="PayPal or Credit Card"
              />
              {/* Uncomment this section if you want to include Stripe as an option */}
              {/* <FormControlLabel
                value="Stripe"
                control={<Radio />}
                label="Stripe"
              /> */}
            </RadioGroup>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ textTransform: 'none' }}
          >
            Continue
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default PaymentScreen;
