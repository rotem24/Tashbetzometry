import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import './App.css';
//Pages
import Login from './Pages/Login';
import Register from './Pages/Register';
import HomePage from './Pages/HomePage';
import ForgetPass from './Pages/ForgetPass';
import NewCross from './Pages/NewCross';
import Setting from './Pages/Setting';
import EditProfile from './Pages/EditProfile';
import PrivateArea from './Pages/PrivateArea';
import Notification from './Pages/Notification';
import ContactList from './Pages/ContactList';
import Forum from './Pages/Forum';
import AddWord from './Pages/AddWord';
//Contexts Providers:
import UserDetailsContextProvider from './Contexts/UserDetailsContext';

function App() {

  return (
    <div className="App">
      <UserDetailsContextProvider>
        <Switch>
          <Route exact path='/'>
            <Login />
          </Route>
          <Route path="/Register">
            <Register />
          </Route>
          <Route path="/HomePage">
            <HomePage />
          </Route>
          <Route path="/ForgetPass">
            <ForgetPass />
          </Route>
          <Route path="/NewCross">
            <NewCross />
          </Route>
          <Route path="/Setting">
            <Setting />
          </Route>
          <Route path="/EditProfile">
            <EditProfile />
          </Route>
          <Route path="/PrivateArea">
            <PrivateArea />
          </Route>
          <Route path="/Notification">
            <Notification />
          </Route>
          <Route path="/ContactList">
            <ContactList />
          </Route>
          <Route path="/Forum">
            <Forum />
          </Route>
          <Route path="/AddWord">
            <AddWord />
          </Route>
        </Switch>
      </UserDetailsContextProvider>
    </div>
  );
}
export default withRouter(App);