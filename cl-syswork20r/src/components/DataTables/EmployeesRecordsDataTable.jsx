import React, { useState, useEffect, useCallback } from 'react';
import {Link} from 'react-router-dom';
import {MDBDataTable} from 'mdbreact';
import {connect} from 'react-redux';
import {employees_model} from '../../models/employees'

const mapStateToProps = state =>({
    employees_fr: state.administration.employees,
})

const administrador_opciones = (data)=>{

    let options = (
        <div>
            <Link 
                className="btn btn-sm btn-dark color-button-edit" 
                //value={tasks.data.rows[i].idregin} 
                to={`/administration/editemployee/${data.idemployee}`}
                >Edit
            </Link>
            
        </div>
    )

    return options;
    
}



const EmployeesRecordsDataTable = (props) =>{

    const {employees_fr, fetchData} = props;
    const [data, setData] = useState(employees_model([]).data);

    const handleOnClick = useCallback((e)=>{
        let field= e.currentTarget;
        // //console.log(e.currentTarget.cells[1])
        let idemployee=parseInt(field.cells[0].innerText)
        // let firstName=`${field.cells[2].innerText}`
        // let lastName=`${field.cells[3].innerText}`
       
        let employee={
            idemployee
        }

        if(fetchData){
            fetchData(employee)
        }

    },[])

    useEffect(()=>{

        if(employees_fr.data !== undefined){
            let funcion='clickEvent'

            for(let i=0; i<employees_fr.data.rows.length; i++){
                Object.defineProperty(employees_fr.data.rows[i], funcion, {value: handleOnClick, writable: true})
                if(!fetchData){
                    Object.defineProperty(employees_fr.data.rows[i], 'options', {
                        value: administrador_opciones(employees_fr.data.rows[i]), configurable: true}) 
                }
                
            }
            
            setData(employees_fr.data);
        }

    },[employees_fr, handleOnClick])

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

export default connect(mapStateToProps)(EmployeesRecordsDataTable);