import React, {Fragment } from 'react';
import { connect } from 'react-redux';
import AdminPanel from '../../Panel/AdminPanel';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificacionProceso from '../../Notifications/NotificacionProceso';

const mapStateToProps = state => ({
    user_fr: state.auth.user,
})

const Profile = ({user_fr}) =>{
    
    const dashboard=(
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
          
            </div>
        </Fragment>
    )

    return (
        <div className="wrapper">
            {dashboard}
            <NotificacionProceso/>
        </div>
    );
    
}

export default connect(mapStateToProps,{})(Profile);