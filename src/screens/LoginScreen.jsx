import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";
import { Link } from "react-router-dom";

const LoginScreen = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ username: email, password }))
      .unwrap()
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Login failed", error);
      });
  };

  useEffect(() => {
    if (user.userInfo) {
      navigate("/"); 
    }
  }, [user, navigate]);

  return (
    <div className="container mx-auto px-4 mt-8 w-1/3">
      {user.error && <Message variant="danger">{user.error}</Message>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <div className="mt-4">
          No account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;
