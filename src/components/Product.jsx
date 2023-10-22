import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Product = (props) => {
  return (
    <Link to={`/product/${props.product.id}`}>
      <div className="border p-4 rounded shadow-sm hover:shadow-md transition-shadow duration-300">
        <h1 className="font-bold text-xl mb-2">{props.product.name}</h1>
        <h2 className="text-gray-700 mb-2">${props.product.price}</h2>
        <img
          src={props.product.images[0]?.image || "/placeholder.png"}
          alt={props.product.name}
          className="w-1/4 rounded"
        />
      </div>
    </Link>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
};

export default Product;
