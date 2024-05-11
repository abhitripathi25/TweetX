import React from "react";
import { CiHome, CiHashtag, CiUser, CiBookmark } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { getUser, getOtherUsers, getMyProfile } from "../redux/userslice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function LeftSidebar() {
  const { user } = useSelector((store) => store.user);
   const dispatch = useDispatch();
   const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
        const res = await axios.get(`${USER_API_END_POINT}/logout`);
        dispatch(getUser(null));
        dispatch(getOtherUsers(null));
        dispatch(getMyProfile(null));
        navigate('/login');
        toast.success(res.data.message);
    } catch (error) {
        console.log(error);
    }
}

  return (
    <div className="w-[20%]">
      <div>
        <div>
          <img
            className="ml-5"
            width={"24px"}
            src="https://www.edigitalagency.com.au/wp-content/uploads/new-Twitter-logo-x-black-png-1200x1227.png"
            alt="twitter-logo"
          />
        </div>
        <div className="my-4">
          <Link to="/">
            <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full">
              <div>
                <CiHome size="24px" />
              </div>
              <h1 className="font-bold text-lg ml-2">Home</h1>
            </div>
          </Link>
          <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full">
            <div>
              <CiHashtag size="24px" />
            </div>
            <h1 className="font-bold text-lg ml-2">Explore</h1>
          </div>
          <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full">
            <div>
              <IoIosNotificationsOutline size="24px" />
            </div>
            <h1 className="font-bold text-lg ml-2">Notifications</h1>
          </div>
          <Link to={`/profile/${user?._id}`}>
            <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full">
              <div>
                <CiUser size="24px" />
              </div>
              <h1 className="font-bold text-lg ml-2">Profile</h1>
            </div>
          </Link>
          <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full">
            <div>
              <CiBookmark size="24px" />
            </div>
            <h1 className="font-bold text-lg ml-2">Bookmarks</h1>
          </div>
          <div onClick={logoutHandler} className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full">
            <div>
              <AiOutlineLogout size="24px" />
            </div>
            <h1 className="font-bold text-lg ml-2">Logout</h1>
          </div>
          <button className="px-4 py-2 border-none text-md bg-[#1D9BF0] w-full rounded-full text-white font-bold">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeftSidebar;
