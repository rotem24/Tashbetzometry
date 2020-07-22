import React, { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { makeStyles, Container, FormControl, InputLabel, OutlinedInput, IconButton, InputAdornment, Button, TextField } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Visibility, VisibilityOff } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Ellinia CLM',
        fontSize: 35,
        fontWeight: 'bolder',
        marginTop: 50
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
        color: '#fff',
        fontFamily: 'Assistant'
    },
    backBtn: {
        color: 'grey',
        float:'right',
        marginTop: 15,
        position: 'absolute',
        right: '15px'
    }
}));

function ForgetPass() {

    const history = useHistory();
    const classes = useStyles();
    const [user, setUser] = useState({ mail: '', password: '' });
    const [input, setInput] = useState({ type: false, helperText: '' });


    function GoBack() {
        history.push('/');
    }

    const updateMailValue = (event) => {
        setUser({ ...user, mail: event.target.value });
    }

    const handleChangePass = (event) => {
        setUser({ ...user, password: event.target.value });
    }

    //password with eye
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
        apiUrl = 'http://localhost:50664/api/';
    }

    const CheckPasswordOnDB = async (event) => {
        event.preventDefault();

        try {
            const res = await fetch(apiUrl + 'User/' + user.mail + "/", {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            let result = await res.json();
            if (result.Mail === null) setInput({ type: true, helperText: 'דוא"ל לא רשום במערכת' });
            else {
                setInput({ type: false });
                const u = {
                    Mail: result.Mail,
                    Password: user.password
                };
                PutPassword(u);
            }
        } catch (error) {
            console.log("ErrorGetForgetPass", error);
        }
    };

    const PutPassword = async (u) => {
        try {
            await fetch(apiUrl + 'User/ForgetPass', {
                method: 'PUT',
                body: JSON.stringify(u),
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            console.log("ChangePassSuccsses"); 
            history.push('/');
        } catch (error) {
            console.log('ErrorPutForgetPass', error);   
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <ArrowForwardIosIcon className={classes.backBtn} onClick={GoBack} />
            <div className={classes.paper}>
                <h1 className={classes.title}> איפוס סיסמה</h1>
                <form className={classes.form} noValidate onSubmit={CheckPasswordOnDB}>
                    <TextField className={classes.txtField}
                        variant="outlined"
                        required
                        fullWidth
                        autoFocus
                        id="email"
                        label="כתובת אימייל"
                        value={user.mail}
                        name="email"
                        autoComplete="email"
                        onChange={updateMailValue}
                        error={input.type}
                        helperText={input.helperText}
                    />
                    <FormControl style={{ width: '100%' }} variant="outlined" className={classes.txtField}>
                        <InputLabel htmlFor="outlined-adornment-password">סיסמה חדשה*</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={user.password}
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
                        שלח סיסמה
            </Button>
                </form>
            </div>
        </Container>
    );
}
export default withRouter(ForgetPass);