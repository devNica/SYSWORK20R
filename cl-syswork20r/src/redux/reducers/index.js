import { combineReducers } from "redux";
import auth from './auth';
import notifications from './notifications';
import administration from './administration';

export default combineReducers({
    notifications,
    auth,
    administration
});

