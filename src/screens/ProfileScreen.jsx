import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, updateUserProfile } from "../features/userSlice";
import { getMyOrders } from "../features/orderSlice";
import { Link } from "react-router-dom";
import { X } from "react-feather";
import {
  Alert,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [matchError, setMatchError] = useState(null);

  const dispatch = useDispatch();
  const { userInfo, error } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    if (!userInfo) {
      dispatch(fetchUserProfile());
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      dispatch(getMyOrders());
    }
  }, [dispatch, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMatchError("Passwords do not match!");
    } else if (password !== "" && confirmPassword !== "") {
      setMatchError(null);
      dispatch(updateUserProfile({ name, email, password })).then((action) => {
        if (action.type === updateUserProfile.fulfilled.type) {
          setSuccessMessage("Profile updated successfully!");
        }
      });
    }
  };

  const formatDate = (dateString) => {
    return dateString.split("T")[0];
  };

  return (
    <div className="container mx-auto px-4 mt-8 flex">
      <div className="w-1/2 pr-4">
        <Typography variant="h4" gutterBottom>
          User Profile
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {matchError && <Alert severity="error">{matchError}</Alert>}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "16px" }}
          >
            Update
          </Button>
        </form>
      </div>
      <div className="w-1/2 pl-4">
        <Typography variant="h4" gutterBottom>
          My Orders
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Shipped</TableCell>
                <TableCell>Delivered</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <Link
                      to={`/order/${order.id}`}
                      style={{ color: "#1976d2" }}
                    >
                      {order.id}
                    </Link>
                  </TableCell>
                  <TableCell>{formatDate(order.created_at)}</TableCell>
                  <TableCell>{order.total_price}</TableCell>
                  <TableCell>
                    {order.is_paid ? formatDate(order.paid_at) : <X />}
                  </TableCell>
                  <TableCell>
                      {order.is_shipped ? formatDate(order.shipped_at) : <X />}
                    </TableCell>
                  <TableCell>
                    {order.is_delivered ? (
                      formatDate(order.delivered_at)
                    ) : (
                      <X />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ProfileScreen;
