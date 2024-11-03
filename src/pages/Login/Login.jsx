import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/userSlice.js";
import { useNavigate } from "react-router-dom";
import { config } from "../../utils/config.js";

const Login = () => {
  const [email, setEmail] = useState("jognadam@wmail.com");
  const [password, setPassword] = useState("mypAass$word456");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      const res = await axios.post(
        config.urls.baseUrl + config.urls.auth.login,
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={"flex justify-center items-center my-10 w-full"}>
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="text-center font-semibold text-[24px]">Login</h2>

          <div className={"flex flex-col gap-4 my-4"}>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="text"
                placeholder="Email"
                className="input input-bordered w-full max-w-xs"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                placeholder="*******"
                className="input input-bordered w-full max-w-xs"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>

          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
