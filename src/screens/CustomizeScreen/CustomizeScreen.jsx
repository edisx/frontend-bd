import Configurator from "./Configurator";
import Scene from "./Scene";
import { Suspense } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSingleProduct } from "../../features/productSlice";

const CustomizeScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productsAll = useSelector((state) => state.products);
  const { product } = productsAll;

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  return (
    <div className="w-screen h-screen flex flex-col">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="w-screen border-2 border-black h-4/6">
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
