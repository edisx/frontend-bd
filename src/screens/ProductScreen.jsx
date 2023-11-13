import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchSingleProduct } from "../features/productSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ProductCart from "../components/ProductCart";

const ProductScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productSingle = useSelector((state) => state.products);
  const { product, loading, error } = productSingle;
  const navigate = useNavigate();

  const [currentImage, setCurrentImage] = useState(null);

  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product.images?.length) {
      setCurrentImage(product.images[0].image); // set initial image
    }
  }, [product]);

  if (loading === "loading") return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;

  return (
    <div className="container mx-auto px-4 mt-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="col-span-2">
          <div className="bg-gray-200 w-96 h-96 mx-auto relative">
            <img
              src={currentImage || "/placeholder.png"}
              alt={product.name}
              className="absolute top-0 left-0 right-0 bottom-0 m-auto object-cover w-96 h-96 rounded-lg shadow-md"
            />
          </div>

          <div className="mt-8 flex space-x-4 overflow-x-auto">
            {product.images?.map((image) => (
              <img
                key={image.id}
                src={image.image}
                alt={product.name}
                onClick={() => setCurrentImage(image.image)}
                className="w-24 h-24 object-cover rounded-md shadow-md cursor-pointer"
              />
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-medium mb-6">{product.name}</h1>
          {product.model_3d && (
            <div className="m-4">
              <button
                onClick={() => navigate(`/product/customize/${id}`)}
                className="rainbow-bg text-white px-8 py-2 rounded-lg border-2 border-white shadow-lg transition-transform duration-150 ease-in-out hover:scale-105"
              >
                <span className="text-white font-medium">Customize</span>
              </button>
            </div>
          )}
          <p className="mb-4 text-gray-700">
            <span className="text-black font-semibold">Category: </span>
            {product.category?.name || "No category"}
          </p>
          <p className="text-xl mb-6 font-medium">{product.price} €</p>
          <p className="mb-6 text-gray-600 leading-relaxed">
            {product.description}
          </p>
          {product.count_in_stock > 0 ? (
            <>
              <div className="mb-6">
                <label
                  htmlFor="size"
                  className="block font-medium text-black mb-2"
                >
                  Select Size:
                </label>
                <select
                  id="size"
                  value={selectedSize ? JSON.stringify(selectedSize) : ""}
                  onChange={(e) => setSelectedSize(JSON.parse(e.target.value))}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Choose a size</option>
                  {product.sizes?.map((size) => (
                    <option key={size.id} value={JSON.stringify(size)}>
                      {size.size}
                    </option>
                  ))}
                </select>
              </div>

              <ProductCart product={product} selectedSize={selectedSize} />
            </>
          ) : (
            <div className="text-center text-red-600">
              <p>Sorry, this product is currently not in stock.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
