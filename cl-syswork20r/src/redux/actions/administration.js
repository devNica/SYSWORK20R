import {GET_LIST_DEGREES, GET_PERSONS_RECORDS, GET_PERSON_BY_IDPERSON} from './types';
import api from '../../api/api'
import {models} from '../../models/index';

export const fn_list_degrees = () => dispatch =>{
    api.administration.listDegrees()
    .then(response=>{

        console.log(response)

        dispatch({
            type: GET_LIST_DEGREES,
            payload: {
               degrees: response.degrees
            }
        })
    })
    .catch(error => console.log(error));
}

export const fn_list_persons_records = () => dispatch => {
    api.administration.view_persons_records()
    .then(response =>{

        let info = models.persons(response.persons)


        dispatch({
            type: GET_PERSONS_RECORDS,
            payload: {
                persons: info
            }
        })
    })
    .catch(error => console.log(error))
}

export const fn_get_person_by_idperson = idperson => dispatch =>{
    console.log(idperson)
    api.administration.get_person(idperson)
    .then(response=>{
        console.log(response)
        dispatch({
            type: GET_PERSON_BY_IDPERSON,
            payload:{
                person: response.person
            }
        })
    })
    .catch(error=>console.log(error))
}

export const fn_create_person_record = data => dispatch =>{
    api.administration.create_person(data)
    .then(response => {
        console.log(response);
    })
    .catch(error => console.log(error))
}

export const fn_edit_person_record = (data) => dispatch =>{

    api.administration.edit_person_record(data)
    .then(response =>{
       console.log(response)
    })
    .catch(error => console.log(error))
}