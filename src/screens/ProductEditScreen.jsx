import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchSingleProductForAdmin,
  updateProduct,
} from "../features/productSlice";
import { fetchAllCategories } from "../features/categorySlice";
import { createImage, deleteImage } from "../features/imageSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";

const ProductEditScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productsAll = useSelector((state) => state.products);
  const { product, loading, error } = productsAll;

  const categoriesAll = useSelector((state) => state.categories);
  const {
    categories,
    loading: loadingCategories,
    error: errorCategories,
  } = categoriesAll;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchSingleProductForAdmin(id));
    dispatch(fetchAllCategories());
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setDescription(product.description || "");
      setCategoryName(product.category?.name || "");
      setCategoryId(product.category?.id || "");
      setPrice(product.price || 0);
      setCountInStock(product.count_in_stock || 0);
      setVisible(product.visible || false);
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        id: id,
        productData: {
          name,
          price,
          description,
          category: categoryId,
          count_in_stock: countInStock,
          visible,
        },
      })
    )
      .unwrap()
      .then((response) => {
        navigate("/admin/productlist");
      })
      .catch((error) => {
        console.error("Update product failed", error);
      });
  };

  const handleImageSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("product_id", id);
    formData.append("image", e.target.image.files[0]);

    dispatch(createImage(formData))
      .unwrap()
      .then((response) => {
        console.log("Image created", response);
        dispatch(fetchSingleProductForAdmin(id));
      })
      .catch((error) => {
        console.error("Create image failed", error);
      });
  };

  const handleImageDelete = (imageId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (confirmDelete) {
      dispatch(deleteImage(imageId))
        .unwrap()
        .then((response) => {
          console.log("Image deleted", response);
          dispatch(fetchSingleProductForAdmin(id));
        })
        .catch((error) => {
          console.error("Delete image failed", error);
        });
    }
  };

  if (loading === "loading") return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;

  return (
    <div className="m-4 flex flex-col p-4">
      <span
        className="text-blue-500 hover:underline cursor-pointer"
        onClick={() => navigate("/admin/productlist")}
      >
        Go Back
      </span>
      <div className="flex flex-row justify-between">
        {/* left side */}

        <div className="w-1/2">
          <form onSubmit={handleSubmit}>
            {/* name */}
            <div className="mb-4">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            {/* description */}
            <div className="mb-4">
              <label htmlFor="description">Description</label>
              <textarea
                type="text"
                id="description"
                value={description}
                placeholder="Enter description"
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>

            {/* category */}
            <div className="mb-4">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={categoryId}
                onChange={(e) => {
                  const selectedCat = categories.find(
                    (cat) => cat.id === e.target.value
                  );
                  setCategoryId(e.target.value);
                  setCategoryName(selectedCat ? selectedCat.name : "");
                }}
                className="w-full p-2 border rounded"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* price */}
            <div className="mb-4">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                value={price}
                placeholder="Enter price"
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            {/* countInStock */}
            <div className="mb-4">
              <label htmlFor="countInStock">Count In Stock</label>
              <input
                type="number"
                id="countInStock"
                value={countInStock}
                placeholder="Enter countInStock"
                onChange={(e) => setCountInStock(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            {/* visible */}
            <div className="mb-4">
              <label htmlFor="visible">Visible</label>
              <input
                type="checkbox"
                id="visible"
                checked={visible}
                onChange={(e) => setVisible(e.target.checked)}
                className="mx-2 p-2 border rounded"
              />
            </div>

            {/* submit */}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Update
            </button>
          </form>
        </div>

        {/* right side */}
        <div className="w-1/2 p-8">
          {/* images */}
          <div className="flex flex-col mb-4">
            {/* image display */}
            <div className="overflow-x-scroll flex flex-row h-40 border-2 border-gray-200 rounded">
              {product.images?.map((image) => (
                <img
                  key={image.id}
                  src={image.image}
                  alt={image.name}
                  className="w-32 h-32 object-cover"
                  onClick={() => handleImageDelete(image.id)}
                />
              ))}
            </div>
            {/* add image form */}
            <form onSubmit={handleImageSubmit} className="flex flex-row">
              <input
                type="file"
                id="image"
                className="w-full p-2 border rounded"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add Image
              </button>
            </form>
          </div>
          {/* meshes */}
          <div>meshes</div>
        </div>
      </div>
    </div>
  );
};

export default ProductEditScreen;
