import { useSelector } from "react-redux";
import Feed from "../../components/Feed.jsx";

const Home = () => {
  const user = useSelector((state) => state.user);
  return <>{user ? <Feed /> : "Home"}</>;
};
export default Home;
