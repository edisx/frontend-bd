import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { fetchUserById, updateUser } from "../features/userSlice";

const UserEditScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userAll = useSelector((state) => state.user);
  const { userDetail, loading, error } = userAll;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    dispatch(fetchUserById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (userDetail) {
      setName(userDetail.name || "");
      setEmail(userDetail.email || "");
      setIsAdmin(userDetail.isAdmin || false);
    }
  }, [userDetail]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ userId: id, data: { name, email, isAdmin } }))
      .unwrap()
      .then((response) => {
        navigate("/admin/userlist");
      })
      .catch((error) => {
        console.error("Update user failed", error);
      });
  };

  if (loading === "loading") return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;

  return (
    <div className="m-4 flex flex-col gap-4">
      <span
        className="text-blue-500 hover:underline cursor-pointer"
        onClick={() => navigate("/admin/userList")}
      >
        Go Back
      </span>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="isAdmin">Is Admin</label>
          <input
            type="checkbox"
            id="isAdmin"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
            className="mx-2 p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UserEditScreen;
