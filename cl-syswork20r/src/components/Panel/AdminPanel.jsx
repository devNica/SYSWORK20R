import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './adminpanel.css';

// Iconos
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import EditIcon from '@material-ui/icons/Edit';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PersonIcon from '@material-ui/icons/Person';
import ViewListIcon from '@material-ui/icons/ViewList';


const AdminPanel = (props) => {
    const {modules} = props;
    const [userModules, setModules] = useState([]);

    const handleOnClick = e =>{
        props.getChoice(e.target.name)
    }

    useEffect(()=>{
      setModules(modules);

    },[modules])

    const userAccountsPanel = (
    <div>
        {/*USER MODULE*/}
        <div className="nav-item dropdown">
            <button className="list-group-item list-group-item-action item-profile h5 text-dark dropdown-toggle" 
            id="user-module-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <AccountBoxIcon  style={{ color: "#5094de"}} fontSize="small"/> Users
            </button>
            <div className="dropdown-menu" aria-labelledby="user-module-dropdown">
            <button className="list-group-item list-group-item-action sub-item-option h5 text-dark" name="create_user" onClick={handleOnClick}> 
                <PersonAddIcon  style={{ color: "#5094de"}} fontSize="small"/> Add User
            </button>
            
            <button className="list-group-item list-group-item-action sub-item-option h5 text-dark" name="edit_user" onClick={handleOnClick}>
                <EditIcon  style={{ color: "#5094de"}} fontSize="small"/> Edit User
            </button>

            </div>
        </div>
       
    </div>
    
    )

    const administrationPanel = (
        <div>
            {/*STAFF MODULE*/}
            <div className="nav-item dropdown">
                <button className="list-group-item list-group-item-action item-profile h5 text-dark dropdown-toggle" 
                id="staff-module-dropdown"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <AssignmentIndIcon  style={{ color: "#5094de"}} fontSize="small"/> Staff
                </button>
                <div className="dropdown-menu" aria-labelledby="staff-module-dropdown">
                <button className="list-group-item list-group-item-action sub-item-option h5 text-dark" name="create_employee" onClick={handleOnClick}> 
                    <PersonAddIcon  style={{ color: "#5094de"}} fontSize="small"/> Add Employee
                </button>
                
                <button className="list-group-item list-group-item-action sub-item-option h5 text-dark" name="edit_employee" onClick={handleOnClick}>
                    <EditIcon  style={{ color: "#5094de"}} fontSize="small"/> Edit Employee
                </button>
                
                </div>
            </div>
            {/*PERSON MODULE*/}
            <div className="nav-item dropdown">
                <button className="list-group-item list-group-item-action item-profile h5 text-dark dropdown-toggle" 
                id="person-module-dropdown"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <PersonIcon  style={{ color: "#5094de"}} fontSize="small"/> Person
                </button>
                <div className="dropdown-menu" aria-labelledby="person-module-dropdown">
                
                <Link className="list-group-item list-group-item-action sub-item-option h5 text-dark" name="view_person" to='/administration/viewpersonsrecords'>
                    <ViewListIcon  style={{ color: "#5094de"}} fontSize="small"/> View Records
                </Link>
                
                <Link className="list-group-item list-group-item-action sub-item-option h5 text-dark" name="create_person" to='/administration/addperson'> 
                    <PersonAddIcon  style={{ color: "#5094de"}} fontSize="small"/> Add Person
                </Link>
                
               
                
                </div>
            </div>
        </div>
    )

    return (
        <div className="list-group pl-4">
            <h5 className="font-weight-bold text-uppercase pt-2" style={{color: "#196ac2"}}>MODULES</h5>
            { 
                userModules !== undefined && userModules.length > 0 ?
                    userModules.find(module => module === 'ACCOUNTS_USERS') ? userAccountsPanel: null
                : null
            
            }
            {
                userModules !== undefined && userModules.length > 0 ?
                    userModules.find(module => module === 'ADMINISTRATION') ? administrationPanel:  null
                : null

            }
        
        
            <br/>
    </div>
    );
};

export default AdminPanel;