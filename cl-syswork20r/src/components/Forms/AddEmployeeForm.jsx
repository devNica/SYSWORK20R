import React,{Fragment} from 'react';
import {connect} from 'react-redux'
import {useForm} from 'react-hook-form'
import SearchIcon from '@material-ui/icons/Search';
import SaveIcon from '@material-ui/icons/Save';
import './AddPersonForm.css'

const mapStateToProps = state =>({

})

const AddEmployeeForm = ()=>{

    const {register, errors, handleSubmit} = useForm();

    const onsubmit = (data, e) =>{
        console.log(data)
        //e.target.reset();
    }

    return (
        <Fragment>
            <div className="container">
                <div className="alert form-title-add-employee font-weight-bold">REGISTER EMPLOYEE</div>
                <div className="border py-3 px-3">
                    <form onSubmit={handleSubmit(onsubmit)}>
                        <div className="form-group">
                            <label htmlFor="dni">DNI:</label>
                            <input
                                name="emp_number"
                                id="emp_number" 
                                type="text" 
                                className="form-control" 
                                placeholder="Enter the employee's identification"
                                ref={
                                    register({
                                        required: {value: true, message: 'the ID of the employee is required'}
                                    })
                                }
                            />
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                                <div className="form-group">
                                    <label htmlFor="salary">Salary:</label>
                                    <input 
                                        type="number"
                                        id="salary"
                                        name="salary"
                                        className="form-control"
                                        placeholder="Enter the employees´s salary"
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
                                    <label htmlFor="currency">Currency:</label>
                                    <select 
                                        type="currency"
                                        id="currency"
                                        name="currency"
                                        className="form-control"
                                        ref={
                                            register({
                                                required: {value: true, message: 'please select a currency type'}
                                            })
                                        }
                                    >
                                        <option value="0">Select an option</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="form-row mt-3">
                            <div className="col-md-3 mb-3">
                                <label htmlFor="person">Person:</label>
                            </div>
                            <div className="input-group mb-2 mr-sm-2">
                                <input
                                    style={{color: '#676c71'}}
                                    type="text"
                                    className="form-control mx-2 font-weight-bold h5"
                                    id="person"
                                    name="person"
                                    placeholder="*click on the magnifying glass please"
                                    ref={
                                        register({
                                            required: {value: true, message: `you must select a person's record`}
                                        })
                                    }
                                />
                                <div className="input-group-prepend">
                                    <button
                                        type="button"
                                        className="btn btn-sm color-button-modal btn-dark"
                                        data-toggle="modal"
                                        data-target="#searchPerson"
                                    >
                                    <SearchIcon fontSize="small" />
                                    </button>
                                </div>
                            </div>

                        </div>

                        <div className="form-row mt-3">
                            <div className="col-md-3 mb-3">
                                <label htmlFor="position">Position:</label>
                            </div>
                            <div className="input-group mb-2 mr-sm-2">
                                <input
                                    style={{color: '#676c71'}}
                                    type="text"
                                    className="form-control mx-2 font-weight-bold h5"
                                    id="position"
                                    name="position"
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
                                        data-target="#searchPosition"
                                    >
                                    <SearchIcon fontSize="small" />
                                    </button>
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
                                                data-target="#searchLocation"
                                               
                                            >
                                            <SearchIcon fontSize="small" />
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                            
                            </div>
                        </div>
                        
                        <div className="form-group mt-5 border py-3">
                            <button className="btn btn-secondary btn-sm offset-5" type="submit"> <SaveIcon  style={{ color: "#4858b8"}}/> Save record</button>
                        </div>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}


export default connect(mapStateToProps,{})(AddEmployeeForm);