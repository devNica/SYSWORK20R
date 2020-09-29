import {GET_LIST_DEGREES,
GET_PERSONS_RECORDS, 
GET_PERSON_BY_IDPERSON, 
GET_JOBS_LIST, 
GET_LOCATIONS_LIST, 
GET_EMPLOYEE_NUMBER,
CLEAR_PERSONS_RECORDS,
GET_EMPLOYEES_RECORDS,
GET_EMPLOYEE_BY_IDEMPLOYEE,
CLEAR_EMPLOYEE_RECORD} from './types';
import api from '../../api/api'
import {models} from '../../models/index';

export const fn_list_degrees = () => dispatch =>{
    api.administration.listDegrees()
    .then(response=>{
        dispatch({
            type: GET_LIST_DEGREES,
            payload: {
               degrees: response.degrees
            }
        })
    })
    .catch(error => console.log(error));
}

export const fn_list_persons_records = (data) => dispatch => {
    api.administration.view_persons_records(data)
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
    api.administration.get_person(idperson)
    .then(response=>{
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

export const fn_get_jobs_list = data => dispatch => {
    api.administration.get_job_list(data)
    .then(response => {
        let info = models.positions(response.positions)
        dispatch({
            type: GET_JOBS_LIST,
            payload:{
                positions: info
            }
        })
    })
    .catch(error => console.log(error))
}


export const fn_get_locations_list = data => dispatch => {
    api.administration.get_locations_list(data)
    .then(response => {
        let info = models.locations(response.locations)
        dispatch({
            type: GET_LOCATIONS_LIST,
            payload:{
                locations: info
            }
        })
    })
    .catch(error => console.log(error))
}

export const fn_get_employee_number = () => dispatch =>{
    api.administration.get_employee_numer()
    .then(response => {
        dispatch({
            type: GET_EMPLOYEE_NUMBER,
            payload:{
                emp_number: response.data
            }
        })
    })
    .catch(error => console.log(error))
}

export const fn_create_employee_record = data => dispatch =>{
    api.employee.create(data)
    .then(response =>{
        console.log(response)
    })
    .catch(err=>console.log(err))
}

export const fn_list_employees_records = data => dispatch =>{
    api.employee.findAll(data)
    .then(response =>{
        let info = models.employees(response.employees)
        dispatch({
            type: GET_EMPLOYEES_RECORDS,
            payload: info
        })
    })
    .catch(error => console.log(error))
}

export const fn_get_employee_byID = data => dispatch =>{
    api.employee.findOne(data)
    .then(response=>{
        dispatch({
            type: GET_EMPLOYEE_BY_IDEMPLOYEE,
            payload:{
                employee: response.employee
            }
        })
    })
    .catch(error=>console.log(error))
}

export const fn_update_employee = data => dispatch =>{
    api.employee.update(data)
    .then(response=>{
        
    })
    .catch(error=>console.log(error))
}


export const  fn_clear_persons_records = () => dispatch =>{
    dispatch({
        type: CLEAR_PERSONS_RECORDS,
    })
}

export const fn_clear_employee_record = () => dispatch =>{
    dispatch({
        type: CLEAR_EMPLOYEE_RECORD
    })
}