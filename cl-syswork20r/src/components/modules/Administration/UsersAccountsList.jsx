import React,{Fragment, useState, useEffect} from 'react'
import {connect} from 'react-redux'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AdminPanel from '../../Panel/AdminPanel';
import Denied from '../../user/Dashboard/Denied';
import UserRecordDataTable from '../../DataTables/UserRecordDataTable';
import {fn_list_user_accounts} from '../../../redux/actions/users';

const mapStateToProps = (state) =>({
    user_fr: state.auth.user,
})

const UsersAccountsList = (props)=> {

    const [permission, setPermission] = useState('')
    const {user_fr, fn_list_user_accounts} = props;
    
    useEffect(()=>{
        let permission = user_fr.permissions.find(element => element === 'view_users_accounts')
        setPermission(permission)
        
        fn_list_user_accounts({filter: 1})

        return()=>{
            
        }

    },[user_fr])


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
                {permission === '' ? null : permission === 'view_users_accounts' ? <UserRecordDataTable/>: <Denied/>}
            </div>
        </Fragment>
    )


    return (
        <div className="wrapper">
            {linkOptions}
        </div>
    )


}

export default connect(mapStateToProps,{fn_list_user_accounts})(UsersAccountsList);