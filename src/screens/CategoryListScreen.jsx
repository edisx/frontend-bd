import { useSelector, useDispatch } from "react-redux";

import {
  fetchAllCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} from "../features/categorySlice";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Message from "../components/Message";

const CategoryListScreen = () => {
  const dispatch = useDispatch();
  const categoryAll = useSelector((state) => state.categories);
  const { categories, loading, error } = categoryAll;

  useEffect(() => {
    // sleep 1 second
    dispatch(fetchAllCategories());
  }, [dispatch]);

  if (loading === "loading") return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;

  const handleEditClick = (id) => {
    const currentCategoryName = categories.find((cat) => cat.id === id).name;

    const newCategoryName = window.prompt(
      "Edit category name:",
      currentCategoryName
    );

    if (newCategoryName && newCategoryName !== currentCategoryName) {
      dispatch(updateCategory({ id: id, category: { name: newCategoryName } }));
    }
  };

  const handleDeleteClick = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmDelete) {
      dispatch(deleteCategory(id));
    }
  };

  const handleCreateClick = () => {
    const newCategoryName = window.prompt("Enter new category name:");

    if (newCategoryName) {
      dispatch(createCategory({ name: newCategoryName }));
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleCreateClick}
        >
          Create Category
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4 font-semibold border-b-2">
        <div>ID</div>
        <div>Category</div>
        <div>Date Created</div>
        <div>Actions</div>
      </div>
      {categories.map((category) => (
        <div key={category.id} className="grid grid-cols-4 gap-4 py-2 border-b">
          <div>{category.id}</div>
          <div>{category.name}</div>
          <div>{category.created_at.substring(0, 10)}</div>
          <div>
            <button
              className="mr-2 bg-blue-500 text-white py-1 px-2 rounded"
              onClick={() => handleEditClick(category.id)}
            >
              Edit
            </button>

            <button
              className="bg-red-500 text-white py-1 px-2 rounded"
              onClick={() => handleDeleteClick(category.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryListScreen;
