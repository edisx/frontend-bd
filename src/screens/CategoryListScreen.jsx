import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAllCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} from '../features/categorySlice';
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
  Paper,
  Modal,
  Box,
  Typography,
  TextField
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CategoryListScreen = () => {
  const dispatch = useDispatch();
  const categoryAll = useSelector((state) => state.categories);
  const { categories, loading, error } = categoryAll;
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);
  const [errorMessage, setErrorMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(fetchAllCategories());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);

  const handleEditClick = (category) => {
    setCurrentCategory(category);
    setNewCategoryName(category.name);
    setModalOpen(true);
  };

  const handleUpdateCategory = () => {
    if (newCategoryName && newCategoryName !== currentCategory.name) {
      dispatch(updateCategory({ id: currentCategory.id, category: { name: newCategoryName } }))
        .unwrap()
        .then(() => {
          setErrorMessage("");
          setModalOpen(false);
        })
        .catch((error) => {
          handleModalError(error);
        });
    }
  };

  const handleDeleteClick = (category) => {
    setCurrentCategory(category);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteCategory(currentCategory.id))
      .unwrap()
      .then(() => {
        setErrorMessage("");
        setDeleteModalOpen(false);
      })
      .catch((error) => {
        handleModalError(error);
      });
  };

  const handleCreateClick = () => {
    setNewCategoryName("");
    setCreateModalOpen(true);
  };

  const confirmCreate = () => {
    if (newCategoryName) {
      dispatch(createCategory({ name: newCategoryName }))
        .unwrap()
        .then(() => {
          setErrorMessage("");
          setCreateModalOpen(false);
        })
        .catch((error) => {
          handleModalError(error);
        });
    }
  };

  const handleModalError = (error) => {
    if (error && error.error) {
      setErrorMessage(error.error);
    } else if (error && error.name) {
      setErrorMessage(error.name.join(" "));
    } else {
      setErrorMessage("An unknown error occurred");
    }
  };

  if (loading === "loading") return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div className="p-4">
      {errorMessage && (
        <Alert severity="error" className="mb-4">
          {errorMessage}
        </Alert>
      )}
      <div className="mb-4">
        <Button variant="contained" color="primary" onClick={handleCreateClick}>
          Create Category
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Date Created</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.created_at.substring(0, 10)}</TableCell>
                <TableCell className="space-x-2">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditClick(category)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteClick(category)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Category Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-title" variant="h6">
            Edit Category
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Category Name"
            type="text"
            fullWidth
            variant="standard"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <Button onClick={handleUpdateCategory} color="primary">
            Update
          </Button>
        </Box>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        aria-labelledby="delete-modal-title"
      >
        <Box sx={style}>
          <Typography id="delete-modal-title" variant="h6">
            Confirm Delete
          </Typography>
          <Typography>
            Are you sure you want to delete this category?
          </Typography>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
          <Button onClick={() => setDeleteModalOpen(false)}>
            Cancel
          </Button>
        </Box>
      </Modal>

      {/* Create Category Modal */}
      <Modal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        aria-labelledby="create-modal-title"
      >
        <Box sx={style}>
          <Typography id="create-modal-title" variant="h6">
            Create New Category
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="new-category"
            label="Category Name"
            type="text"
            fullWidth
            variant="standard"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <Button onClick={confirmCreate} color="primary">
            Create
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default CategoryListScreen;
