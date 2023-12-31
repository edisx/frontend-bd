import { addToCart } from "../features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@mui/material";

const ProductCart = ({ product, selectedSize }) => {
  const colors = useSelector((state) => state.colors);
  const meshes = product.meshes;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const getMeshColorMapping = () => {
    let meshColorMapping = [];

    colors.forEach((color) => {
      const meshId = color.meshId;
      const mesh = meshes.find((m) => m.id === meshId);

      if (mesh) {
        meshColorMapping.push({ [mesh.name]: color.color.color_name });
      }
    });

    return meshColorMapping;
  };

  const addToCartHandler = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }
    const uniqueId = uuidv4();
    const meshColorMap = getMeshColorMapping();

    dispatch(
      addToCart({
        product: id,
        size: selectedSize,
        colors: meshColorMap,
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

      <Button
        onClick={addToCartHandler}
        variant="contained"
        color="primary"
        className="mt-4"
      >
        Add to Cart
      </Button>
    </div>
  );
};

ProductCart.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductCart;
