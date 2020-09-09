import React, { useState, useEffect, useCallback } from 'react';
import {Link} from 'react-router-dom';
import {MDBDataTable} from 'mdbreact';
import {connect} from 'react-redux';
import {positions_model} from '../../models/positions'

const mapStateToProps = state =>({
    positions_fr: state.administration.positions,
})

const administrador_opciones = (data)=>{

    let options = (
        <div>
            <Link 
                className="btn btn-sm btn-dark color-button-edit" 
                //value={tasks.data.rows[i].idregin} 
                to={`/administration/editposition/${data.idposition}`}
                >Edit
            </Link>
            
        </div>
    )

    return options;
    
}

const PositionsRecordsDataTable = (props) =>{

    const {positions_fr, fetchData} = props;
    const [data, setData] = useState(positions_model([]).data);

    const handleOnClick = useCallback((e)=>{
        let field= e.currentTarget;
        // //console.log(e.currentTarget.cells[1])
        let idposition=parseInt(field.cells[0].innerText)
        let position=`${field.cells[1].innerText}`
        let is_active=`${field.cells[2].innerText}`
       
        let positions={
            idposition, position, is_active
        }

        if(fetchData){
            fetchData(positions)
        }

    },[])

    useEffect(()=>{

        if(positions_fr.data !== undefined){
            let funcion='clickEvent'

            for(let i=0; i<positions_fr.data.rows.length; i++){
                Object.defineProperty(positions_fr.data.rows[i], funcion, {value: handleOnClick, writable: true})
                if(!fetchData){
                    Object.defineProperty(positions_fr.data.rows[i], 'options', {
                        value: administrador_opciones(positions_fr.data.rows[i]), configurable: true}) 
                }
                
            }
            
            setData(positions_fr.data);
        }

    },[positions_fr, handleOnClick])

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

export default connect(mapStateToProps)(PositionsRecordsDataTable);