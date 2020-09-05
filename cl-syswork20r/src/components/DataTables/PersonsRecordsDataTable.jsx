import React, { useState, useEffect, useCallback } from 'react';
import {Link} from 'react-router-dom';
import {MDBDataTable} from 'mdbreact';
import {connect} from 'react-redux';
import {persons_model} from '../../models/persons'

const mapStateToProps = state =>({
    persons_fr: state.administration.persons,
})

const administrador_opciones = (data)=>{

    let options = (
        <div>
            <Link 
                className="btn btn-sm btn-dark color-button-edit" 
                //value={tasks.data.rows[i].idregin} 
                to={`/administration/editperson/${data.idperson}`}
                >Edit
            </Link>
            
        </div>
    )

    return options;
    
}

const PersonsRecordsDataTable = (props) =>{

    const {persons_fr} = props;
    const [data, setData] = useState(persons_model([]).data);

    const handleOnClick = useCallback((e)=>{
        // let field= e.currentTarget;
        // //console.log(e.currentTarget.cells[1])
        // let id=parseInt(field.cells[0].innerText)
        // let equipo=`${field.cells[1].innerText}`
        // let consecutivo=`${field.cells[2].innerText}`
        // let modelo=`${field.cells[3].innerText}`
        // let usuario=`${field.cells[6].innerText}`
        // let idcategoria=`${field.cells[7].innerText}`
        
        // let eqp={
        //     id, equipo, consecutivo, modelo, usuario, idcategoria
        // }

    },[])

    useEffect(()=>{

        if(persons_fr.data !== undefined){
            let funcion='clickEvent'

            for(let i=0; i<persons_fr.data.rows.length; i++){
                Object.defineProperty(persons_fr.data.rows[i], funcion, {value: handleOnClick, writable: true})
                Object.defineProperty(persons_fr.data.rows[i], 'options', {
                    value: administrador_opciones(persons_fr.data.rows[i]), configurable: true}) 
            }
            
            setData(persons_fr.data);
        }

    },[persons_fr, handleOnClick])

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

export default connect(mapStateToProps)(PersonsRecordsDataTable);