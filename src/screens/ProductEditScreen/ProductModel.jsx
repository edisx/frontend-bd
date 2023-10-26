import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadModel, deleteModel } from "../../features/modelSlice";
import { fetchSingleProductForAdmin } from "../../features/productSlice";

const ProductModel = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const productsAll = useSelector((state) => state.products);
  const { product } = productsAll;

  const handleMeshSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("product_id", id);
    formData.append("model_3d", e.target.mesh.files[0]);

    dispatch(uploadModel(formData))
      .unwrap()
      .then((response) => {
        console.log("Mesh uploaded", response);
        dispatch(fetchSingleProductForAdmin(id));
      })
      .catch((error) => {
        console.error("Upload mesh failed", error);
      });
  };

  const handleModelDelete = (modelId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this model?"
    );
    if (confirmDelete) {
      dispatch(deleteModel(modelId))
        .unwrap()
        .then((response) => {
          console.log("Model deleted", response);
          dispatch(fetchSingleProductForAdmin(id));
        })
        .catch((error) => {
          console.error("Delete model failed", error);
        });
    }
  };

  return (
    <>
      <div className="flex flex-row">
        {/* left side */}
        <div className="w-1/2 bg-green-500">
          <div>
            <form onSubmit={handleMeshSubmit} className="flex flex-col">
              <label htmlFor="mesh">Select a 3D model file:</label>
              <input type="file" id="mesh" accept=".glb" required />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-32 rounded"
              >
                Upload
              </button>
            </form>
            <button
              onClick={() => handleModelDelete(product.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 w-32 rounded"
            >
                Delete
            </button>
          </div>
          <div>
            {product.meshes && product.meshes.length > 0 && (
              <div>
                <h2 className="text-2xl font-medium mb-4">Meshes</h2>
                <ul>
                  {product.meshes.map((mesh) => (
                    <li key={mesh.id}>{mesh.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        {/* right side */}
        <div className="w-1/2 bg-blue-500">model</div>
      </div>
    </>
  );
};

export default ProductModel;
