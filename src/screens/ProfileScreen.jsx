import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, updateUserProfile } from "../features/userSlice";
import Message from "../components/Message";
import { getMyOrders } from "../features/orderSlice";
import { Link } from "react-router-dom";
import { X } from "react-feather";

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
    } else {
      setMatchError(null);
      dispatch(updateUserProfile({ name, email, password })).then((action) => {
        if (action.type === updateUserProfile.fulfilled.type) {
          setSuccessMessage("Profile updated successfully!");
        }
      });
    }
  };

  const formatDate = (dateString) => {
    return dateString.split('T')[0];
  };

  return (
    <div className="container mx-auto px-4 mt-8 flex">
      <div className="w-1/2 pr-4">
        <h1 className="text-2xl font-bold mb-4">User Profile</h1>
        {error && <Message variant="danger">{error}</Message>}
        {matchError && <Message variant="danger">{matchError}</Message>}
        {successMessage && (
          <Message variant="success">{successMessage}</Message>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter new password"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium mb-2"
            >
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Confirm new password"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Update
          </button>
        </form>
      </div>
      <div className="w-1/2 pl-4">
        {/* Order List Table */}
        <h2 className="text-2xl font-bold mb-4">My Orders</h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Paid</th>
              <th className="px-4 py-2">Delivered</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="border px-4 py-2">
                  <Link to={`/order/${order.id}`} className="text-blue-500 hover:text-blue-700">
                    {order.id}
                  </Link>
                </td>
                <td className="border px-4 py-2">{formatDate(order.created_at)}</td>
                <td className="border px-4 py-2">{order.total_price}</td>
                <td className="border px-4 py-2">
                  {order.is_paid ? formatDate(order.paid_at) : <X />}
                </td>
                <td className="border px-4 py-2">
                  {order.is_delivered ? formatDate(order.delivered_at) : <X />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfileScreen;
