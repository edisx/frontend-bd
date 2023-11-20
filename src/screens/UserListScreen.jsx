import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers, deleteUser } from '../features/userSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Pagination
} from '@mui/material';

const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userAll = useSelector((state) => state.user);
  const { usersList, loading, error, page, pages } = userAll; // Assuming pages info is available in Redux state
  const userInfo = useSelector((state) => state.user.userInfo);

  const searchParams = new URLSearchParams(location.search);
  const currentPage = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUsers({ page: currentPage }));
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, userInfo, currentPage]);

  const handlePageChange = (event, value) => {
    navigate(`/admin/userList?page=${value}`);
  };

  const handleEditClick = (id) => {
    navigate(`/admin/user/${id}/edit`);
  };

  const handleDeleteClick = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this user?'
    );
    if (confirmDelete) {
      dispatch(deleteUser(id));
    }
  };

  if (loading === 'loading') return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div>
      <Paper className="p-4">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Admin</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersList.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.isAdmin ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditClick(user.id)}
                    style={{ marginRight: '8px' }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteClick(user.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Paper>
      <div className="flex justify-center mt-24 mb-4">
        <Pagination
          count={pages}
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default UserListScreen;
