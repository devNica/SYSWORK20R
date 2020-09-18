import React,{Fragment, useState, useEffect} from 'react'
import {connect} from 'react-redux'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AdminPanel from '../../Panel/AdminPanel';
import Denied from '../../user/Dashboard/Denied';
import EmployeesRecordsDataTable from '../../DataTables/EmployeesRecordsDataTable';
import {fn_list_employees_records} from '../../../redux/actions/administration';

const mapStateToProps = (state) =>({
    user_fr: state.auth.user,
})

const ListEmployessRecords = (props)=> {

    const [permission, setPermission] = useState('')
    const {user_fr, fn_list_employees_records} = props;
    
    useEffect(()=>{
        let permission = user_fr.permissions.find(element => element === 'view_employees_records')
        fn_list_employees_records({filter: 1})
        setPermission(permission)

       return()=>{
           
        }

    },[user_fr, fn_list_employees_records])

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
                {permission === '' ? null : permission === 'view_employees_records' ? <EmployeesRecordsDataTable/>: <Denied/>}
            </div>
        </Fragment>
    )

    return (
        <div className="wrapper">
            {linkOptions}
        </div>
    )


}

export default connect(mapStateToProps,{fn_list_employees_records})(ListEmployessRecords);