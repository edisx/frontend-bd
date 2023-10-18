import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  fetchAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../features/categorySlice";

const CategoryListScreen = () => {
  const dispatch = useDispatch();
  const categoryAll = useSelector((state) => state.categories);

  const { categories, loading, error } = categoryAll;
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showEditCategory, setShowEditCategory] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const handleAddCategory = () => {
    setShowAddCategory(true);
  };

  const handleEditCategory = (category) => {
    setShowEditCategory(true);
    setCategoryName(category.name);
    setCategoryId(category.id);
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategory(categoryId));
    }
  };

  const handleSaveCategory = () => {
    if (categoryName.trim() !== "") {
      if (showAddCategory) {
        dispatch(createCategory({ name: categoryName }));
      } else if (showEditCategory) {
        dispatch(
          updateCategory({ id: categoryId, category: { name: categoryName } })
        );
      }
      setShowAddCategory(false);
      setShowEditCategory(false);
      setCategoryName("");
      setCategoryId("");
    }
  };

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  if (loading === "loading") return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddCategory}
        >
          Add Category
        </button>
      </div>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="border px-4 py-2">{category.id}</td>
              <td className="border px-4 py-2">{category.name}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => handleEditCategory(category)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {(showAddCategory || showEditCategory) && (
        <div className="flex flex-col mt-4">
          <input
            type="text"
            placeholder="Category Name"
            className="border rounded py-2 px-3 mb-2"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSaveCategory}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryListScreen;
