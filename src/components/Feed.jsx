import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed && feed.length > 0) return; // ✅ safe fetch
    try {
      const res = await axios.get(`${BASE_URL}/feed`, { withCredentials: true });
      console.log("API response:", res.data);

      const feedData = Array.isArray(res.data) ? res.data : res.data.data;
      dispatch(addFeed(feedData || []));
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return <div>Loading feed...</div>;
  if (feed.length === 0) return <div>No users found.</div>;

  return (
    <div className="flex justify-center mt-8">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
