import {GET_LIST_CURRENCIES} from '../actions/types';

const initialState = {
   currencies: [],
}

export default function (state = initialState, action){
    switch(action.type){
        case GET_LIST_CURRENCIES:
            return {
                ...state,
                currencies: action.payload.currencies,

            }
        default:
            return state;
    }
}


