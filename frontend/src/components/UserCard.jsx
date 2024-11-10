import axios from "axios";
import { config } from "../utils/config.js";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedSlice.js";

const UserCard = ({ user }) => {
  const feed = useSelector((state) => state.feed);
  const loggedInUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  async function handleSendRequest(status, personId) {
    try {
      await axios.post(
        config.urls.baseUrl +
          config.urls.request.send +
          `/${status}/${personId}`,
        {},
        { withCredentials: true },
      );
      const nextFeed = [...feed].filter((person) => person?._id !== personId);
      dispatch(addFeed(nextFeed));
    } catch (err) {
      console.log(err);
    }
  }

  console.log(feed);
  return (
    <div className="card bg-white text-base-300 w-72 shadow-xl">
      <figure>
        <img
          src={
            user?.avatar_url ||
            "https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?q=80&w=1956&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="Avatar"
          className={"h-[350px] w-full object-cover object-top"}
        />
      </figure>
      <div className="card-body">
        <p className={"text-xl text-center font-bold"}>
          {user?.firstName} {user?.lastName}
        </p>
        <p className={"text-lg text-center font-semibold lowercase"}>
          {user?.age} ({user?.gender})
        </p>
        <p className={"text-sm text-center font-semibold"}>{user?.about}</p>
        <div className="card-actions justify-center">
          <button
            className="btn btn-warning"
            disabled={loggedInUser?._id === user?._id || !user?._id}
            onClick={() => handleSendRequest("ignored", user._id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-primary"
            disabled={loggedInUser?._id === user?._id || !user?._id}
            onClick={() => handleSendRequest("interested", user._id)}
          >
            Connect
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
