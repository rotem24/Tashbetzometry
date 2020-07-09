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
import Forum from './Pages/Forum';
import AddWord from './Pages/AddWord';
import HardWords from './Pages/HardWords';
import AllSharedCross from './Pages/AllSharedCross';
//Contexts Providers:
import UserDetailsContextProvider from './Contexts/UserDetailsContext';

function App() {

  return (

    <div className="App">
      <UserDetailsContextProvider>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/Register' component={Register} />
          <Route path='/ForgetPass' component={ForgetPass} />
          <Route path='/HomePage' component={HomePage} />
          <Route path='/NewCross' component={NewCross} />
          <Route path='/Setting' component={Setting} />
          <Route path='/EditProfile' component={EditProfile} />
          <Route path='/PrivateArea' component={PrivateArea} />
          <Route path='/Notification' component={Notification} />
          <Route path='/Forum' component={Forum} />
          <Route path='/AddWord' component={AddWord} />
          <Route path='/HardWords' component={HardWords} />
          <Route path='/AllSharedCross' component={AllSharedCross} />
        </Switch>
      </UserDetailsContextProvider>
    </div>
  );
}
export default withRouter(App);