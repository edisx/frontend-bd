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
        image: product.image,
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
          {[...Array(product.countInStock).keys()].map(x => 
            <option key={x + 1} value={x + 1}>
              {x + 1}
            </option>
          )}
        </select>
      </div>
      <button 
        onClick={addToCartHandler} 
        className="mt-4 bg-green-500 text-white p-2 rounded"
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
