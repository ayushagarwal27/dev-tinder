import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/userSlice.js";
import { useNavigate } from "react-router-dom";
import { config } from "../../utils/config.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      let res;
      if (isSignUp) {
        res = await axios.post(
          config.urls.baseUrl + config.urls.auth.signup,
          {
            firstName,
            lastName,
            email,
            password,
          },
          { withCredentials: true },
        );
      } else {
        res = await axios.post(
          config.urls.baseUrl + config.urls.auth.login,
          {
            email,
            password,
          },
          { withCredentials: true },
        );
      }
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
          <div role="tablist" className="tabs tabs-boxed">
            <p
              role="tab"
              className={`tab ${isSignUp && "tab-active"}`}
              onClick={() => setIsSignUp(true)}
            >
              Sign Up
            </p>
            <p
              role="tab"
              className={`tab ${!isSignUp && "tab-active"}`}
              onClick={() => setIsSignUp(false)}
            >
              Sign In
            </p>
          </div>

          <div className={"flex flex-col gap-4 my-4"}>
            {isSignUp && (
              <>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="input input-bordered w-full max-w-xs"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="input input-bordered w-full max-w-xs"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </>
            )}

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
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
