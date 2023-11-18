import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllProductsForAdmin,
  deleteProduct,
  createProduct
} from '../features/productSlice';
import { useNavigate } from 'react-router-dom';
import {
  CircularProgress,
  Alert,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const productAll = useSelector((state) => state.products);
  const userInfo = useSelector((state) => state.user.userInfo);
  const { products, loading, error } = productAll;
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(fetchAllProductsForAdmin());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, userInfo]);

  const handleEditClick = (id) => {
    navigate(`/admin/product/${id}/edit`);
  };

  const handleDeleteClick = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this product?'
    );
    if (confirmDelete) {
      dispatch(deleteProduct(id));
    }
  };

  const handleCreateClick = () => {
    dispatch(createProduct());
  };

  if (loading === 'loading') return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div className="m-4">
      <div className="mb-4">
        <Button variant="contained" color="primary" onClick={handleCreateClick}>
          Create Product
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Photo</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Visibility</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>
                  {product.images[0] ? (
                    <img src={product.images[0].image} alt={product.name} style={{ height: '80px', width: '80px' }} />
                  ) : (
                    'No image available'
                  )}
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  {product.category ? product.category.name : 'No category available'}
                </TableCell>
                <TableCell>{product.visible ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditClick(product.id)}
                    style={{ marginRight: '8px' }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteClick(product.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductListScreen;
