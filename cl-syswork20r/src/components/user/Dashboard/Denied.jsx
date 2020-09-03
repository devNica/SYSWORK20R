import React, {} from 'react'
import {Link} from 'react-router-dom'


const Denied = () =>{
    return (
        <div className="container">
            <div className="py-3 px-3">
                <div class="jumbotron">
                    <h1 class="display-4">Alert!</h1>
                    <hr class="my-4"/>
                    <p>Your user does not have the required permissions to access this option of the module</p>
                    <Link class="btn btn-primary btn-lg" role="button" to='/profile'>Go to Profile</Link>
                </div>
            </div>
        </div>
    )
}

export default Denied;