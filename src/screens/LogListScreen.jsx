import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchActionLogs } from "../features/logSlice";
import {
  CircularProgress,
  Alert,
  List,
  ListItem,
  Paper,
  Typography,
  Pagination,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const LogListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const currentPage = parseInt(searchParams.get("page")) || 1;

  const logsAll = useSelector((state) => state.logs);
  const userInfo = useSelector((state) => state.user.userInfo);

  const { logs, loading, error, page, pages } = logsAll;

  useEffect(() => {
    if (userInfo && userInfo.isSuperuser) {
      console.log(currentPage);
      dispatch(fetchActionLogs({ page: currentPage }));
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo, currentPage]);

  if (loading === "loading") return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  const formatLithuanianDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")} ${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

  const handlePageChange = (event, value) => {
    navigate(`/admin/logs?page=${value}`);
  };

  return (
    <div>
      <Paper style={{ margin: "1rem", padding: "1rem" }}>
        <List>
          {logs &&
            logs.map((log, index) => (
              <ListItem
                key={log.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 16px",
                }}
              >
                <Typography
                  variant="body2"
                  style={{ flexShrink: 0, marginRight: "16px" }}
                >
                  {formatLithuanianDate(log.created_at)}
                </Typography>
                <Typography variant="body2" style={{ flexGrow: 1 }}>
                  {log.action}
                </Typography>
              </ListItem>
            ))}
        </List>
      </Paper>
      <div className="flex justify-center mt-24 mb-4">
        <Pagination
          count={pages}
          page={page}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default LogListScreen;
