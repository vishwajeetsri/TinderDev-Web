import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import axios from "axios";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  if (!user) return <div className="text-center text-gray-400 mt-5">Loading...</div>;
  
  const dispatch = useDispatch();

  const handleSendRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(user._id));
    } catch (err) {}
  };

  return (
    <div className="bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-2xl w-96 overflow-hidden text-gray-100 transition-transform transform hover:scale-105">
      
      {/* Profile Image */}
      <div className="flex justify-center mt-4">
        <img 
          src={user.photoUrl} 
          alt="Profile" 
          className="w-32 h-32 rounded-full object-cover border-4 border-purple-500 shadow-lg"
        />
      </div>

      {/* User Info */}
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-purple-400 mb-2">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-gray-300 mb-1">{user.age} • {user.gender}</p>
        <p className="text-gray-400 mb-4">{user.about}</p>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => handleSendRequest("ignored", user._id)} 
            className="btn bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition"
          >
            Ignore
          </button>
          <button 
            onClick={() => handleSendRequest("interested", user._id)} 
            className="btn bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
