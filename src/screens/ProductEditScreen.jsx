import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  fetchSingleProductForAdmin,
  updateProduct,
} from "../features/productSlice";
import { fetchAllCategories } from "../features/categorySlice";

const ProductEditScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { product, status, error } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [fetchedProductId, setFetchedProductId] = useState(null);
  const [category, setCategory] = useState(null);
  const [countInStock, setCountInStock] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!product || fetchedProductId !== id) {
      dispatch(fetchSingleProductForAdmin(id));
      setFetchedProductId(id);
      dispatch(fetchAllCategories());
    } else {
      setName(product.name || "");
      setPrice(product.price || 0);
      setDescription(product.description || "");
      setCategory(product.category || null);
      setCountInStock(product.countInStock || 0);
      setVisible(product.visible !== undefined ? product.visible : true);
    }
  }, [dispatch, id, product, fetchedProductId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        id: id,
        productData: {
          name,
          price,
          description,
          category,
          countInStock,
          visible,
        },
      })
    );
    navigate("/admin/productlist");
  };

  return (
    <div className="p-5">
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-l"
        onClick={() => navigate("/admin/productlist")}
      >
        Go Back
      </button>
      {status === "loading" ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <form onSubmit={submitHandler} className="mt-5">
          <div className="mb-4">
            <label
              className="text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="text-gray-700 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <div className="mb-4">
            <label
              className="text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              className="text-gray-700 text-sm font-bold mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <select
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              value={category || ""}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              className="text-gray-700 text-sm font-bold mb-2"
              htmlFor="countInStock"
            >
              Count In Stock
            </label>
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              id="countInStock"
              type="number"
              value={countInStock}
              onChange={(e) => setCountInStock(Number(e.target.value))}
            />
          </div>

          <div className="mb-4">
            <label
              className="text-gray-700 text-sm font-bold mb-2"
              htmlFor="visible"
            >
              Visible
            </label>
            <input
              className="ml-2"
              id="visible"
              type="checkbox"
              checked={visible}
              onChange={(e) => setVisible(e.target.checked)}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Update
          </button>
        </form>
      )}
    </div>
  );
};

export default ProductEditScreen;
