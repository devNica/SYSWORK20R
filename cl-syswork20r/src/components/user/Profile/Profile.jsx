import React, {Fragment } from 'react';
import { connect } from 'react-redux';
import AdminPanel from '../../Panel/AdminPanel';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificacionProceso from '../../Notifications/NotificacionProceso';

import AddTwoToneIcon from '@material-ui/icons/AddTwoTone';
import { useState } from 'react';
import noImg from './noimage.png';
import UploadImage from '../../Modal/UploadImage';

const mapStateToProps = state => ({
    user_fr: state.auth.user,
})

const Profile = ({user_fr}) =>{

    const [statusImg, setStatusImg] = useState(false)
    const [imgUrl, setUrl] = useState('')
    
    const dashboard=(
        <Fragment>
            <nav id="sidebar" className="shadow-orange-right">
                <div className="sidebar-header">
                    <figure className="snip1566">
                        <img src={statusImg ? imgUrl : noImg} alt="user_image" />
                        <figcaption><AddTwoToneIcon className="icon" style={{ fontSize: 95}} /></figcaption>
                        <a type="button" data-toggle="modal" data-target="#uploadImageModal" href="#" />
                    </figure>
                    <UploadImage employeeID={user_fr.iduser} />
                    <table className="table table-hover">
                        <tbody>
                            <tr style={{fontSize: '0.95rem'}}>
                                <td className="font-weight-bold">
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