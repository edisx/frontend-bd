import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserById, updateUser } from '../features/userSlice';
import {
  CircularProgress,
  Alert,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  Paper
} from '@mui/material';

const UserEditScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userAll = useSelector((state) => state.user);
  const { userDetail, loading, error } = userAll;
  const userInfo = useSelector((state) => state.user.userInfo);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(fetchUserById(id));
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, userInfo, id]);

  useEffect(() => {
    if (userDetail) {
      setName(userDetail.name || '');
      setEmail(userDetail.email || '');
      setIsAdmin(userDetail.isAdmin || false);
    }
  }, [userDetail]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ userId: id, data: { name, email, isAdmin } }))
      .unwrap()
      .then((response) => {
        navigate('/admin/userlist');
      })
      .catch((error) => {
        console.error('Update user failed', error);
      });
  };

  if (loading === 'loading') return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Paper className="m-4 p-4">
      <Typography
        variant="h6"
        style={{ cursor: 'pointer' }}
        color="primary"
        onClick={() => navigate('/admin/userList')}
      >
        Go Back
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <FormControlLabel
          control={
            <Checkbox
              id="isAdmin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          }
          label="Is Admin"
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: '16px' }}
        >
          Update
        </Button>
      </form>
    </Paper>
  );
};

export default UserEditScreen;
