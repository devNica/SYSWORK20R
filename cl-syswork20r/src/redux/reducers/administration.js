import {GET_LIST_DEGREES, GET_PERSONS_RECORDS, GET_PERSON_BY_IDPERSON, GET_JOBS_LIST} from '../actions/types';

const initialState = {
   degrees: [],
   persons: [],
   person_found: null,
   positions: []
}

export default function (state = initialState, action){
    switch(action.type){
        case GET_LIST_DEGREES:
            return {
                ...state,
                degrees: action.payload.degrees
            }
        
        case GET_PERSONS_RECORDS:
            return {
                ...state,
                persons: action.payload.persons
            }
        
        case GET_PERSON_BY_IDPERSON:
            return{
                ...state,
                person_found: action.payload.person
            }
        
        case GET_JOBS_LIST:
            return{
                ...state,
                positions: action.payload.positions
            }

        default:
            return state;
    }
}


