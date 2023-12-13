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
  Typography
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
    <div className='p-5'>
      <CheckoutSteps step1 step2 step3 />
      <div className='flex flex-col items-center'>
        <Typography variant="h4" gutterBottom>
          Payment Method
        </Typography>
        <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '20px', minWidth: '33%' }}>
          <FormControl component="fieldset" fullWidth>
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
            sx={{ mt: 2, textTransform: 'none' }}
          >
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PaymentScreen;
