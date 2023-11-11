import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createImage, deleteImage } from "../../features/imageSlice";
import { fetchSingleProductForAdmin } from "../../features/productSlice";


const ProductImages = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const productsAll = useSelector((state) => state.products);
  const { product } = productsAll;

  const handleImageSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("product_id", id);
    formData.append("image", e.target.image.files[0]);

    dispatch(createImage(formData))
      .unwrap()
      .then((response) => {
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
          dispatch(fetchSingleProductForAdmin(id));
        })
        .catch((error) => {
          console.error("Delete image failed", error);
        });
    }
  };

  return (
    <div className="flex flex-col">
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
        <input type="file" id="image" className="w-full p-2 border rounded" />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Image
        </button>
      </form>
    </div>
  );
};

export default ProductImages;
