import React, { useState, useContext } from 'react';
import { makeStyles, Container, FormControl, InputLabel, OutlinedInput, IconButton, InputAdornment, Button, TextField } from '@material-ui/core';
import { withRouter, useHistory } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
//Context Api
import { UserDetailsContext } from '../Contexts/UserDetailsContext';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Suez One',
    fontSize: 40,
    fontWeight: 'bolder'
  },
  form: {
    width: '85%',
  },
  txtField: {
    margin: theme.spacing(2, 0, 2),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    fontSize: 18,
    height: 56,
    backgroundColor: 'black',
    color: '#fff'
  },
  backBtn: {
    color: 'grey',

  }
}));

function Register() {

  //ContextApi
  const { SetUserDetails } = useContext(UserDetailsContext);

  const classes = useStyles();
  const history = useHistory();

  const [user, setUser] = useState({});

  //setState
  const handleChangeFName = (event) => {
    setUser({ ...user, firstName: event.target.value });
  };
  const handleChangeLName = (event) => {
    setUser({ ...user, lastName: event.target.value });
  };
  const handleChangeMail = (event) => {
    setUser({ ...user, mail: event.target.value })
  };
  const handleChangeUserN = (event) => {
    setUser({ ...user, userName: event.target.value })
  };
  const handleChangePass = (event) => {
    setUser({ ...user, password: event.target.value })
    setValues({ ...values, password: event.target.value });
  };

  //password-הסתרת/הופעת הסיסמה עם הסימן עין
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  let local = false;
  let apiUrl = 'http://proj.ruppin.ac.il/bgroup11/prod/api/';
  if (local) {
    let apiUrl = 'http://localhost:50664/api/';
  }

  //PostUserToDB
  const PostUserToServer = async (event) => {
    event.preventDefault();

    const u = {
      FirstName: user.firstName,
      LastName: user.lastName,
      Mail: user.mail,
      UserName: user.userName,
      Password: user.password,
      Score: 30
    };

    try {
      await fetch(apiUrl + 'User/', {
        method: 'POST',
        body: JSON.stringify(u),
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
        })
      })
      console.log('PostUserToDBSuccsses');
      SetUserDetails(u);
      history.push('/HomePage');
    } catch (error) {
      console.log('ErrorPostUserToDB', error);
    }
  }

  function GoBack() {
    history.push('/Login');
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <ArrowForwardIosIcon className={classes.backBtn} onClick={GoBack} />
        <h1 className={classes.title}>יצירת משתמש חדש</h1>
        <form className={classes.form} noValidate onSubmit={PostUserToServer}>
          <TextField className={classes.txtField}
            required
            fullWidth
            autoFocus
            id="email"
            value={user.mail}
            label="כתובת אימייל"
            name="email"
            autoComplete="email"
            onChange={handleChangeMail}
            variant="outlined"
          />
          <TextField className={classes.txtField}
            fullWidth
            id="outlined-name"
            label="שם פרטי"
            value={user.firstName}
            onChange={handleChangeFName}
            variant="outlined"
          />
          <TextField className={classes.txtField}
            fullWidth
            id="outlined-name"
            label="שם משפחה"
            value={user.lastName}
            name="lastName"
            onChange={handleChangeLName}
            variant="outlined"
          />
          <TextField className={classes.txtField}
            required
            fullWidth
            id="outlined-name"
            label="שם משתמש"
            value={user.userName}
            onChange={handleChangeUserN}
            variant="outlined"
          />
          <FormControl style={{ width: '100%' }} variant="outlined" className={classes.txtField}>
            <InputLabel htmlFor="outlined-adornment-password">סיסמה</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChangePass}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end">
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            הצטרפות
            </Button>
        </form>
      </div>
    </Container>
  );

}


export default withRouter(Register);