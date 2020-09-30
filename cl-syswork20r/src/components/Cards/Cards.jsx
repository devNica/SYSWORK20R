import React,{Fragment, useState} from 'react';

const Card = (props) =>{

    const {title, style, load, action} = props;
    
    const listLoad = load !==undefined ? load.map((el, i)=>(
        <li key={i}>
            {el}
        </li>
    )) : null

    const message = (<li>
        THERE ARE NO ITEMS TO SHOW
    </li>)

    return(
        <Fragment>
            <div className="col-md-4 col-lg-4">
                <div className="card">
                    <div className={`card-header text-white font-weight-bold ${style}`}>
                       {title !== undefined && title !== '' ? title : 'DEFINIR TITULO'}
                    </div>
                    <div className="card-body">
                        <ul>
                            {load !== undefined ? listLoad : message}
                        </ul>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}


export default Card;