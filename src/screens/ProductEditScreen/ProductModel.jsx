import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadModel, deleteModel } from "../../features/modelSlice";
import { fetchSingleProductForAdmin } from "../../features/productSlice";
import { Suspense } from "react";
import Scene from "../../components/Scene";
import MeshTree from "./MeshTree";

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
        <div className="w-1/2 p-4">
          <div className="mb-4">
            <form
              onSubmit={handleMeshSubmit}
              className="flex flex-col space-y-2"
            >
              <label htmlFor="mesh" className="font-medium text-lg">
                Select a 3D model file:
              </label>
              <input type="file" id="mesh" accept=".glb" required />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-32 rounded"
              >
                Upload
              </button>
            </form>
          </div>
          <div className="mb-4">
            <button
              onClick={() => handleModelDelete(product.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 w-32 rounded"
            >
              Delete
            </button>
          </div>
          <div>
            {product.meshes && product.meshes.length > 0 ? (
              <MeshTree meshes={product.meshes} />
            ) : (
              <p>No model</p>
            )}
          </div>
        </div>

        {/* right side */}
        <div className="w-1/2">
          <Suspense fallback={<div>Loading...</div>}>
            <div className="w-96 h-96 p-4">
              <Scene model={product.model_3d} />
            </div>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default ProductModel;
