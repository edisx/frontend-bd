import Configurator from "./Configurator";
import Scene from "./Scene";
import { Suspense } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSingleProduct } from "../../features/productSlice";
import { useNavigate } from "react-router-dom";

const CustomizeScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productsAll = useSelector((state) => state.products);
  const meshes = useSelector((state) => state.products.product.meshes) || [];
  const colors = useSelector((state) => state.colors);
  const { product } = productsAll;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  const onClickHandle = () => {
    // implement later
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="w-screen h-4/6 relative">
          <button
            className="absolute px-6 top-4 right-4 p-2 z-50 bg-white text-black font-semibold text-sm rounded-lg shadow-md hover:bg-gray-100 transition-colors"
            onClick={() => navigate(-1)}
          >
            Done
          </button>
  
          {/* <button
            className="absolute px-6 top-4 right-32 p-2 z-50 bg-white text-black font-semibold text-sm rounded-lg shadow-md hover:bg-gray-100 transition-colors"
            onClick={onClickHandle} 
          >
            Clear
          </button> */}
  
          <Scene model={product.model_3d} meshes={product.meshes} />
        </div>
      </Suspense>
      <div>
        <Configurator />
      </div>
    </div>
  );
};

export default CustomizeScreen;
