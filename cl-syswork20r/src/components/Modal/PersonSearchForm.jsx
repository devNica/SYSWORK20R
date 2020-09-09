import React, {useState } from 'react';
import {connect} from 'react-redux';
import PersonsRecordsDataTable from '../DataTables/PersonsRecordsDataTable';

const PersonSearchForm = (props) => {

    const [person_fc, setPerson] = useState('');
    
    const getComponentData = person=>{
        setPerson(person);
    }

    const submitData = () =>{
        props.fetchData(person_fc)
    }
   
    return (
        <div className="modal fade" id="personSearch" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <label className="font-weight-bold text-center h5" id="exampleModalLabel" style={{color: '#3a85f2'}}>LIST OF PERSONS REGISTERED AS STAFF OF THE COMPANY</label>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    
                   <PersonsRecordsDataTable fetchData={getComponentData}/>

                    <hr/>
                    <div className="form-inline">
                        <label htmlFor="idperson" className="mx-1">ID:</label>
                        <input 
                            type="text" 
                            className="form-control mx-1 text-center text-primary" 
                            id="idperson" name="idperson" 
                            defaultValue={person_fc === '' ? null: person_fc.idperson}
                            size='4'
                            readOnly
                            />
                        <label htmlFor="firtsName" className="mx-1">First Name:</label>
                        <input 
                            type="text" 
                            className="form-control mx-1 text-center text-primary" 
                            id="firstName" 
                            name="firstName" 
                            defaultValue={person_fc === '' ? null: person_fc.firstName}
                            size='50'
                            readOnly
                            />
                        <label htmlFor="lastName" className="mx-1">Last Name:</label>
                        <input 
                            type="text" 
                            className="form-control mx-1 text-center text-primary" 
                            id="lastName" 
                            name="lastName" 
                            defaultValue={person_fc === '' ? null: person_fc.lastName}
                            size='50'
                            readOnly
                            />
                    
                    </div>

                </div>
                <div className="modal-footer">
                    <button 
                        type="button"
                        className="btn btn-secondary" 
                        data-dismiss="modal"
                        onClick={submitData}
                    >
                    Close
                    </button>
                    
                </div>
                </div>
            </div>
        </div>
    );
    
}

export default connect(null)(PersonSearchForm);