import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllProducts } from "../features/productSlice";
import Product from "../components/Product";
import { CircularProgress, Alert } from "@mui/material";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productAll = useSelector((state) => state.products);

  const { products, loading, error } = productAll;


  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  if (loading === "loading") return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;


  
  return (
    <div className="container mx-auto px-4 mt-9">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id}>
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
