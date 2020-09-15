import React, {Fragment } from 'react';
import { connect } from 'react-redux';
import AdminPanel from '../../Panel/AdminPanel';
import NotificacionProceso from '../../Notifications/NotificacionProceso';

import AddTwoToneIcon from '@material-ui/icons/AddTwoTone';
import { useState, useEffect } from 'react';
import noImg from './noimage.png';
import UploadImage from '../../Modal/UploadImage';
import {downloadImage} from '../../../api/api'

const mapStateToProps = state => ({
    user_fr: state.auth.user,
})

const Profile = ({user_fr}) =>{

    const [statusImg, setStatusImg] = useState(false)
    const [profileImg, setImg] = useState('')

    const arrayBufferToBase64 = (buffer) =>{
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));   
        bytes.forEach((b) => binary += String.fromCharCode(b));    
        return window.btoa(binary);
    };

    useEffect(()=>{
        downloadImage({idemployee: user_fr.fk_employee}).then(response=>{
            console.log(response)
            let imgStrs = arrayBufferToBase64(response.photo.data)
            let base64Flga=`data:image/png;base64,`

            if(response){
                setImg(base64Flga+imgStrs)
                // let image = 'data:image/png;base64,' +  Buffer.from(response.photo.data, 'binary').toString('base64')
                // console.log(image)
                // //let image = `data:image/png;base64,${response.photo}`
                // setImg(image);
                setStatusImg(true)
            }
            else{
                console.log(`No hay respuesta`);
            }
        }).catch(error=>console.log(error))

    },[user_fr])

    
    
    const dashboard=(
        <Fragment>
            <nav id="sidebar" className="shadow-orange-right">
                <div className="sidebar-header">
                    <figure className="snip1566">
                        <img src={statusImg ? profileImg : noImg} alt="user_image" />
                        <figcaption><AddTwoToneIcon className="icon" style={{ fontSize: 95}} /></figcaption>
                        <a type="button" data-toggle="modal" data-target="#uploadImageModal" href="#" />
                    </figure>
                    <UploadImage fk_employee={user_fr.fk_employee} />
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