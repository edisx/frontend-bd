import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProductsForAdmin,
  deleteProduct,
  createProduct
} from "../features/productSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";

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
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);

  const handleEditClick = (id) => {
    navigate(`/admin/product/${id}/edit`);
  };

  const handleDeleteClick = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      dispatch(deleteProduct(id));
    }
  };

  const handleCreateClick = () => {
    dispatch(createProduct());
  };

  if (loading === "loading") return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;

  return (
    <div className="m-4">
      <div className="mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleCreateClick}
        >
          Create Product
        </button>
      </div>
      <div className="grid grid-cols-7 gap-4 font-semibold border-b-2">
        <div>ID</div>
        <div>Photo</div>
        <div>Name</div>
        <div>Price</div>
        <div>Category</div>
        <div>Visibility</div>
        <div>Actions</div>
      </div>
      {products.map((product) => (
        <div key={product.id} className="grid grid-cols-7 gap-4 py-2 border-b">
          <div>{product.id}</div>
          <div>
            {product.images[0] ? (
              <img src={product.images[0].image} className="h-20 w-20" />
            ) : (
              "No image available"
            )}
          </div>
          <div>{product.name}</div>
          <div>{product.price}</div>
          <div>
            {product.category ? product.category.name : "No category available"}
          </div>
          <div>{product.visible ? "Yes" : ""}</div>
          <div>
            {" "}
            <button
              className="mr-2 bg-blue-500 text-white py-1 px-2 rounded"
              onClick={() => handleEditClick(product.id)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white py-1 px-2 rounded"
              onClick={() => handleDeleteClick(product.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductListScreen;
