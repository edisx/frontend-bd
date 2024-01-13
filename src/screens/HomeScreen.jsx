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
  const category_id = parseInt(searchParams.get("category_id")) || "";

  const productAll = useSelector((state) => state.products);
  const {
    products,
    loading,
    error,
    page: productPage,
    pages: productPages,
  } = productAll;

  useEffect(() => {
    dispatch(fetchAllProducts({ keyword, page, category_id }));
  }, [dispatch, keyword, page, category_id]);

  const handlePageChange = (event, value) => {
    navigate(`/?keyword=${keyword}&page=${value}`);
  };

  if (loading === "loading") return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (products.length === 0)
    return (
      <Alert severity="info">No products with the keyword "{keyword}"</Alert>
    );

  return (
    <>
      <Alert severity="info">
        <div>
          <p>
            This project is a demonstration prototype developed to showcase a
            functional e-commerce platform with 3D product configuration
          </p>
          <div className="flex flex-row space-x-4 mt-2">
            <a
              href="https://github.com/edisx/frontend-bd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 visited:text-purple-600"
            >
              Frontend Repository
            </a>
            <a
              href="https://github.com/edisx/backend-bd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 visited:text-purple-600"
            >
              Backend Repository
            </a>
          </div>
        </div>
      </Alert>
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
    </>
  );
};

export default HomeScreen;
