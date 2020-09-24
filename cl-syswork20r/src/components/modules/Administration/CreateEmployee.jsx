import React, {Fragment, useEffect, useState} from 'react'
import { connect } from 'react-redux';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AdminPanel from '../../Panel/AdminPanel';
import Denied from '../../user/Dashboard/Denied';
import AddEmployeeForm from '../../Forms/AddEmployeeForm';
import {fn_list_persons_records, 
    fn_get_jobs_list, 
    fn_get_locations_list, 
    fn_get_employee_number} from '../../../redux/actions/administration'
import {fn_get_list_currencies} from '../../../redux/actions/accounting';

const mapStateToProps = state => ({
    user_fr: state.auth.user,
})

const CreateEmployee = (props) =>{

    const {user_fr, fn_list_persons_records, fn_get_employee_number} = props;
    const {fn_get_jobs_list, fn_get_list_currencies, fn_get_locations_list} = props;
    const [permission, setPermission] = useState('')
    
    useEffect(()=>{
        let permission = user_fr.permissions.find(element => element === 'create_employee_record')
        setPermission(permission)

        fn_list_persons_records({filter: `P.is_active = 1 AND P.is_staff = 1 AND EMP.idemployee IS NULL`})
        fn_get_jobs_list({filter: `1`})
        fn_get_list_currencies({filter: 1})
        fn_get_locations_list({filter: 1})
        fn_get_employee_number()

    },[user_fr, fn_list_persons_records, fn_get_list_currencies, fn_get_jobs_list, fn_get_employee_number, fn_get_locations_list])

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
                {permission === '' ? null : permission === 'create_employee_record' ? <AddEmployeeForm/>: <Denied/>}
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
    { 
        fn_list_persons_records, 
        fn_get_employee_number, 
        fn_get_jobs_list, 
        fn_get_list_currencies, 
        fn_get_locations_list,
    })(CreateEmployee);