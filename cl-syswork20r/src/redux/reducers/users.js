import {GET_LIST_USER_ACCOUNTS} from '../actions/types';

const initialState = {
   accounts: [],
}

export default function (state = initialState, action){
    switch(action.type){
        case GET_LIST_USER_ACCOUNTS:
            return {
                ...state,
                accounts: action.payload.accounts,

            }
        default:
            return state;
    }
}