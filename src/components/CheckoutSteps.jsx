import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <nav className="flex justify-center mb-4 space-x-4">
            <div>
                {step1 ? (
                    <Link to="/login" className="text-blue-600 hover:text-blue-800">
                        Log In
                    </Link>
                ) : (
                    <span className="text-gray-400 cursor-not-allowed">Log In</span>
                )}
            </div>

            <div>
                {step2 ? (
                    <Link to="/shipping" className="text-blue-600 hover:text-blue-800">
                        Shipping
                    </Link>
                ) : (
                    <span className="text-gray-400 cursor-not-allowed">Shipping</span>
                )}
            </div>

            <div>
                {step3 ? (
                    <Link to="/payment" className="text-blue-600 hover:text-blue-800">
                        Payment
                    </Link>
                ) : (
                    <span className="text-gray-400 cursor-not-allowed">Payment</span>
                )}
            </div>

            <div>
                {step4 ? (
                    <Link to="/placeorder" className="text-blue-600 hover:text-blue-800">
                        Place Order
                    </Link>
                ) : (
                    <span className="text-gray-400 cursor-not-allowed">Place Order</span>
                )}
            </div>
        </nav>
    );
};

export default CheckoutSteps;
