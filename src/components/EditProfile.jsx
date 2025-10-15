import React, { useState } from "react";
import { useActionData } from "react-router-dom";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  if (!user) return <div>Loading...</div>;
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [err, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age: Number(age),
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setInterval(() => {
          setShowToast(false)
      },3000)
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-2">
      <div className="w-80 mr-6">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <label className="text-xl ml-24 ">Edit Profile</label>

          <label className="label">First Name</label>
          <input
            type="text"
            className="input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder=""
          />

          <label className="label">Last Name</label>
          <input
            type="text"
            className="input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder=""
          />

          <label className="label">PhotoUrl</label>
          <input
            type="text"
            className="input"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            placeholder=""
          />

          <label className="label">Age</label>
          <input
            type="text"
            className="input"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder=""
          />

          <label className="label">Gender</label>
          <input
            type="text"
            className="input"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            placeholder=""
          />

          <label className="label">About</label>
          <input
            type="text"
            className="input"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder=""
          />
          {err && <p className="text-red-500 mt-2">{err}</p>}
          <button onClick={saveProfile} className="btn btn-neutral mt-4">
            Save Profile
          </button>
        </fieldset>
      </div>
      <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Updated Successfully!!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
