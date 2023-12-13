import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/userSlice';
import { useNavigate, Link } from 'react-router-dom';
import { Alert, TextField, Button, Paper, Box, Typography } from '@mui/material';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ username: email, password }))
      .unwrap()
      .then((response) => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Login failed', error);
      });
  };

  useEffect(() => {
    if (user.userInfo) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="container mx-auto px-4 mt-8 w-1/3">
      {user.error && <Alert severity="error">{user.error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '16px' }}
        >
          Login
        </Button>
        <Typography variant="body2" style={{ marginTop: '16px', textAlign: 'center' }}>
          No account?{' '}
          <Link to="/register" style={{ color: '#1976d2', textDecoration: 'underline' }}>
            Register
          </Link>
        </Typography>
      </form>
    </div>
  );
};

export default LoginScreen;
