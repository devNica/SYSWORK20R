import React, {useState } from 'react';
import {connect} from 'react-redux';
import PositionsRecordsDataTable from '../DataTables/PositionsRecordsDataTable';

const PositionSearchForm = (props) => {

    const [position_fc, setPosition] = useState('');
    
    const getComponentData = data=>{
        setPosition(data);
    }

    const submitData = () =>{
        props.fetchData(position_fc)
    }
   
    return (
        <div className="modal fade" id="positionSearch" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <label className="font-weight-bold text-center h5" id="exampleModalLabel" style={{color: '#3a85f2'}}>LIST OF OFFICIAL JOBS IN THE COMPANY</label>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    
                   <PositionsRecordsDataTable fetchData={getComponentData}/>

                    <hr/>
                    <div className="form-inline">
                        <label htmlFor="idperson" className="mx-1">ID:</label>
                        <input 
                            type="text" 
                            className="form-control mx-1 text-center text-primary" 
                            id="idperson" name="idperson" 
                            defaultValue={position_fc === '' ? null: position_fc.idposition}
                            size='4'
                            readOnly
                            />
                        <label htmlFor="firtsName" className="mx-1">Position:</label>
                        <input 
                            type="text" 
                            className="form-control mx-1 text-center text-primary" 
                            id="firstName" 
                            name="firstName" 
                            defaultValue={position_fc === '' ? null: position_fc.position}
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

export default connect(null)(PositionSearchForm);