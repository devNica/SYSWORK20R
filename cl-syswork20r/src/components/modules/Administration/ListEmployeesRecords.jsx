import React,{Fragment, useState, useEffect} from 'react'
import {connect} from 'react-redux'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AdminPanel from '../../Panel/AdminPanel';
import Denied from '../../user/Dashboard/Denied';

const mapStateToProps = (state) =>({
    user_fr: state.auth.user,
})

const ListEmployessRecords = (props)=> {

    const [permission, setPermission] = useState('')
    const {user_fr} = props;
    
    useEffect(()=>{
        let permission = user_fr.permissions.find(element => element === 'view_employees_records')
        setPermission(permission)

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
                {permission === '' ? null : permission === 'view_persons_records' ? <h1>componente</h1>: <Denied/>}
            </div>
        </Fragment>
    )

    return (
        <div className="wrapper">
            {linkOptions}
        </div>
    )


}

export default connect(mapStateToProps,{})(ListEmployessRecords);