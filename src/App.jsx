import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Footer from "./components/Footer.jsx";
import { useEffect } from "react";
import { config } from "./utils/config.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./store/userSlice.js";
import Connections from "./pages/Connections/Connections.jsx";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const fetchUser = async () => {
    const res = await axios.get(
      config.urls.baseUrl + config.urls.profile.view,
      { withCredentials: true },
    );
    dispatch(addUser(res.data.user));
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user]);

  return (
    <BrowserRouter basename={"/"}>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/profile"} element={<Profile />} />
        <Route path={"/connections"} element={<Connections />} />
        <Route path={"/requests"} element={<Profile />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
export default App;
