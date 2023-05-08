import { combineReducers } from "redux";
import userReducer from "./useReducer";


const rootReducer = combineReducers({
    userState: userReducer,
});

export default rootReducer;