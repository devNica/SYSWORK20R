import React, {useState } from 'react';
import {uploadImage} from '../../api/api';
import { connect } from 'react-redux';

const mapStateToProps = state =>({
    employee_fr: state.employee
})

const UploadImage = (props) => {

    const [fileSelected, setFile] = useState('');
    const {employee_fr, fk_employee} = props;
    
    const fileSelecttedHandler = e =>{
        let files = e.target.files;
        var reader = new FileReader();

        reader.onload = (e)=>{
            document.getElementById('preview').src = e.target.result;
        }

        reader.readAsDataURL(files[0]);
        setFile(files[0]);
    }

    const fileUploadHandler = e =>{
        const fd = new FormData();
        fd.append('img', fileSelected, fileSelected.name);
        fd.append('fk_employee', fk_employee)
        uploadImage(fd).then(res=>{
            console.log(res)
           
        });
        
    }

    
    return (
        <div className="modal fade" id="uploadImageModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">CHANGE PROFILE IMAGE</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    
                    <div className="row">
                        <div className="col 12 col-sm-12 col-md-8 offset-md-4 col-lg-6 offset-lg-3">
                            <div className="card">
                                <div className="card-header bg-primary text-white">
                                    Upload your image...
                                </div>
                                <img 
                                    src={fileSelected}
                                    id='preview' 
                                    className="img-fluid img-profile rounded-circle mx-auto my-4" 
                                    alt="...">
                                </img>
                                <div className="card-body">
                                <input 
                                    type="file" 
                                    name="fileSelected" 
                                    id="fileSelected" 
                                    className="form-control"
                                    onChange={fileSelecttedHandler}
                                />
                                </div>
                                <div className="card-footer">
                                <div className="row">
                                    <div className="col-12 col-sm-6 col-md-6 col-lg-8"></div>
                                    <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                                        <button 
                                            type="button" 
                                            className="btn btn-outline-primary btn-block"
                                            onClick={fileUploadHandler}
                                        >
                                            Upload
                                        </button>
                                    </div>
                                </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    

                </div>
                <div className="modal-footer">
                    <button 
                        type="button"
                        className="btn btn-secondary" 
                        data-dismiss="modal"
                        
                    >
                    Close
                    </button>
                    
                </div>
                </div>
            </div>
        </div>
    );
    
}

export default connect(mapStateToProps,{})(UploadImage);