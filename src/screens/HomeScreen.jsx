import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchAllProducts } from "../features/productSlice";
import Product from "../components/Product";
import { CircularProgress, Alert, Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the keyword from URL
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword") || "";
  const page = parseInt(searchParams.get("page")) || 1;

  const productAll = useSelector((state) => state.products);
  const {
    products,
    loading,
    error,
    page: productPage,
    pages: productPages,
  } = productAll;

  useEffect(() => {
    dispatch(fetchAllProducts({ keyword, page }));
  }, [dispatch, keyword, page]);

  const handlePageChange = (event, value) => {
    navigate(`/?keyword=${keyword}&page=${value}`);
  };

  if (loading === "loading") return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div className="container mx-auto px-4 mt-9 flex flex-col min-h-screen flex-grow justify-between">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products &&
          products.length > 0 &&
          products.map((product) => (
            <div key={product.id}>
              <Product product={product} />
            </div>
          ))}
      </div>
      <div className="flex justify-center mb-8">
        <Pagination
          count={productPages}
          page={productPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default HomeScreen;
