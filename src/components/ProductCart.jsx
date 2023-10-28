import { addToCart } from "../features/cartSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";

const ProductCart = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [qty, setQty] = useState(1);

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        product: id,
        name: product.name,
        image: product.images[0]?.image || "/placeholder.png",
        price: product.price,
        countInStock: product.countInStock,
        qty,
      })
    );
    navigate("/cart");
  };

  return (
    <div className="mt-4">
      <div>
        <label className="mr-2" htmlFor="qty">Quantity:</label>
        <select 
          value={qty} 
          onChange={(e) => setQty(e.target.value)} 
          className="border rounded p-1"
        >
          {[...Array(product.count_in_stock).keys()].map(x => 
            <option key={x + 1} value={x + 1}>
              {x + 1}
            </option>
          )}
        </select>
      </div>
      <button 
        onClick={addToCartHandler} 
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-300 m-4"
      >
        Add to Cart
      </button>
      
    </div>
  );
};

ProductCart.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductCart;
