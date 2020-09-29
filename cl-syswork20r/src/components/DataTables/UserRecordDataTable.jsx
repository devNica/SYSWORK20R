import React, { useState, useEffect, useCallback } from 'react';
import {Link} from 'react-router-dom';
import {MDBDataTable} from 'mdbreact';
import {connect} from 'react-redux';
import {users_model} from '../../models/users'

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
                >Edit
            </Link>
            
        </div>
    )

    return options;
    
}



const UserRecordDataTable = (props) =>{

    const {users_fr, fetchData} = props;
    const [data, setData] = useState(users_model([]).data);

    const handleOnClick = useCallback((e)=>{
        let field= e.currentTarget;
        // //console.log(e.currentTarget.cells[1])
        let iduser=parseInt(field.cells[0].innerText)
        let username=`${field.cells[1].innerText}`
        let state=`${field.cells[3].innerText}`
       
        let user={
            iduser, username, state
        }

        if(fetchData){
            fetchData(user)
        }

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

export default connect(mapStateToProps)(UserRecordDataTable);