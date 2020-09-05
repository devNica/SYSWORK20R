import React, {Fragment} from 'react';
import {useForm} from 'react-hook-form'
import SaveIcon from '@material-ui/icons/Save';
import './AddPersonForm.css'
import {connect} from 'react-redux'
import { useState, useEffect } from 'react';
import {fn_edit_person_record} from '../../redux/actions/administration';

const mapStateToProps = state =>({
    degrees_fr: state.administration.degrees,
    person_fr: state.administration.person_found,
    user_fr: state.auth.user,
})

const EditPersonForm = (props) =>{

    const {register, errors, handleSubmit} = useForm();
    const [selectedOPtion, setOption] = useState('');
    const [activeOption, setStatus] = useState('');
    const [degreeSelected, setDegree] = useState(0);
    const [permission, setPermission] = useState('')
    const {degrees_fr, person_fr, fn_edit_person_record, history, user_fr} = props;


    useEffect(()=>{
        let option = person_fr !== null ? person_fr[0].is_customer ? "customer" : "staff" : null
        let status = person_fr !== null ? person_fr[0].is_active ? "1" : "0" : null
        let degree = person_fr !== null ? person_fr[0].iddegree : 0
        let permission = user_fr.permissions.find(element => element === 'status_person_record')
        setOption(option)
        setDegree(degree)
        setStatus(status)
        setPermission(permission)
        
    },[person_fr, user_fr])

    const onValueChange=(e) =>{
        setOption(e.target.value)
    }

    const onStatusChange = e =>{
        setStatus(e.target.value)
    }

    const handleChange=(e)=>{
        setDegree(e.target.value)
    }

    const onsubmit = (data, e) =>{

        data.degree = parseInt(data.degree)
        data.is_customer = data.type_person === 'customer' ? 1 : 0
        data.is_staff = data.type_person === 'staff' ? 1 : 0
        data.idperson =  person_fr[0].idperson
        data.active = parseInt(data.active)
        fn_edit_person_record(data);
        //e.target.reset();
        history.push('/administration/viewpersonsrecords')
    }

    const degreeList = degrees_fr.map((e, i)=>(
        <option key={i} value={e.iddegree} >{e.degree}</option>
    ))


    const optionActivePerson = (
        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <div className="form-check form-check-inline">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="active" 
                    defaultValue="1"
                    
                    checked={activeOption==="1"}
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
                    name="active" 
                    defaultValue="0"
                    
                    checked={activeOption==="0"}
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


    return (
        <Fragment>
            <div className="container">
                <div className="alert form-title font-weight-bold">EDIT PERSON RECORD</div>
                <div className="border py-3 px-3">
                <form onSubmit={handleSubmit(onsubmit)}>
                        <div className="form-group">
                            <label htmlFor="dni">DNI:</label>
                            <input
                                name="dni"
                                id="dni" 
                                type="text" 
                                className="form-control"
                                defaultValue={person_fr !== null ? person_fr[0].dni : null} 
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
                                defaultValue={person_fr !== null ? person_fr[0].first_name : null}
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
                                defaultValue={person_fr !== null ? person_fr[0].last_name : null}
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
                                defaultValue={person_fr !== null ? person_fr[0].address : null}
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
                                        defaultValue={person_fr !== null ? person_fr[0].phone : null}
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
                                        value={degreeSelected}
                                        onChange={handleChange}
                                        ref={
                                            register({
                                                required: 'Please select one of the options'
                                            })
                                        }
                                    >
                                    {degreeList}
                                    </select>
                                    <span className="text-danger text-small d-block my-2">
                                        {errors?.degree?.message}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-3 border mx-3 px-3 py-3 my-3">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div className="form-check form-check-inline">
                                    <input 
                                        className="form-check-input" 
                                        type="radio" 
                                        name="type_person" 
                                        defaultValue="customer"
                                        
                                        checked={selectedOPtion==="customer"}
                                        onChange={onValueChange}
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
                                        name="type_person" 
                                        defaultValue="staff"
                                        
                                        checked={selectedOPtion==="staff"}
                                        onChange={onValueChange}
                                        ref={
                                            register({
                                                required: {value: true}
                                            })
                                        }
                                    />
                                    <label className="form-check-label" htmlFor="staff">Is Staff?</label>
                                </div> 
                            </div>
                            
                            {/* OPTION CHANGE STATUS PERSON */}

                            {permission !== null ? permission === 'status_person_record' ? optionActivePerson : null : null}
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


export default connect(mapStateToProps,{fn_edit_person_record})(EditPersonForm);