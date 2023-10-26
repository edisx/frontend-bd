import { useNavigate } from "react-router-dom";
import ProductText from "./ProductText";
import ProductImages from "./ProductImages";
import ProductModel from "./ProductModel";

const ProductEditScreen = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* <span
        className="text-blue-500 hover:underline cursor-pointer"
        onClick={() => navigate("/admin/productlist")}
      >
        Go Back
      </span> */}

      <div className="flex flex-row">
        <div className="w-1/2 bg-red-500">
          <ProductText />
        </div>
        <div className="w-1/2 bg-yellow-500">
          <ProductImages />
        </div>
      </div>
      <ProductModel />
    </>
  );
};

export default ProductEditScreen;
