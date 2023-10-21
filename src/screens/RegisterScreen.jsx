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
    <div className="container mx-auto px-4 mt-8 w-1/3">
      {user.error && <Message variant="danger">{user.error}</Message>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input 
            type="text"
            id="name"
            value={name}
            placeholder='Enter name'
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <input 
            type="email" 
            id="email" 
            value={email} 
            placeholder='Enter email'
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
            placeholder='Enter password'
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
