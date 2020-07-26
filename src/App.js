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
import PrivateArea from './Pages/PrivateArea';
import Notification from './Pages/Notification';
import Forum from './Pages/Forum';
import AddWord from './Pages/AddWord';
import HardWords from './Pages/HardWords';
import AllSharedCross from './Pages/AllSharedCross';
import MakeCross from './Pages/MakeCross';
import UserCreateCross from './Pages/UserCreateCross';
import CompetitionCross from './Pages/CompetitionCross';
import CompetitionUser2 from './Pages/CompetitionUser2';
//Contexts Providers:
import UserDetailsContextProvider from './Contexts/UserDetailsContext';


function App() {

  return (

    <div className="App">
      <UserDetailsContextProvider>
        <Switch>
          <Route exact path='/' component={withRouter(Login)} />
          <Route path='/Register' component={ withRouter(Register)} />
          <Route path='/ForgetPass' component={ withRouter(ForgetPass)} />
          <Route path='/HomePage' component={ withRouter(HomePage)} />
          <Route path='/NewCross' component={ withRouter(NewCross)} />
          <Route path='/Setting' component={Setting} />
          <Route path='/PrivateArea' component={PrivateArea} />
          <Route path='/Notification' component={Notification} />
          <Route path='/Forum' component={Forum} />
          <Route path='/AddWord' component={AddWord} />
          <Route path='/HardWords' component={withRouter(HardWords)} />
          <Route path='/AllSharedCross' component={withRouter(AllSharedCross)} />
          <Route path='/MakeCross' component={MakeCross} />
          <Route path='/UserCreateCross' component={withRouter(UserCreateCross)} />
          <Route path='/CompetitionCross' component={CompetitionCross} />
          <Route path='/CompetitionUser2' component={withRouter(CompetitionUser2)} />
        </Switch>
      </UserDetailsContextProvider>
    </div>
  );
}
export default withRouter(App);