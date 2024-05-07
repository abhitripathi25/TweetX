import React from "react";
import CreatePost from "./CreatePost";
import Tweet from "./Tweet.js";
import { useSelector } from "react-redux";

function Feed() {
  //we have called tweets from the store because we want to show the tweets
  //in the feed component nd here the showing of tweet is done by the tweet component
  const { tweets } = useSelector((store) => store.tweet);
  console.log(tweets);
  return (
    <div className="w-[50%] border border-gray-200">
      <CreatePost />
      {tweets?.map((tweet) => (
        <Tweet key={tweet?._id} tweet={tweet} />
      ))}
    </div>
  );
}

export default Feed;
