import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';
import Message from '../components/Message';

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
        console.log('Registration successful', response);
        navigate('/'); // Redirect to login after successful registration
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
    <div className="container mx-auto px-4 mt-8 w-1/3">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      {user.error && <Message variant="danger">{user.error}</Message>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-2">Name:</label>
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
          <label htmlFor="email" className="block text-sm font-medium mb-2">Email:</label>
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
          <label htmlFor="password" className="block text-sm font-medium mb-2">Password:</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterScreen;
