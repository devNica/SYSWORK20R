import React, { Fragment } from 'react';
import { Route } from 'react-router-dom'
import PrivateRoute from './components/commons/PrivateRoute';
import GuestRoute from './components/commons/GuestRoute';
import Signin from './components/user/signin';
import Navbar from './components/navbar/Navbar';
import HomePage from './components/pages/HomePage';
import Profile from './components/user/Profile/Profile';
import CreatePerson from './components/modules/Administration/CreatePerson';
import PersonsRecordsList from './components/modules/Administration/PersonsRecordsList';
import EditPerson from './components/modules/Administration/EditPerson';
import CreateEmployee from './components/modules/Administration/CreateEmployee';
import EmployeesRecordsList from './components/modules/Administration/EmployeesRecordsList';
import EditEmployee from './components/modules/Administration/EditEmployee';
import UsersAccountsList from './components/modules/Administration/UsersAccountsList';

const App = ({ location }) => {

  return (
    <Fragment>
        <Navbar />
        <Route location={location} exact path='/' component={HomePage} />
        <PrivateRoute location={location} exact path='/profile' component={Profile} />
        <GuestRoute location={location} exact path='/signin' component={Signin} />
        <PrivateRoute location={location} exact path='/administration/addperson' component={CreatePerson}/>
        <PrivateRoute location={location} exact path='/administration/viewpersonsrecords' component={PersonsRecordsList}/>
        <PrivateRoute location={location} exact path='/administration/viewemployeesrecords' component={EmployeesRecordsList}/>
        <PrivateRoute location={location} exact path='/administration/viewusersaccounts' component={UsersAccountsList}/>
        <PrivateRoute location={location} exact path='/administration/editperson/:id' component={EditPerson} />
        <PrivateRoute location={location} exact path='/administration/addemployee' component={CreateEmployee}/>
        <PrivateRoute location={location} exact path='/administration/editemployee/:id' component={EditEmployee} />
        
    </Fragment>
  );

}

export default App;
