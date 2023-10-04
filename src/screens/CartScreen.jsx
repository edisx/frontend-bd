import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../features/cartSlice';
import { useNavigate } from 'react-router-dom';

const CartScreen = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);

  return (
    <div className="container mx-auto px-4 mt-8 flex">
      {/* Cart Items - 60% */}
      <div className="w-3/5 pr-4">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product} className="border-b py-2 flex justify-between items-center">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 mr-4 rounded" />
                  <span className="mr-4">{item.name}</span>
                  <span>{item.qty} x ${item.price}</span>
                </div>
                <button 
                  onClick={() => handleRemoveFromCart(item.product)} 
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Price Calculation and Checkout - 40% */}
      <div className="w-2/5 border-l pl-4">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="mb-4">
          <span className="font-medium text-lg">Total:</span> <span className="text-lg">${total}</span>
        </div>
        <button 
          onClick={() => navigate('/checkout')} 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default CartScreen;
