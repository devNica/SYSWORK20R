import React, {Fragment, useEffect, useState} from 'react'
import { connect } from 'react-redux';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AdminPanel from '../../Panel/AdminPanel';
import Denied from '../../user/Dashboard/Denied';
import {fn_clean_person_data, fn_get_person_by_idperson} from '../../../redux/actions/administration'
import PersonEditForm from '../../Forms/PersonEditForm';
import {fn_list_degrees} from '../../../redux/actions/administration'

const mapStateToProps = state => ({
    user_fr: state.auth.user,
})

const EditPerson = (props) =>{
    
    const [permission, setPermission] = useState('')
    const {user_fr, fn_get_person_by_idperson, fn_list_degrees, match, fn_clean_person_data} = props

    useEffect(()=>{
        let permission = user_fr.permissions.find(element => element === 'edit_person_record')
        setPermission(permission)
        fn_list_degrees()
        fn_get_person_by_idperson(match.params)
        fn_clean_person_data()

    },[user_fr, fn_get_person_by_idperson, fn_list_degrees, match, fn_clean_person_data])

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
                {permission === '' ? null : permission === 'edit_person_record' ? <PersonEditForm history={props.history}/>: <Denied/>}
            </div>
        </Fragment>
    )
    
    return (
        <div className="wrapper">
            {linkOptions}
        </div>
        
    )
}


export default connect(mapStateToProps,{fn_get_person_by_idperson, fn_list_degrees, fn_clean_person_data})(EditPerson);