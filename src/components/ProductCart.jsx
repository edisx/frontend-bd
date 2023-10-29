import { addToCart } from "../features/cartSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from 'uuid';

const ProductCart = ({ product, selectedSize }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const addToCartHandler = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");  // using alert as a quick feedback, but you might want a more user-friendly way to notify
      return;
    }
    const uniqueId = uuidv4();
    dispatch(
      addToCart({
        product: id,
        size: selectedSize,
        name: product.name,
        image: product.images[0]?.image || "/placeholder.png",
        price: product.price,
        countInStock: product.countInStock,
        uniqueId,
      })
    );
    navigate("/cart");
  };

  return (
    <div className="mt-4">
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
