import React, {Fragment} from 'react';
import {useForm} from 'react-hook-form'
import SaveIcon from '@material-ui/icons/Save';
import './AddPersonForm.css'
import {connect} from 'react-redux'
import {fn_create_person_record} from '../../redux/actions/administration';

const mapStateToProps = state => ({
    degrees_fr: state.administration.degrees,
})

const AddPersonForm = (props)=>{

    const {register, errors, handleSubmit} = useForm();
    const {degrees_fr, fn_create_person_record} = props;

    const onsubmit = (data, e) =>{
        if(!data.customer) data.staff = "1";
        else data.staff="0";
        fn_create_person_record(data)
        e.target.reset();
    }

    const degreeList = degrees_fr.map((degree, i)=>(
        <option key={i} value={degree.iddegree}>{degree.degree}</option>
    ))

    return (
        <Fragment>
            <div className="container">
                <div className="alert form-title font-weight-bold">REGISTER PERSON</div>
                <div className="border py-3 px-3">
                   <form onSubmit={handleSubmit(onsubmit)}>
                        <div className="form-group">
                            <label htmlFor="dni">DNI:</label>
                            <input
                                name="dni"
                                id="dni" 
                                type="text" 
                                className="form-control" 
                                placeholder="insert the person's ID"
                                ref={
                                    register({
                                        required: {value: true, message: 'the ID of the person is required'}
                                    })
                                }
                            />
                        </div>
                        <span className="text-danger text-small d-block my-2">
                            {errors?.dni?.message}
                        </span>
                        <div className="form-group">
                            <label htmlFor="firstname">First Name:</label>
                            <input 
                                id="firstname"
                                name="firstname"
                                type="text" 
                                className="form-control" 
                                placeholder="Insert the person's firts name"
                                ref={
                                    register({
                                        required: {value: true, message: 'the firstname of the person is required'}
                                    })
                                }
                            />
                        </div>
                        <span className="text-danger text-small d-block my-2">
                            {errors?.firstname?.message}
                        </span>
                        <div className="form-group">
                            <label htmlFor="lastname">Last Name:</label>
                            <input 
                                id="lastname"
                                name="lastname"
                                type="text" 
                                className="form-control" 
                                placeholder="Insert the person's last name"
                                ref={
                                    register({
                                        required: {value: true, message: 'the lastname of the person is required'}
                                    })
                                }
                            />
                        </div>
                        <span className="text-danger text-small d-block my-2">
                            {errors?.lastname?.message}
                        </span>
                        <div className="form-group">
                            <label htmlFor="address">Address:</label>
                            <input 
                                id="address"
                                name="address"
                                type="text" 
                                className="form-control" 
                                placeholder="Insert the person's Address"
                                ref={
                                    register({
                                        required: {value: true, message: 'the address of the person is required'}
                                    })
                                }
                            />
                        </div>
                        <span className="text-danger text-small d-block my-2">
                            {errors?.address?.message}
                        </span>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="phone">Phone:</label>
                                    <input
                                        id="phone"
                                        name="phone" 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Insert the person´s phone number"
                                        ref={
                                            register({
                                                required: {value: true, message: 'the phone of the person is required'}
                                            })
                                        }
                                    />
                                </div>
                                <span className="text-danger text-small d-block my-2">
                                    {errors?.phone?.message}
                                </span>
                            </div>
                            
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="degree">Degree:</label>
                                    <select 
                                        name="degree" 
                                        id="degree" 
                                        className="form-control"
                                        ref={
                                            register({
                                                required: 'Please select one of the options'
                                            })
                                        }
                                    >
                                        <option value="0">Select an option</option>
                                       {degreeList}
                                    </select>
                                    <span className="text-danger text-small d-block my-2">
                                        {errors?.degree?.message}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="form-check form-check-inline">
                            <input 
                                className="form-check-input" 
                                type="radio" 
                                name="customer" 
                                id="customer" 
                                value="1"
                                ref={
                                    register({
                                        required: {value: true}
                                    })
                                }
                            />
                            <label className="form-check-label" htmlFor="customer">Is Customer?</label>
                        </div>
                        <div className="form-check form-check-inline mb-4 mt-2">
                            <input 
                                className="form-check-input" 
                                type="radio" 
                                name="customer" 
                                id="staff" 
                                value="0"
                                ref={
                                    register({
                                        required: {value: true}
                                    })
                                }
                            />
                            <label className="form-check-label" htmlFor="staff">Is Staff?</label>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-secondary btn-sm offset-5" type="submit"> <SaveIcon  style={{ color: "#4858b8"}}/> Save record</button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}


export default connect(mapStateToProps,{fn_create_person_record})(AddPersonForm);