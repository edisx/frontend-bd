import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../features/cartSlice';

const CartScreen = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="container mx-auto px-4 mt-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.product} className="border-b py-2 flex justify-between">
              <div>
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
  );
}

export default CartScreen;
