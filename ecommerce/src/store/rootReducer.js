import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice";

const rootReducer = combineReducers({
  auth: userReducer,

});

export default rootReducer;