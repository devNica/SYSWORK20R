import React, { useState, useEffect, useCallback } from 'react';
import {Link} from 'react-router-dom';
import {MDBDataTable} from 'mdbreact';
import {connect} from 'react-redux';
import {locations_model} from '../../models/locations'

const mapStateToProps = state =>({
    locations_fr: state.administration.locations,
})

const administrador_opciones = (data)=>{

    let options = (
        <div>
            <Link 
                className="btn btn-sm btn-dark color-button-edit" 
                //value={tasks.data.rows[i].idregin} 
                to={`/administration/editlocation/${data.idlocation}`}
                >Edit
            </Link>
            
        </div>
    )

    return options;
    
}

const LocationsDataTable = (props) =>{

    const {locations_fr, fetchData} = props;
    const [data, setData] = useState(locations_model([]).data);

    const handleOnClick = useCallback((e)=>{
        let field= e.currentTarget;
        // //console.log(e.currentTarget.cells[1])
        let idlocation=parseInt(field.cells[0].innerText)
        let location=`${field.cells[1].innerText}`
        let depends_on=`${field.cells[2].innerText}`
       
        
        if(fetchData){
            fetchData({idlocation, location, depends_on})
        }

    },[])

    useEffect(()=>{

        if(locations_fr.data !== undefined){
            let funcion='clickEvent'

            for(let i=0; i<locations_fr.data.rows.length; i++){
                Object.defineProperty(locations_fr.data.rows[i], funcion, {value: handleOnClick, writable: true})
                if(!fetchData){
                    Object.defineProperty(locations_fr.data.rows[i], 'options', {
                        value: administrador_opciones(locations_fr.data.rows[i]), configurable: true}) 
                }
                
            }
            
            setData(locations_fr.data);
        }

    },[locations_fr, handleOnClick])

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

export default connect(mapStateToProps)(LocationsDataTable);