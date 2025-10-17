import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error("Error reviewing request:", err);
    }
  };

  const fetchRequest = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/request/received`, {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requests) return null;
  if (requests.length === 0)
    return (
      <h1 className="text-center text-white text-2xl mt-10">
        No Connection Requests 😢
      </h1>
    );

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <h1 className="text-4xl font-bold text-center text-white mb-10">
        Connection Requests
      </h1>

      <div className="flex flex-wrap justify-center gap-8 px-6">
        {requests.map((request) => {
          const { _id, firstName, lastName, age, gender, photoUrl, about } =
            request.fromUserId;

          return (
            <div
              key={_id}
              className="bg-base-300 shadow-lg rounded-2xl p-6 w-80 sm:w-96 flex flex-col items-center text-center transform hover:scale-105 transition duration-300 ease-in-out hover:shadow-xl"
            >
              <img
                className="w-24 h-24 rounded-full object-cover border-4 border-primary shadow-md mb-4"
                src={photoUrl}
                alt={`${firstName} ${lastName}`}
              />

              <h2 className="text-xl font-semibold text-white">
                {firstName} {lastName}
              </h2>
              {age && gender && (
                <p className="text-sm text-gray-300 mt-1">
                  {age} • {gender}
                </p>
              )}
              <p className="text-gray-400 text-sm mt-3 line-clamp-3">
                {about || "No bio available."}
              </p>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => reviewRequest("accepted", request._id)}
                  className="px-5 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium transition duration-200 shadow-md"
                >
                  Accept
                </button>
                <button
                  onClick={() => reviewRequest("rejected", request._id)}
                  className="px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition duration-200 shadow-md"
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
