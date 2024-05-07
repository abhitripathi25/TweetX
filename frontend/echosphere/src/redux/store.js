import { configureStore } from "@reduxjs/toolkit";
import userslice from "./userslice";
import tweetslice from "./tweetslice";

const store = configureStore({
  reducer: {
    // Add reducers here
    user: userslice,
    tweet: tweetslice,
  },
});
export default store;
