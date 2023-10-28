import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Product = (props) => {
  return (
    <Link to={`/product/${props.product.id}`} className="block group">
      <div className="relative overflow-hidden border p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
        {/* Image */}
        <img
          src={props.product.images[0]?.image || "/placeholder.png"}
          alt={props.product.name}
          className="mb-4 w-full h-60 object-cover object-center rounded transition-transform duration-300 group-hover:scale-105"
        />

        {/* Product Name */}
        <h1 className="font-bold text-lg mb-1 group-hover:text-gray-600 transition-colors duration-300">
          {props.product.name}
        </h1>

        {/* Product Price */}
        <h2 className="text-gray-700 text-base">${props.product.price}</h2>
      </div>
    </Link>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
};

export default Product;
