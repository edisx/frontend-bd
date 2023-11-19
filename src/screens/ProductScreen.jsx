import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchSingleProduct } from "../features/productSlice";
import { useNavigate } from "react-router-dom";
import ProductCart from "../components/ProductCart";
import {
  createProductReview,
  deleteProductReview,
} from "../features/productSlice";
import { Trash } from "react-feather";
import StarRating from "../components/StarRating";
import { CircularProgress, Alert } from "@mui/material";

const ProductScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productSingle = useSelector((state) => state.products);
  const { product, loading, error } = productSingle;
  const colors = useSelector((state) => state.colors);
  const userInfo = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();

  const [currentImage, setCurrentImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product.images && product.images.length > 0) {
      setCurrentImage(product.images[0].image);
    } else {
      setCurrentImage(null);
    }
  }, [product]);

  const submitReview = async () => {
    if (rating && comment) {
      dispatch(
        createProductReview({ productId: id, reviewData: { rating, comment } })
      )
        .unwrap()
        .then(() => {
          setRating(0);
          setComment("");
          setErrorMessage("");
          dispatch(fetchSingleProduct(id));
        })
        .catch((error) => {
          setErrorMessage(error.error);
        });
    } else {
      setErrorMessage("Please select a rating and write a comment.");
    }
  };

  const deleteReview = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      dispatch(deleteProductReview({ productId: id, reviewId }))
        .unwrap()
        .then(() => {
          dispatch(fetchSingleProduct(id));
          setErrorMessage("");
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const mapMeshesToColors = () => {
    const meshColorMapping = {};

    if (Array.isArray(product.meshes)) {
      product.meshes.forEach((mesh) => {
        const meshId = mesh.id;
        const meshName = mesh.name;

        const colorEntry = colors.find((color) => color.meshId === meshId);

        if (colorEntry) {
          meshColorMapping[meshName] = colorEntry.color.color_name;
        }
      });
    }

    return meshColorMapping;
  };

  const formatString = (str) => {
    return str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const meshColorMap = mapMeshesToColors();

  if (loading === "loading") return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

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
              <div className="mt-4">
                {Object.entries(meshColorMap).map(([mesh, color]) => (
                  <p key={mesh}>{`${formatString(mesh)}: ${color}`}</p>
                ))}
              </div>
            </div>
          )}
          <p className="mb-4 text-gray-700">
            <span className="text-black font-semibold">Category: </span>
            {product.category?.name || "No category"}
          </p>
          {/* rating */}
          <div className="mb-4">
            <StarRating
              totalStars={5}
              onRatingSelected={() => {}}
              initialRating={product.rating}
              isInteractive={false}
            />
          </div>
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

      {/* Review Form */}
      <div className="p-4 mt-20">
        <h2 className="text-2xl font-medium mb-4">Write a Review</h2>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <div>
          <label htmlFor="rating">Rating</label>
          <StarRating totalStars={5} onRatingSelected={handleRatingChange} />
        </div>
        <div>
          <label htmlFor="comment">Comment</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border rounded"
          ></textarea>
        </div>
        <button
          onClick={submitReview}
          className="bg-blue-500 text-white px-8 py-2 rounded-lg shadow-lg transition-transform duration-150 ease-in-out hover:scale-105"
        >
          Submit Review
        </button>
      </div>

      {/* Display Reviews */}
      <div className="mt-8 bg-white p-4">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Reviews</h2>
        {product.reviews?.length ? (
          product.reviews.map((review) => (
            <div
              key={review.id}
              className="group relative p-4 border-b last:border-b-0  shadow-md rounded-lg"
            >
              <strong className="block text-lg font-medium">
                {review.name}
              </strong>
              <div className="flex items-center">
                <StarRating
                  totalStars={5}
                  onRatingSelected={() => {}}
                  initialRating={review.rating}
                  isInteractive={false}
                />
              </div>
              <p className="text-gray-700">{review.comment}</p>
              <p className="text-gray-700">{review.created_at.split("T")[0]}</p>

              {userInfo &&
                (review.user === userInfo.id || userInfo.isAdmin) && (
                  <button
                    onClick={() => deleteReview(review.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 hidden group-hover:block"
                  >
                    <Trash />
                  </button>
                )}
            </div>
          ))
        ) : (
          <p className="text-gray-600">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductScreen;
