import React, {Fragment, useEffect, useState} from 'react'
import AddPersonForm from '../../Forms/AddPersonForm';
import { connect } from 'react-redux';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AdminPanel from '../../Panel/AdminPanel';
import Denied from '../../user/Dashboard/Denied';
import {fn_list_degrees} from '../../../redux/actions/administration'

const mapStateToProps = state => ({
    user_fr: state.auth.user,
})

const CreatePerson = (props) =>{
    
    const {user_fr, fn_list_degrees} = props;
    const [permission, setPermission] = useState('')
    
    useEffect(()=>{
        let permission = user_fr.permissions.find(element => element === 'create_person_record')
        setPermission(permission)

        fn_list_degrees();

    },[user_fr, fn_list_degrees])

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
                {permission === '' ? null : permission === 'create_person_record' ? <AddPersonForm/>: <Denied/>}
            </div>
        </Fragment>
    )
    
    return (
        <div className="wrapper">
            {linkOptions}
        </div>
        
    )
}


export default connect(mapStateToProps,{fn_list_degrees})(CreatePerson);