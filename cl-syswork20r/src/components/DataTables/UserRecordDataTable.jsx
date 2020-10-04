import React, { useState, useEffect, useCallback } from 'react';
import {Link} from 'react-router-dom';
import {MDBDataTable} from 'mdbreact';
import {connect} from 'react-redux';
import {users_model} from '../../models/users'
import {fn_get_useraccount_info} from '../../redux/actions/users'
import VisibilityIcon from '@material-ui/icons/Visibility';

const mapStateToProps = state =>({
    users_fr: state.users.accounts,
})

const administrador_opciones = (data)=>{

    let options = (
        <div>
            <Link 
                className="btn btn-sm btn-dark color-button-edit-user" 
                //value={tasks.data.rows[i].idregin} 
                to={`/administration/edituser/${data.iduser}`}
                > <VisibilityIcon  style={{ color: "#f6f7f5"}} fontSize="small"/>
            </Link>
            
        </div>
    )

    return options;
    
}



const UserRecordDataTable = (props) =>{

    const {users_fr, fetchData, fn_get_useraccount_info} = props;
    const [data, setData] = useState(users_model([]).data);

    const handleOnClick = useCallback((e)=>{
        let field= e.currentTarget;
        let iduser=parseInt(field.cells[0].innerText)
        
        fn_get_useraccount_info({filter: `USR.iduser = ${iduser}`})

    },[])

    useEffect(()=>{

        if(users_fr.data !== undefined){
            let funcion='clickEvent'

            for(let i=0; i<users_fr.data.rows.length; i++){
                Object.defineProperty(users_fr.data.rows[i], funcion, {value: handleOnClick, writable: true})
                if(!fetchData){
                    Object.defineProperty(users_fr.data.rows[i], 'options', {
                        value: administrador_opciones(users_fr.data.rows[i]), configurable: true}) 
                }
                
            }
            
            setData(users_fr.data);
        }

    },[users_fr, handleOnClick])

    return (
        <div className="border py-4 px-4">
            <MDBDataTable
                bordered
                hover
                data={data}
                entries={5}
                entriesOptions={[5,10,20,40]}
            />
        </div>
    )
}

export default connect(mapStateToProps,{fn_get_useraccount_info})(UserRecordDataTable);