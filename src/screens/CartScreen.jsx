import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Paper,
  Box,
  Link,
  Alert,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const CartScreen = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleRemoveFromCart = (uniqueId) => {
    dispatch(removeFromCart(uniqueId));
  };

  const getColorMappingString = (colors) => {
    const mappingString = colors
      .map((colorObj) => {
        const [meshName, colorName] = Object.entries(colorObj)[0];
        return `${meshName}: ${colorName}`;
      })
      .join(", ");

    return mappingString.length > 20
      ? `${mappingString.substring(0, 100)}...`
      : mappingString;
  };

  const total = cartItems
    .reduce((acc, item) => acc + item.price * 1, 0)
    .toFixed(2);

  return (
    <div className="flex flex-col p-8">
      <Typography variant="h5" gutterBottom className="mb-10">
        Your Cart
      </Typography>
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'}`}>
        <Box flex={isMobile ? 1 : 2} mb={isMobile ? 2 : 0} mr={!isMobile && 2}>
          {cartItems.length === 0 ? (
            <Alert severity="info">Your cart is empty</Alert>
          ) : (
            <List>
              {cartItems.map((item, index) => (
                <Paper key={index} elevation={1} sx={{ mb: 2, p: 3 }}>
                  <ListItem className="gap-4">
                    <ListItemIcon>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "60px",
                          height: "60px",
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Link
                          to={`/product/${item.product}`}
                          style={{ textDecoration: "none", color: "#1976d2" }}
                        >
                          {item.name}
                        </Link>
                      }
                      secondary={`Size: ${item.size.size} - ${getColorMappingString(item.colors)}`}
                    />
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {item.price} €
                    </Typography>
                    <Button
                      onClick={() => handleRemoveFromCart(item.uniqueId)}
                      color="error"
                      variant="outlined"
                      sx={{ ml: 2 }}
                    >
                      Remove
                    </Button>
                  </ListItem>
                </Paper>
              ))}
            </List>
          )}
        </Box>

        <Box flex={isMobile ? 1 : 1} ml={!isMobile && 2}>
          <div>
            <Typography variant="h5" gutterBottom>
              Order Summary
            </Typography>
            <Box sx={{ my: 2 }}>
              <Typography variant="body1" gutterBottom>
                Total: {total} €
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => navigate("/shipping")}
              disabled={cartItems.length === 0}
              sx={{ mt: 2 }}
            >
              Proceed to Checkout
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default CartScreen;