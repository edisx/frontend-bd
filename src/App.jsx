import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import CartScreen from "./screens/CartScreen";
import ProductScreen from "./screens/ProductScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProductListScreen from "./screens/ProductListScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductEditScreen from "./screens/ProductEditScreen/ProductEditScreen";
import CategoryListScreen from "./screens/CategoryListScreen";
import CustomizeScreen from "./screens/CustomizeScreen/CustomizeScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderListScreen from "./screens/OrderListScreen";
import LogListScreen from "./screens/LogListScreen";

const Layout = () => {
  const location = useLocation();
  const showHeaderFooter = !location.pathname.includes("/customize");

  return (
    <div className="flex flex-col min-h-screen">
      {showHeaderFooter && <Header />}
      <div className={showHeaderFooter ? "flex-grow p-4" : "flex-grow"}>
        {/* all the routes */}
        <Routes>
          <Route path="/" element={<HomeScreen />} exact />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/product/customize/:id" element={<CustomizeScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/admin/productlist" element={<ProductListScreen />} />
          <Route
            path="/admin/product/:id/edit"
            element={<ProductEditScreen />}
          />
          <Route path="/admin/userlist" element={<UserListScreen />} />
          <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
          <Route path="/admin/categorylist" element={<CategoryListScreen />} />
          <Route path="/admin/logs" element={<LogListScreen />} />
          <Route path="/shipping" element={<ShippingScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
          <Route path="/order/:id" element={<OrderScreen />} />
          <Route path="/admin/orderlist" element={<OrderListScreen />} />

          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </div>
      {showHeaderFooter && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
