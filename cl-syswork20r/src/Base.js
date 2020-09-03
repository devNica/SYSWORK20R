import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';
import App from './App';
import ReactNotifications from 'react-notifications-component';
import { loadUser } from './redux/actions/auth';

const Base = ()=>{

    useEffect(()=>{
        store.dispatch(loadUser());
  
    },[])

    
    return (
        <BrowserRouter basename='/onsupport'>
            <Provider store={store}>
                <ReactNotifications />
                <Route component={App} />
            </Provider>
        </BrowserRouter>
    );    
}

export default Base;