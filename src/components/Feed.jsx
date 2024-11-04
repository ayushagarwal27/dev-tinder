import axios from "axios";
import { config } from "../utils/config.js";
import { addFeed } from "../store/feedSlice.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard.jsx";

const Feed = () => {
  const feed = useSelector((state) => state.feed);
  const dispatch = useDispatch();

  async function getFeed() {
    const res = await axios.get(config.urls.baseUrl + config.urls.user.feed, {
      withCredentials: true,
    });
    dispatch(addFeed(res.data.data));
  }
  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className={"flex gap-4 mt-10 justify-center"}>
      {feed && feed.map((user, idx) => <UserCard key={idx} user={user} />)}
    </div>
  );
};
export default Feed;
