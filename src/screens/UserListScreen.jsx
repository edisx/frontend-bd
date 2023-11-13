import { useSelector, useDispatch } from "react-redux";
import { getUsers, deleteUser } from "../features/userSlice";
import { useEffect } from "react";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";

const UserListScreen = () => {
  const dispatch = useDispatch();
  const userAll = useSelector((state) => state.user);
  const { usersList, loading, error } = userAll;
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);

  const handleEditClick = (id) => {
    navigate(`/admin/user/${id}/edit`);
  };

  const handleDeleteClick = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      dispatch(deleteUser(id));
    }
  };

  if (loading === "loading") return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;

  return (
    <div className="p-4">
      <div className="grid grid-cols-5 gap-4 font-semibold border-b-2">
        <div>ID</div>
        <div>Name</div>
        <div>Email</div>
        <div>Admin</div>
        <div>Actions</div>
      </div>
      {usersList.map((user) => (
        <div key={user.id} className="grid grid-cols-5 gap-4 py-2 border-b">
          <div>{user.id}</div>
          <div>{user.name}</div>
          <div>{user.email}</div>
          <div>{user.isAdmin ? "Yes" : ""}</div>
          <div> <button
              className="mr-2 bg-blue-500 text-white py-1 px-2 rounded"
              onClick={() => handleEditClick(user.id)}
            >
              Edit
            </button>

            <button
              className="bg-red-500 text-white py-1 px-2 rounded"
              onClick={() => handleDeleteClick(user.id)}
            >
              Delete
            </button></div>
        </div>
      ))}
    </div>
  );
};

export default UserListScreen;
