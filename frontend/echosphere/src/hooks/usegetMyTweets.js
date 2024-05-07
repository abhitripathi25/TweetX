import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllTweets } from "../redux/tweetslice.js";
import { useSelector } from "react-redux";

const useGetMyTweet = (id) => {
  const dispatch = useDispatch();
  const {refresh} = useSelector((store) => store.tweet);
  useEffect(() => {
    const fetchMyTweets = async () => {
      try {
        const res = await axios.get(
          `${TWEET_API_END_POINT}/getalltweet/${id}`,
          { withCredentials: true }
        );
        dispatch(getAllTweets(res.data.tweets));
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyTweets();
  }, [refresh]);
};

export default useGetMyTweet;
