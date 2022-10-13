import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import { reducer as formReducer } from 'redux-form'
import streamReducer from "./streamReducer";

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    streams: streamReducer
})