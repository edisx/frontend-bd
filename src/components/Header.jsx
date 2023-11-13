import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import { Search } from "react-feather";

const Header = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div className="bg-black h-16 flex items-center justify-center">
      <div className="flex items-center justify-between w-10/12 mx-auto text-[#bdbdc0]">
        <div>
          <Link
            to="/"
            className="text-xl hover:text-white transition duration-200"
          >
            LOGO
          </Link>
        </div>
        <div className="flex items-center">
          <ul className="flex items-center gap-4">
            <li>
              <NavLink
                to="/"
                className="hover:text-white transition duration-200"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                className="hover:text-white transition duration-200"
              >
                Cart
              </NavLink>
            </li>

            {userInfo && userInfo.isAdmin && (
              <li className="group relative">
                <span className="block px-4 py-2 hover:bg-gray-700 rounded transition duration-200 cursor-pointer">
                  Admin
                </span>
                <ul className="absolute left-0 w-full mt-[-0.5px] bg-black border border-gray-700 rounded shadow-md opacity-0 group-hover:opacity-100 hidden group-hover:block z-10 transition-opacity duration-150">
                  <li className="px-4 py-2 hover:bg-gray-700">
                    <Link
                      to="/admin/productList"
                      className="hover:text-white transition duration-200"
                    >
                      Products List
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-700">
                    <Link
                      to="/admin/userList"
                      className="hover:text-white transition duration-200"
                    >
                      Users List
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-700">
                    <Link
                      to="/admin/categoryList"
                      className="hover:text-white transition duration-200"
                    >
                      Categories List
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-700">
                    <Link
                      to="/admin/orderList"
                      className="hover:text-white transition duration-200"
                    >
                      Orders List
                    </Link>
                  </li>
                </ul>
              </li>
            )}

            {userInfo ? (
              <li className="group relative">
                <span className="block px-4 py-2 hover:bg-gray-700 rounded transition duration-200 cursor-pointer">
                  {userInfo.username}
                </span>
                <ul className="absolute left-0 w-full mt-[-0.5px] bg-black border border-gray-700 rounded shadow-md opacity-0 group-hover:opacity-100 hidden group-hover:block z-10 transition-opacity duration-150">
                  <li className="px-4 py-2 hover:bg-gray-700">
                    <Link
                      to="/profile"
                      className="hover:text-white transition duration-200"
                    >
                      Profile
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-700">
                    <button
                      onClick={handleLogout}
                      className="hover:text-white transition duration-200"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li>
                <NavLink
                  to="/login"
                  className="hover:text-white transition duration-200"
                >
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
