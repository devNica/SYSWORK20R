import React,{Fragment, useState, useEffect} from 'react'
import {connect} from 'react-redux'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AdminPanel from '../../Panel/AdminPanel';
import Denied from '../../user/Dashboard/Denied';
import UserRecordDataTable from '../../DataTables/UserRecordDataTable';
import {fn_list_user_accounts, fn_clear_account_list} from '../../../redux/actions/users';
import Card from '../../Cards/Cards';

const mapStateToProps = (state) =>({
    user_fr: state.auth.user,
    modules_fr: state.users.info.modules,
    permissions_fr: state.users.info.permissions,
    profile_fr: state.users.info.profile
})

const UsersAccountsList = (props)=> {

    const [permission, setPermission] = useState('')
    const {user_fr, fn_list_user_accounts, fn_clear_account_list} = props;
    const {modules_fr, permissions_fr, profile_fr} = props;
    
    useEffect(()=>{
        let permission = user_fr.permissions.find(element => element === 'view_users_accounts')
        setPermission(permission)
        
        fn_list_user_accounts({filter: 1})

        return()=>{
            fn_clear_account_list()
        }

    },[user_fr, fn_clear_account_list, fn_list_user_accounts])

    const editOptions = (
        <Fragment>
            <div className="row mt-3">
                <Card style={'bg-blue'}  title={'USER HAS PROFILES'} action={'listUserProdiles'} load={profile_fr}/>     
                <Card style={'bg-red'}  title={'USER HAS MODULES'} action={'listUserModules'} load={modules_fr}/>
                <Card style={'bg-purple'}  title={'PERMISSIONS'} action={'listUserPermissions'} load={permissions_fr}/>
            </div>
        </Fragment>
    )

    const message = (
        <div className="py-3 my-3 border px-3">
            <h1 className="text-center">Your profile does not have permission to edit user accounts!</h1>
        </div>
    )

    const permissionMessage = (
        <div>
            the user's account permissions were not found
        </div>
    )

    const notice = (
        <div className="py-3 my-3 mx-4 px-3">
            <h4 className="text-center text-danger">your profile does not have the permissions to view user accounts!</h4>
        </div>
    )

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
                {
                    user_fr !== undefined ? 
                        user_fr.permissions.includes('view_users_accounts') ? 
                            user_fr.permissions.includes('edit_user_account') ? 
                            (editOptions)  : message 
                        : notice 
                        : permissionMessage
                }
            </div>
            
        </Fragment>
    )


    return (
        <div className="wrapper">
            {linkOptions}
        </div>
    )


}

export default connect(mapStateToProps,{fn_list_user_accounts, fn_clear_account_list})(UsersAccountsList);