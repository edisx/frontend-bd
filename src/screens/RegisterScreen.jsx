import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';
import { Alert, TextField, Button, Paper, Box } from '@mui/material';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(state => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }))
      .unwrap()
      .then(response => {
        navigate('/'); 
      })
      .catch(error => {
        console.error('Registration failed', error);
      });
  };

  useEffect(() => {
    if (user.userInfo) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Box className="container mx-auto px-4 mt-8 w-1/3" component={Paper} elevation={3} padding={4}>
      {user.error && <Alert severity="error">{user.error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField 
          label="Name"
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
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
          style={{ marginTop: '16px', textTransform: 'none' }}
        >
          Register
        </Button>
      </form>
    </Box>
  );
};

export default RegisterScreen;
