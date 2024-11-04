import { useState } from "react";
import UserCard from "./UserCard.jsx";
import axios from "axios";
import { config } from "../utils/config.js";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice.js";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || 0);
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [photoUrl, setPhotoUrl] = useState(user?.avatar_url || "");

  const dispatch = useDispatch();

  const avatar_url = photoUrl;

  async function saveProfile() {
    try {
      const res = await axios.patch(
        config.urls.baseUrl + config.urls.profile.edit,
        { firstName, lastName, age, gender, about, avatar_url },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.user));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div
      className={"flex justify-center gap-10 items-center my-10 mb-20 w-full"}
    >
      <div className="card bg-base-300 max-w-md shadow-xl">
        <div className="card-body">
          <h2 className="text-center font-semibold text-[24px]">
            Edit Profile
          </h2>

          <div className={"flex flex-col gap-4 my-4"}>
            <div className={"flex gap-4"}>
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
            </div>
            <div className={"flex gap-4"}>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Photo Url</span>
                </div>
                <input
                  type="text"
                  placeholder="Photo Url"
                  className="input input-bordered w-full max-w-xs"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Age</span>
                </div>
                <input
                  type="number"
                  placeholder="0"
                  className="input input-bordered w-full max-w-xs"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>
            </div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Gender</span>
              </div>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full max-w-xs"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">About</span>
              </div>
              <textarea
                placeholder="About"
                className=" textarea textarea-bordered w-full max-w-xs"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </label>
          </div>

          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={saveProfile}>
              Save Profile
            </button>
          </div>
        </div>
      </div>
      <UserCard
        user={{ firstName, lastName, age, about, avatar_url, gender }}
      />
    </div>
  );
};
export default EditProfile;
