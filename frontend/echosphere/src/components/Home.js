import React, { useEffect } from "react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
// import Feed from './Feed'
import { Outlet } from "react-router-dom";
import useOtherUsers from "../hooks/userOtherusers";
import { useSelector } from "react-redux";
import useGetMyTweet from "../hooks/usegetMyTweets.js";
import { useNavigate } from "react-router-dom";
function Home() {
  //this is for rendering the hme page
  //whenever the user is logged in
  //it will show the left sidebar, right sidebar and
  //the feed component which will show the tweets of the user
  //and the other users
  const { user, otherUsers } = useSelector((store) => store.user);
const navigate= useNavigate();

useEffect(()=>{
  if(!user){
    navigate("/login")
  }
},[]);

 
  useOtherUsers(user?._id);
  useGetMyTweet(user?._id);

  return (
    <div className="flex justify-between w-[80%] mx-auto my-2">
      <LeftSidebar />
      <Outlet />
      <RightSidebar otherUsers={otherUsers} />
    </div>
  );
}

export default Home;
