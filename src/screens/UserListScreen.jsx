import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser } from "../features/userSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";

const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { usersList, loading, error, userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(id));
    }
  };

  if (loading === "loading") return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl mt-6 mb-2">Users</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">NAME</th>
            <th className="px-6 py-3">EMAIL</th>
            <th className="px-6 py-3">ADMIN</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {usersList.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4">{user.id}</td>
              <td className="px-6 py-4">{user.name}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">
                {user.isAdmin ? "Yes" : "No"}
              </td>
              <td>
                <button
                  onClick={() => navigate(`/admin/user/${user.id}/edit`)}
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListScreen;
