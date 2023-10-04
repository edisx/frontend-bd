import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSingleProduct } from "../features/productSingleSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ProductCart from "../components/ProductCart";

const ProductScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productSingle = useSelector((state) => state.productSingle);
  const { product, loading, error } = productSingle;

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  

  if (loading === "loading") return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;

  return (
    <div className="container mx-auto px-4 mt-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="rounded shadow-md w-7/12 mx-auto"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
          <p className="mb-2">
            <span className="font-semibold">Brand:</span> {product.brand}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Category:</span> {product.category}
          </p>
          <p className="mb-4">
            <span className="font-semibold">Price:</span> ${product.price}
          </p>
          <p className="text-gray-600">{product.description}</p>
          <p className="mt-4">
            <span className="font-semibold">Stock:</span> 
            {product.countInStock > 0
              ? ` ${product.countInStock} in stock`
              : " Out of stock"}
          </p>
            {product.countInStock > 0 && <ProductCart product={product} />}
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
