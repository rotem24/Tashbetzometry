import React, { useState, useContext } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { makeStyles, Container, Divider, TextField, Button, Avatar } from '@material-ui/core';
//Components
import FacebookLog from '../Components/FacebookLog';
import Google from '../Components/Google';
//Context Api
import { UserDetailsContext } from '../Contexts/UserDetailsContext';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#999aab',
    width: '130px',
    height: '130px',
  },
  form: {
    width: '85%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),

  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    fontSize: 18,
    height: 56,
    backgroundColor: 'black',
    color: '#fff'
  },
  title: {
    fontFamily: 'Suez One',
    fontSize: 40,
    fontWeight: 'bolder'
  },
  social: {
    display: 'flex',
    flexDirection: 'column',
  }
}));


function Login() {
  
  //ContextApi
  const { SetUserDetails } = useContext(UserDetailsContext);

  const classes = useStyles();
  const history = useHistory();

  const [user, setUser] = useState({});
  const [input, setInput] = useState({type: false, helperText:''});
 
  //setState
  const updateMailValue = (event) => {
    setUser({ ...user, mail: event.target.value })
  };

  const updatePassValue = (event) => {
    setUser({ ...user, password: event.target.value })
  };
  
  let local = true;
  let apiUrl = 'http://proj.ruppin.ac.il/bgroup11/prod/api/';
  if (local){
    apiUrl = 'http://localhost:50664/api/';
  }

  //AjaxGetUserLogin
  const GetUserFromServer = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(apiUrl + 'User/' + user.mail + '/' + user.password, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
        })
      })
      let result = await res.json();
      if (result.Mail === null) setInput({ type: true, helperText: 'שם משתמש/סיסמה לא נכונים'});
      else {
        setInput({type: false});
        const u ={
          Mail: result.Mail,
          Password: result.Password,
          UserName: result.UserName,
          FirstName: result.FirstName,
          LastName: result.LastName,
          Image: result.Image,
          Score: result.Score,
          Theme: result.Theme,
        };
        SetUserDetails(u);
        history.push('/HomePage');
      }
    } catch (error) {
      console.log("ErrorGetUserLogin", error);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <h1 className={classes.title}> התחברות </h1>
        <Avatar className={classes.avatar}></Avatar>
        <form className={classes.form} noValidate onSubmit={GetUserFromServer}>
          <TextField
            error={input.type}
            variant="outlined"
            required
            fullWidth
            name="email"
            label="שם משתמש"
            id="email"
            autoComplete="email"
            autoFocus
            onChange={updateMailValue}
            helperText={input.helperText}
          />
          <TextField
            error={input.type}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="סיסמה"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={updatePassValue}
            helperText={input.helperText}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            התחבר
          </Button>
            <Link to={"/ForgetPass"}>שכחתי סיסמה</Link>
        </form>
      </div>

      <Divider variant="middle" />
      <br />
      <div className={classes.social}>
        <span>התחבר באמצעות הרשתות החברתיות</span>
        <FacebookLog /> <Google />
      </div>
      <br />
      <Divider variant="middle" />
      <br />
      <span>עוד אין לך חשבון?</span>
      <br />
      <Link to={"/Register"}>יצירת משתמש חדש</Link>
    </Container>
  );
}
export default withRouter(Login);