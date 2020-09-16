import React,{Fragment, useState, useEffect} from 'react'
import {connect} from 'react-redux'
import PersonsRecordsDataTable from '../../DataTables/PersonsRecordsDataTable'
import {fn_list_persons_records, fn_clear_persons_records} from '../../../redux/actions/administration'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AdminPanel from '../../Panel/AdminPanel';
import Denied from '../../user/Dashboard/Denied';

const mapStateToProps = (state) =>({
    user_fr: state.auth.user,
})

const ListPersonsRecords = (props)=> {

    const [permission, setPermission] = useState('')
    const {user_fr, fn_list_persons_records, fn_clear_persons_records} = props;
    
    useEffect(()=>{
        let permission = user_fr.permissions.find(element => element === 'view_persons_records')
        setPermission(permission)

        fn_list_persons_records({filter:1})

        return()=>{
            fn_clear_persons_records();
        }

    },[user_fr, fn_list_persons_records])


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
                {permission === '' ? null : permission === 'view_persons_records' ? <PersonsRecordsDataTable/>: <Denied/>}
            </div>
        </Fragment>
    )


    return (
        <div className="wrapper">
            {linkOptions}
        </div>
    )


}

export default connect(mapStateToProps,{fn_list_persons_records, fn_clear_persons_records})(ListPersonsRecords);