import React, {Fragment, useEffect, useState} from 'react'
import { connect } from 'react-redux';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AdminPanel from '../../Panel/AdminPanel';
import Denied from '../../user/Dashboard/Denied';
import EmployeeEditForm from '../../Forms/EmployeeEditForm';
import {fn_get_employee_byID, fn_get_jobs_list, fn_get_locations_list, fn_clear_employee_record} from '../../../redux/actions/administration'
import {fn_get_list_currencies} from '../../../redux/actions/accounting';


const mapStateToProps = state => ({
    user_fr: state.auth.user,
})

const EditEmployee = (props) =>{
    
    const [permission, setPermission] = useState('')
    const {user_fr, fn_get_employee_byID, match, fn_get_list_currencies, fn_get_locations_list, fn_get_jobs_list} = props
    const {fn_clear_employee_record} = props;
    useEffect(()=>{
        let permission = user_fr.permissions.find(element => element === 'edit_employee_record')
        setPermission(permission)
        fn_get_employee_byID({filter: `EMP.idemployee = ${match.params.id}`})
        fn_get_list_currencies({filter: 1})
        fn_get_jobs_list({filter: 1})
        fn_get_locations_list({filter: 1})

        return()=>{
            fn_clear_employee_record();
        }

    },[user_fr, fn_get_employee_byID, fn_get_list_currencies, fn_get_jobs_list, fn_get_locations_list, match])

    const linkOptions = (
        <Fragment>
            <nav id="sidebar" className="shadow-orange-right">
                <div className="sidebar-header">
                    <AccountCircleIcon style={{fontSize: '2.7rem'}} className="my-2"/>
                    <table className="table table-hover">
                        <tbody>
                            <tr style={{fontSize: '0.9rem'}}>
                                <td>
                                    {user_fr.username} {user_fr.profile}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <br/>
                <AdminPanel modules={user_fr.modules}/>
            </nav>

            <div id="content">
                {permission === '' ? null : permission === 'edit_employee_record' ? <EmployeeEditForm history={props.history}/>: <Denied/>}
            </div>
        </Fragment>
    )
    
    return (
        <div className="wrapper">
            {linkOptions}
        </div>
        
    )
}


export default connect(mapStateToProps,
        {fn_get_employee_byID, 
            fn_get_list_currencies, 
                fn_get_jobs_list, 
                    fn_get_locations_list,
                        fn_clear_employee_record})(EditEmployee);