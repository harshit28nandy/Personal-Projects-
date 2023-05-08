import {legacy_createStore, applyMiddleware} from "redux";
import rootReducer from "../reducers";
import thunkMiddleware from "redux-thunk";


const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;