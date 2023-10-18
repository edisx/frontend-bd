import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProductsForAdmin, deleteProduct } from "../features/productSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";

const ProductListAdminScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state) => state.products);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(fetchAllProductsForAdmin());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl mt-6 mb-2">Products</h1>
      
      {loading === "loading" ? <Loader /> :
        error ? <Message variant="danger">{error}</Message> :
          (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">NAME</th>
                  <th className="px-6 py-3">PRICE</th>
                  <th className="px-6 py-3">CATEGORY</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4">{product.id}</td>
                    <td className="px-6 py-4">{product.name}</td>
                    <td className="px-6 py-4">${product.price}</td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td>
                      <button
                        onClick={() => navigate(`/admin/product/${product.id}/edit`)}
                        className="mr-4"
                      >
                        Edit
                      </button>
                      <button onClick={() => handleDelete(product.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
      }
    </div>
  );
};

export default ProductListAdminScreen;
