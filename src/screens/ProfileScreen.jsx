import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, updateUserProfile } from "../features/userSlice";
import Message from "../components/Message";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [matchError, setMatchError] = useState(null);

  const dispatch = useDispatch();
  const { userInfo, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userInfo) {
      dispatch(fetchUserProfile());
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
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

  return (
    <div className="container mx-auto px-4 mt-8 w-1/3">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      {error && <Message variant="danger">{error}</Message>}
      {matchError && <Message variant="danger">{matchError}</Message>}
      {successMessage && <Message variant="success">{successMessage}</Message>}
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
          <label htmlFor="password" className="block text-sm font-medium mb-2">
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
  );
};

export default ProfileScreen;
