import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import axios from "axios";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {}
  };

  return (
    <div className="w-full bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        
        {/* Brand / Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400"
        >
          🧑‍💻 DevTinder
        </Link>

        {user && (
          <div className="flex items-center gap-4">
            <span className="text-gray-300 hidden sm:block">Welcome, <span className="text-purple-400 font-semibold">{user.firstName}</span></span>

            {/* Avatar Dropdown */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-purple-400 transition">
                <div className="w-10 rounded-full overflow-hidden">
                  <img alt="user photo" src={user.photoUrl} className="object-cover w-full h-full"/>
                </div>
              </div>

              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-gray-800 text-gray-100 rounded-xl shadow-lg mt-3 w-56 p-2 border border-gray-700"
              >
                <li>
                  <Link to="/profile" className="justify-between hover:bg-gray-700 rounded-lg px-2 py-1">
                    Profile <span className="badge badge-info">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections" className="hover:bg-gray-700 rounded-lg px-2 py-1">Connections</Link>
                </li>
                <li>
                  <Link to="/requests" className="hover:bg-gray-700 rounded-lg px-2 py-1">Connection Requests</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="hover:bg-gray-700 rounded-lg px-2 py-1 w-full text-left">Logout</button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
