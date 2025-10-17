import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import axios from "axios";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  if (!user) return <div>Loading...</div>;
  
  const dispatch = useDispatch()

  const handleSendRequest = async (status , _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(user._id))
    } catch (err) {}
  };
  return (
    <div className="card bg-base-300 w-96 shadow-2xl">
      <figure className="object-fill">
        <img className="w-[85%] h-auto mt-2 " src={user.photoUrl} alt="Photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{user.firstName + " " + user.lastName}</h2>
        <p>{user.age + " " + user.gender}</p>
        <p>{user.about}</p>
        <div className="card-actions justify-center mt-2 ">
          <button onClick={() => handleSendRequest("ignored", user._id)} className="btn btn-primary px-10 mr-2">Ignore</button>
          <button onClick={() => handleSendRequest("interested", user._id)} className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
