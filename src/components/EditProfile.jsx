import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  if (!user) return <div className="text-center mt-20 text-gray-400">Loading...</div>;

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [err, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age: Number(age), gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row justify-center items-start md:items-center gap-8 p-6 bg-gray-900">
      
      {/* Profile Form */}
      <div className="w-full md:w-96 bg-gray-800/80 backdrop-blur-md shadow-xl rounded-2xl p-8 flex flex-col text-gray-100">
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-400">Edit Profile</h2>

        <label className="label">First Name</label>
        <input
          type="text"
          className="input input-bordered w-full mb-3 bg-gray-700 text-gray-100 border-gray-600 focus:ring-2 focus:ring-purple-400"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label className="label">Last Name</label>
        <input
          type="text"
          className="input input-bordered w-full mb-3 bg-gray-700 text-gray-100 border-gray-600 focus:ring-2 focus:ring-purple-400"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label className="label">Photo URL</label>
        <input
          type="text"
          className="input input-bordered w-full mb-3 bg-gray-700 text-gray-100 border-gray-600 focus:ring-2 focus:ring-purple-400"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />

        <label className="label">Age</label>
        <input
          type="number"
          className="input input-bordered w-full mb-3 bg-gray-700 text-gray-100 border-gray-600 focus:ring-2 focus:ring-purple-400"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <label className="label">Gender</label>
        <input
          type="text"
          className="input input-bordered w-full mb-3 bg-gray-700 text-gray-100 border-gray-600 focus:ring-2 focus:ring-purple-400"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />

        <label className="label">About</label>
        <textarea
          className="textarea textarea-bordered w-full mb-3 bg-gray-700 text-gray-100 border-gray-600 focus:ring-2 focus:ring-purple-400"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          rows={3}
        />

        {err && <p className="text-red-500 mt-1 mb-2">{err}</p>}

        <button
          onClick={saveProfile}
          className="btn bg-purple-600 hover:bg-purple-700 text-white mt-2"
        >
          Save Profile
        </button>
      </div>

      {/* Live Preview */}
      <div className="w-full md:w-80">
        <h3 className="text-xl font-semibold text-center mb-4 text-purple-400">Live Preview</h3>
        <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50">
          <div className="alert alert-success shadow-lg rounded-xl bg-green-700 text-green-100 px-6 py-3">
            Profile Updated Successfully!
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
