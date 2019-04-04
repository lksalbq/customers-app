import { combineReducers } from "redux";
import reduceReducers from "reduce-reducers";
import authReducer from "../scenes/login/_/reducers";

export default reduceReducers(
  combineReducers({
    auth: authReducer
  })
);
