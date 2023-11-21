import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../features/orderSlice";
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";
import {
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Link,
  Pagination,
} from "@mui/material";
import { X } from "react-feather";

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const { orders, loading, error, page, pages } = useSelector(
    (state) => state.order
  );
  const userLogin = useSelector((state) => state.user);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const currentPage = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAllOrders({ page: currentPage }));
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo, currentPage]);

  const handlePageChange = (event, value) => {
    navigate(`/admin/orderList?page=${value}`);
  };

  // date only , no time
  const formatLithuanianDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };


  return (
    <div>
      <Paper className="p-5">
        <Typography variant="h5" className="font-bold mb-4">
          Orders
        </Typography>
        {loading === "loading" ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <TableContainer>
            <Table className="min-w-full divide-y divide-gray-200">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Shipped</TableCell>
                  <TableCell>Delivered</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.user.name}</TableCell>
                    <TableCell>
                      {formatLithuanianDate(order.created_at)}
                    </TableCell>
                    <TableCell>{`$${parseFloat(order.total_price).toFixed(
                      2
                    )}`}</TableCell>
                    <TableCell>
                      {order.is_paid ? (
                        formatLithuanianDate(order.paid_at)
                        
                      ) : (
                        <X className="text-red-500" />
                      )}
                    </TableCell>
                    <TableCell>
                      {order.is_shipped ? (
                        formatLithuanianDate(order.shipped_at)
                      ) : (
                        <X className="text-red-500" />
                      )}
                    </TableCell>
                    <TableCell>
                      {order.is_delivered ? (
                        formatLithuanianDate(order.delivered_at)
                      ) : (
                        <X className="text-red-500" />
                      )}
                    </TableCell>
                    <TableCell>
                      <Link
                        component={RouterLink}
                        to={`/order/${order.id}`}
                        color="primary"
                      >
                        Details
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
      <div className="flex justify-center mt-24 mb-4">
        <Pagination
          count={pages}
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default OrderListScreen;
