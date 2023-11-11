import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { addOrder } from "../features/orderSlice";
import { clearCart } from "../features/cartSlice";

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);
  const [orderDetails, setOrderDetails] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const itemsPrice = cart.cartItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
    const shippingPrice = itemsPrice >= 100 ? 0 : 10;
    const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
    const totalPrice = Number(
      (itemsPrice + shippingPrice + taxPrice).toFixed(2)
    );

    setOrderDetails({
      ...cart,
      itemsPrice: itemsPrice.toFixed(2),
      shippingPrice: shippingPrice.toFixed(2),
      taxPrice: taxPrice.toFixed(2),
      totalPrice: totalPrice.toFixed(2),
    });
  }, [cart]);

  const placeOrderHandler = () => {
    dispatch(
      addOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingInfo,
        paymentMethod: cart.paymentMethod,
        itemsPrice: orderDetails.itemsPrice,
        shippingPrice: orderDetails.shippingPrice,
        taxPrice: orderDetails.taxPrice,
        totalPrice: orderDetails.totalPrice,
      })
    ).then((newOrder) => {
      if (newOrder.payload) {
        navigate(`/order/${newOrder.payload.id}`);
        dispatch(clearCart());
      } else {
        // Handle error here, as the order was not created
      }
    });
  };

  const getColorMappingString = (colors) => {
    const mappingString = colors
      .map((colorObj) => {
        const [meshName, colorName] = Object.entries(colorObj)[0];
        return `${meshName}: ${colorName}`;
      })
      .join(", ");

    // Trim the string to a maximum of 20 characters
    return mappingString.length > 20
      ? `${mappingString.substring(0, 100)}...`
      : mappingString;
  };

  return (
    <div className="m-4">
      <CheckoutSteps step1 step2 step3 step4 />

      <div className="flex flex-col md:flex-row gap-8">
        {/* Shipping Information */}
        <div className="flex-grow">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-700 mb-3">Shipping </h2>
            <p className="text-lg">
              <strong className="font-semibold">Shipping:</strong>
              {cart.shippingInfo.address}, {cart.shippingInfo.city}{" "}
              {cart.shippingInfo.postalCode}, {cart.shippingInfo.country}
            </p>
          </div>

          {/* Payment Method */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-700 mb-3">
              Payment Method
            </h2>
            <p className="text-lg">
              <strong className="font-semibold">Method: </strong>
              {cart.paymentMethod}
            </p>
          </div>

          {/* Order Items */}
          <div>
            <h2 className="text-3xl font-bold text-gray-700 mb-3">
              Order Items
            </h2>
            {cart.cartItems.length === 0 ? (
              <Message>Your cart is empty</Message>
            ) : (
              cart.cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center mb-5 last:mb-0 bg-white shadow rounded-lg p-4"
                >
                  <div className="w-20 h-20 flex-shrink-0 mr-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex flex-grow gap-3">
                    <Link
                      to={`/product/${item.product}`}
                      className="text-lg text-blue-600 hover:text-blue-800"
                    >
                      {item.name}
                    </Link>
                    <span>Size: {item.size.size}</span>
                    {item.colors && item.colors.length > 0 && (
                      <span className="ml-4">
                        Colors: {getColorMappingString(item.colors)}
                      </span>
                    )}
                  </div>
                  <div className="text-lg font-medium">{item.price} €</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full md:max-w-md lg:max-w-lg">
          <div className="border bg-white shadow rounded-lg p-6">
            <h2 className="text-3xl font-bold text-gray-700 mb-6">
              Order Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-lg font-medium">Items</span>
                <span className="text-lg font-medium">
                  {orderDetails.itemsPrice} €
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-lg font-medium">Shipping</span>
                <span className="text-lg font-medium">
                  {orderDetails.shippingPrice} €
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-lg font-medium">Tax</span>
                <span className="text-lg font-medium">
                  {orderDetails.taxPrice} €
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-lg font-bold">Total</span>
                <span className="text-lg font-bold">
                  {orderDetails.totalPrice} €
                </span>
              </div>
              <button
                onClick={placeOrderHandler}
                disabled={cart.cartItems.length === 0}
                className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white py-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
