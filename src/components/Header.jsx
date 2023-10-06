import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/userSlice";


const Header = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.user);

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <div className="border h-12 flex items-center justify-center">
            
            <div className="flex items-center justify-between w-10/12 mx-auto">
                <div>
                    <Link to="/">LOGO</Link>
                </div>
                <div className="flex items-center">
                    <ul className="flex items-center gap-4">
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        
                        <li>
                            <NavLink to="/cart">Cart</NavLink>
                        </li>

                        {userInfo ? (
                            <li className="relative group hover:bg-gray-200">
                                <span className="block px-2 py-1">{userInfo.username}</span>
                                <ul className="absolute left-0 mt-0.5 bg-white border border-gray-300 rounded shadow-md group-hover:block hidden">
                                    <li className="px-4 py-2">
                                        <Link to="/profile">Profile</Link>
                                    </li>
                                    <li className="px-4 py-2">
                                        <button onClick={handleLogout}>Logout</button>
                                    </li>
                                </ul>
                            </li>
                        ) : (
                            <li>
                                <NavLink to="/login">Login</NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header;
