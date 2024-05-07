import React from "react";
import Avatar from "react-avatar";
import { FaRegComment } from "react-icons/fa";
import { CiHeart, CiBookmark } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant.js";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getRefresh } from "../redux/tweetslice.js";

//Tweet component is used to display the tweet on the screen
//here we have given tweet as a prop so that we can use it in the component
//hre the amin thing is the tweet description which is shown in the tweet
//here we have shown the name and username of the user who has posted the tweet
//and this name and username is coming from the userdetails array of the tweet
// name and username will be shown only for the user who has posted the tweet
//and we can knwo that by checking the id of the user who has posted the tweet
//and the id can be find in the userdetails array of the tweet
//from here the twwet component is called in the feed component
//from where the main function is happening
//and fro the feed component by mapping the tweets we are calling the tweet component
//and in the home component we are calling the useGetMyTweet hook because
//we want to get the tweets of the user who is logged in
//so bascicaly first we are getting the tweets of the user who is logged in
//and then we are getting the tweets of the users who are followed by the user who is logged in

function Tweet({ tweet }) {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const likeorDislikehandler = async (id) => {
    try {
      const res = await axios.put(
        `${TWEET_API_END_POINT}/like/${id}`,
        { id: user?._id },
        { withCredentials: true }
      );
      dispatch(getRefresh());

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  //baad me dekhna yaha agr dlt me issue aaye to
  const deletetweeehandler = async () => {
    try {
      const res = await axios.delete(
        `${TWEET_API_END_POINT}/delete/${tweet?._id}`,
        {
          withCredentials: true,
        }
      );
      dispatch(getRefresh());
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="border-b border-gray-200">
      <div>
        <div className="flex p-4">
          <Avatar
            src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg"
            size="40"
            round={true}
          />
          <div className=" ml-2 w-full">
            <div className="flex items-center">
              <h1 className="font-bold">{tweet?.userDetails[0]?.name}</h1>{" "}
              {/* Placeholder name */}
              <p className="text-gray-500 text-sm ml-1">{`@${tweet?.userDetails[0]?.username}. 1m`}</p>{" "}
              {/* Placeholder username and timestamp */}
            </div>
            <div>
              <p>{tweet?.description}</p> {/* Placeholder tweet description */}
            </div>
            <div className="flex justify-between my-3">
              <div className="flex items-center">
                <div className="p-2 hover:bg-green-200 rounded-full cursor-pointer">
                  <FaRegComment size="20px" />
                </div>
                <p>0</p> {/* Placeholder comment count */}
              </div>
              <div className="flex items-center">
                <div
                  onClick={() => likeorDislikehandler(tweet?._id)}
                  className="p-2 hover:bg-pink-200 rounded-full cursor-pointer"
                >
                  <CiHeart size="24px" />
                </div>
                <p>{tweet?.like?.length}</p> {/* Placeholder like count */}
              </div>
              <div className="flex items-center">
                <div className="p-2 hover:bg-yellow-200 rounded-full cursor-pointer">
                  <CiBookmark size="24px" />
                </div>
                <p>0</p> {/* Placeholder bookmark count */}
              </div>
              {/* Placeholder delete button */}
              {user?._id === tweet?.userId && (
                <div onClick={deletetweeehandler} className="flex items-center">
                  <div className="p-2 hover:bg-red-300 rounded-full cursor-pointer">
                    <MdOutlineDeleteOutline size="24px" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tweet;
