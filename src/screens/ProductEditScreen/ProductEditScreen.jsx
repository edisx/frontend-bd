import { useNavigate } from "react-router-dom";
import ProductText from "./ProductText";
import ProductImages from "./ProductImages";
import ProductModel from "./ProductModel";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ProductEditScreen = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate("/login");
    }
  }, [navigate, userInfo]);


  return (
    <>
      <span
        className="text-blue-500 hover:underline cursor-pointer"
        onClick={() => navigate("/admin/productlist")}
      >
        Go Back
      </span>

      <div className="flex flex-row">
        <div className="w-1/2 p-4">
          <ProductText />
        </div>
        {userInfo && userInfo.isSuperuser && (
        <div className="w-1/2 p-4">
          <ProductImages />
        </div>
        )}
      </div>
      {userInfo && userInfo.isSuperuser && (
      <ProductModel />
      )}
    </>
  );
};

export default ProductEditScreen;
