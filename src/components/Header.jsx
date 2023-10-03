import { NavLink, Link } from "react-router-dom";


const Header = () => {
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
                            <NavLink to="/login">Login</NavLink>
                        </li>
                        <li>
                            <NavLink to="/cart">Cart</NavLink>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header;
