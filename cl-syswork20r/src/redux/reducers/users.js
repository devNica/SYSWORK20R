import {CLEAR_ACCOUNTS_LIST, GET_LIST_USER_ACCOUNTS, GET_USERACCOUNT_INFO} from '../actions/types';

const initialState = {
   accounts: [],
   info: []
}

export default function (state = initialState, action){
    switch(action.type){
        case GET_LIST_USER_ACCOUNTS:
            return {
                ...state,
                accounts: action.payload.accounts,

            }
        case CLEAR_ACCOUNTS_LIST:
            return {
                ...state,
                accounts: []
            }
        case GET_USERACCOUNT_INFO:
            return {
                ...state,
                info: action.info
            }

        default:
            return state;
    }
}