import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../features/orderSlice';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Link
} from '@mui/material';
import { X } from "react-feather";

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);
  const userLogin = useSelector((state) => state.user);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAllOrders());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <Paper className="p-5">
      <Typography variant="h5" className="font-bold mb-4">Orders</Typography>
      {loading === 'loading' ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <TableContainer>
          <Table className="min-w-full divide-y divide-gray-200">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Delivered</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.user.name}</TableCell>
                  <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>{`$${parseFloat(order.total_price).toFixed(2)}`}</TableCell>
                  <TableCell>
                    {order.is_paid ? new Date(order.paid_at).toLocaleDateString() : <X className='text-red-500' />}
                  </TableCell>
                  <TableCell>
                    {order.is_delivered ? new Date(order.delivered_at).toLocaleDateString() : <X className='text-red-500' />}
                  </TableCell>
                  <TableCell>
                    <Link component={RouterLink} to={`/order/${order.id}`} color="primary">
                      Details
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default OrderListScreen;
