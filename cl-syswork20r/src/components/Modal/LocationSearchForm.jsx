import React, {useState } from 'react';
import {connect} from 'react-redux';
import LocationsDataTable from '../DataTables/LocationsDataTable';

const LocationSearchForm = (props) => {

    const [location_fc, setPosition] = useState('');
    
    const getComponentData = data=>{
        setPosition(data);
    }

    const submitData = () =>{
        props.fetchData(location_fc)
    }
   
    return (
        <div className="modal fade" id="locationSearch" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <label className="font-weight-bold text-center h5" id="exampleModalLabel" style={{color: '#3a85f2'}}>LIST OF COMPANY OFFICES</label>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    
                   <LocationsDataTable fetchData={getComponentData}/>

                    <hr/>
                    <div className="form-inline">
                        <label htmlFor="idperson" className="mx-1">ID:</label>
                        <input 
                            type="text" 
                            className="form-control mx-1 text-center text-primary" 
                            id="idperson" name="idperson" 
                            defaultValue={location_fc === '' ? null: location_fc.idlocation}
                            size='4'
                            readOnly
                            />
                        <label htmlFor="firtsName" className="mx-1">Location:</label>
                        <input 
                            type="text" 
                            className="form-control mx-1 text-center text-primary" 
                            id="firstName" 
                            name="firstName" 
                            defaultValue={location_fc === '' ? null: location_fc.location}
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

export default connect(null)(LocationSearchForm);