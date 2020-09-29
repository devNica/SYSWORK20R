import React,{useEffect, useState, Fragment} from 'react'
import SearchIcon from '@material-ui/icons/Search';
import SaveIcon from '@material-ui/icons/Save';
import {useForm} from 'react-hook-form'
import {connect} from 'react-redux';
import LocationSearchForm from '../Modal/LocationSearchForm';
import PositionSearchForm from '../Modal/PositionSearchForm';
import {fn_update_employee} from '../../redux/actions/administration';

const mapStateToProps = (state)=>({
    user_fr: state.auth.user,
    employee_fr: state.administration.employee[0],
    currencies_fr: state.accounting.currencies
})

const EmployeeEditForm = (props)=>{

    const {register, errors, handleSubmit} = useForm();

    const {employee_fr, currencies_fr, user_fr, fn_update_employee, history} = props;
    const [userState, setUserState] = useState(0);
    const [employeeState, setEmployeeState] = useState(0);
    const [permission, setPermission] = useState('')
    const [currency, setCurrency] = useState(0);
    const [location, setLocation] = useState(0);
    const [position, setPosition] = useState(0);
    const [salary, setSalary] = useState(0);
    
    useEffect(()=>{
        let currency = employee_fr !== undefined ? employee_fr.fk_currency : 0
        let location = employee_fr !== undefined ? {idlocation: employee_fr.idlocation, location: employee_fr.location, depends_on: ''} : ''
        let position = employee_fr !== undefined ? {idposition: employee_fr.idposition, position: employee_fr.position, is_active: "ACTIVE"} : ''
        let status = employee_fr !== undefined ? employee_fr.is_active ? "1" : "0" : null
        let state = employee_fr !== undefined ? employee_fr.is_user ? "1" : "0" : null
        let permission = user_fr.permissions.find(element => element === 'status_employee_record')
       
        setCurrency(currency)
        setLocation(location)
        setPosition(position)
        setEmployeeState(status)
        setPermission(permission)
        setUserState(state)
        
    },[employee_fr, user_fr])


    const onStatusChange = (e) =>{
        setEmployeeState(e.target.value)
    }

    const onValueChange = e =>{
        console.log(e.target.value)
        setUserState(!e.target.value)
    }

    const getPosition = (data) => {
        setPosition(data)
    }

    const getLocation = (data) => {
        setLocation(data)
    }

    const handleOnChange = (e)=>{
        console.log(`${e.target.name}:${e.target.value}`)
        if(e.target.name === 'salary') setSalary(e.target.value)
        if(e.target.name === 'fk_currency') setCurrency(e.target.value)
    }

    const onsubmit = (data, e)=>{
        console.log(data);
        data.salary = parseFloat(data.salary)
        data.fk_location = location.idlocation
        data.fk_position = position.idposition
        data.fk_currency = parseInt(data.fk_currency)
        data.is_active = parseInt(data.is_active)
        data.is_user = employee_fr.is_user
        data.idemployee = employee_fr.idemployee
        
        fn_update_employee(data);

        setTimeout(() => {
            history.push('/administration/viewemployeesrecords')
        }, 350);

    }

    const currenciesList = currencies_fr.map((e, i)=>(
        <option key={i} value={e.idcurrency} >{e.description}</option>
    ))

    const optionActiveEmployee = (
        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <div className="form-check form-check-inline">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="is_active" 
                    defaultValue="1"
                    
                    checked={employeeState==="1"}
                    onChange={onStatusChange}
                    ref={
                        register({
                            required: {value: true}
                        })
                    }
                />
                <label className="form-check-label" htmlFor="active">Is active?</label>
            </div>
            <div className="form-check form-check-inline">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="is_active" 
                    defaultValue="0"
                    checked={employeeState==="0"}
                    onChange={onStatusChange}
                    ref={
                        register({
                            required: {value: true}
                        })
                    }
                />
                <label className="form-check-label" htmlFor="active">Is inactive?</label>
            </div>                        
        </div>
    )

    return(
        <Fragment>
            <div className="container">
                <div className="alert form-title-add-employee font-weight-bold">EDIT EMPLOYEE RECORD</div>
                <div className="border py-3 px-3">
                    <form onSubmit={handleSubmit(onsubmit)}>
                        
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                                <div className="form-group">
                                    <label htmlFor="salary">DNI EMPLOYEE:</label>
                                    <input 
                                        type="text"
                                        id="emp_number"
                                        name="emp_number"
                                        readOnly
                                        className="form-control mx-2 font-weight-bold h5"
                                        defaultValue = { employee_fr !== undefined ? employee_fr.emp_number : null}
                                       
                                    />
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                                <div className="form-group">
                                    <label htmlFor="salary">Employee:</label>
                                    <input 
                                        type="text"
                                        id="person"
                                        name="person"
                                        readOnly
                                        className="form-control mx-2 font-weight-bold h5"
                                        defaultValue = { employee_fr !== undefined ? employee_fr.person : null}
                                       
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                                <div className="form-group">
                                    <label htmlFor="salary">Salary:</label>
                                    <input 
                                        type="number"
                                        id="salary"
                                        name="salary"
                                        className="form-control mx-2 font-weight-bold h5"
                                        value = { salary === 0 ? employee_fr !== undefined ? employee_fr.qty : 0.00 : salary}
                                        onChange={handleOnChange}
                                        ref={
                                            register({
                                                required: {value: true, message: 'the salary of the employee is required'}
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                                <div className="form-group">
                                    <label htmlFor="fk_currency">Currency:</label>
                                    <select 
                                        type="number"
                                        id="fk_currency"
                                        name="fk_currency"
                                        className="form-control mx-2 font-weight-bold h5"
                                        value = {currency}
                                        onChange={handleOnChange}
                                        ref={
                                            register({
                                                required: 'Please select one of the options'
                                            })
                                        }
                                    >
                                        
                                        {currenciesList}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                                <div className="form-row mt-3">
                                    <div className="col-md-3 mb-3">
                                        <label htmlFor="location">Location:</label>
                                    </div>
                                    <div className="input-group mb-2 mr-sm-2">
                                        <input
                                            style={{color: '#676c71'}}
                                            type="text"
                                            className="form-control mx-2 font-weight-bold h5"
                                            id="location"
                                            name="location"
                                            readOnly="readonly"
                                            defaultValue = {location.location}
                                            placeholder="*click on the magnifying glass please"
                                            ref={
                                                register({
                                                    required: {value: true, message: `you must select a location`}
                                                })
                                            }
                                        />
                                        <div className="input-group-prepend">
                                            <button
                                                type="button"
                                                className="btn btn-sm color-button-modal btn-dark"
                                                data-toggle="modal"
                                                data-target="#locationSearch"
                                            
                                            >
                                            <SearchIcon fontSize="small" />
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                                <div className="form-row mt-3">
                                    <div className="col-md-3 mb-3">
                                        <label htmlFor="location">Position:</label>
                                    </div>
                                    <div className="input-group mb-2 mr-sm-2">
                                        <input
                                            style={{color: '#676c71'}}
                                            type="text"
                                            className="form-control mx-2 font-weight-bold h5"
                                            id="position"
                                            name="position"
                                            readOnly="readonly"
                                            defaultValue={position.position}
                                            placeholder="*click on the magnifying glass please"
                                            ref={
                                                register({
                                                    required: {value: true, message: `you must select a position`}
                                                })
                                            }
                                        />
                                        <div className="input-group-prepend">
                                            <button
                                                type="button"
                                                className="btn btn-sm color-button-modal btn-dark"
                                                data-toggle="modal"
                                                data-target="#positionSearch"
                                            
                                            >
                                            <SearchIcon fontSize="small" />
                                            </button>
                                        </div>
                                    </div>

                                </div>        
                            </div>
                        </div>

                        <div className="row mt-3 border mx-3 px-3 py-3 my-3">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div className="form-check form-check-inline">
                                    <input 
                                        className="form-check-input" 
                                        type="checkbox" 
                                        name="userState" 
                                        defaultValue={userState}
                                        disabled={true}
                                        checked={userState==="1"}
                                        onChange={onValueChange}
                                       
                                    />
                                    <label className="form-check-label" htmlFor="userState">Is user?</label>
                                </div>
                                
                            </div>
                            
                            {/* OPTION CHANGE STATUS PERSON */}

                            {permission !== null ? permission === 'status_employee_record' ? optionActiveEmployee : null : null}
                        </div>
                        
                        <div className="form-group mt-5 border py-3">
                            <button className="btn btn-secondary btn-sm offset-5" type="submit"> <SaveIcon  style={{ color: "#4858b8"}}/> Save record</button>
                        </div>

                    </form>
                </div>
            </div>

            <PositionSearchForm fetchData={getPosition}/>
            <LocationSearchForm fetchData={getLocation}/>


        </Fragment>
    )
}

export default connect(mapStateToProps,{fn_update_employee})(EmployeeEditForm);