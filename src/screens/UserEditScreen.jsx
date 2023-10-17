import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { fetchUserById, updateUser } from "../features/userSlice";

const UserEditScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(`id: ${id}`);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [fetchedUserId, setFetchedUserId] = useState(null);

  // Corrected the extraction of userDetail from state
  const { userDetail, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userDetail || fetchedUserId !== id) {
      dispatch(fetchUserById(id));
      setFetchedUserId(id);
    } else {
      setName(userDetail.name || "");
      setEmail(userDetail.email || "");
      setIsAdmin(userDetail.isAdmin || false);
    }
  }, [dispatch, id, userDetail, fetchedUserId]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(` new id: ${id}`);
    dispatch(updateUser({ userId: id, data: { name, email, isAdmin } }));
    navigate("/admin/userlist");
  };

  return (
    <div className="p-5">
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
        onClick={() => navigate("/admin/userlist")}
      >
        Go Back
      </button>

      {status === "loading" ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <form onSubmit={submitHandler} className="mt-5">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              <input
                className="mr-2 leading-tight"
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
              <span className="text-sm">Is Admin</span>
            </label>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Update
          </button>
        </form>
      )}
    </div>
  );
};

export default UserEditScreen;
