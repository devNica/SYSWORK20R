import { combineReducers } from "redux";
import auth from './auth';
import notifications from './notifications';
import administration from './administration';
import accounting from './accounting';
import users from './users'

export default combineReducers({
    notifications,
    auth,
    administration,
    accounting,
    users,
});

