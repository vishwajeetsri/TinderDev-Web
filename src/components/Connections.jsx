import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;
  if (connections.length === 0)
    return (
      <h1 className="text-center text-white text-2xl mt-10">
        No Connections Found 😢
      </h1>
    );

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <h1 className="text-4xl font-bold text-center text-white mb-10">
        Your Connections
      </h1>

      <div className="flex flex-wrap justify-center gap-8 px-6">
        {connections.map((connect) => {
          const { _id, firstName, lastName, age, gender, photoUrl, about } =
            connect;
          return (
            <div
              key={_id}
              className="bg-base-300 shadow-lg rounded-2xl p-6 w-80 transform hover:scale-105 transition duration-300 ease-in-out hover:shadow-xl"
            >
              <div className="flex flex-col items-center text-center">
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
