import React, { useContext, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { makeStyles, Container, Button } from '@material-ui/core';
import swal from 'sweetalert';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import PeopleIcon from '@material-ui/icons/People';
//Components
import Header from '../Components/Header';
//StyleSheet
import startCross from '../IMG/startCross.jpeg';
import addWord1 from '../IMG/addWord1.jpg';
import HomeStyle from '../StyleSheet/HomeStyle.css';
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
    title: {
        fontFamily: 'Suez One',
        fontSize: 40,
        fontWeight: 'bolder',
        marginBottom: 14
    },
    img: {
        width: 150,
        borderRadius: '50%'
    },
    submit: { 
        margin: theme.spacing(2, 0, 2),
        fontSize: 20,
        height: 100,
        width: 100,
        backgroundColor: 'black',
        color: '#00000',
        backgroundImage: `url(${startCross})`,
        backgroundSize: 'cover',
        fontWeight: 'bolder',
        fontFamily: 'Tahoma',
        marginLeft: 20
    },
    score: {
        fontSize: 16,
        fontWeight: 'bolder',
    },
    forum: {
        margin: theme.spacing(2, 0, 2),
        fontSize: 15,
        height: 50,
        width: 200,
        backgroundColor: 'orange',
        color: '#00000',
        backgroundSize: 'cover',
        fontWeight: 'bolder',
        fontFamily: 'Tahoma'
    },
    addWord: {
        margin: theme.spacing(2, 0, 2),
        fontSize: 20,
        height: 100,
        width: 100,
        color: '#00000',
        fontWeight: 'bolder',
        fontFamily: 'Tahoma',
        backgroundImage: `url(${addWord1})`,
        backgroundSize: 'cover',
       
    }
}));


function HomePage() {
    //ContextApi
    const { UserDetails } = useContext(UserDetailsContext);
    const user = UserDetails;

    const classes = useStyles();
    const history = useHistory();

    localStorage.setItem('user', JSON.stringify(user));
    var badgeContent = 0;

    let local = false;
    let apiUrl = 'http://proj.ruppin.ac.il/bgroup11/prod/api/';
    if (local){
      apiUrl = 'http://localhost:50664/api/';
    }

    const startCross = (event) => {

        swal("בחר רמת קושי", {
            buttons: {
                easy: { text: 'קל', value: 'easy' },
                medium: { text: 'בינוני', value: 'medium' },
                hard: { text: 'קשה', value: 'hard' },
            },
            closeOnClickOutside: false
        })
            .then((value) => {
                history.push('/NewCross', { params: value });
            });
    }

    const LastCross = (event) => {
        history.push('/NewCross', { params: false });
    }

    function GoForum() {
        history.push('/Forum');
    }

    function GoAddWord() {
        history.push('/AddWord');
    }

    return (
        <div>
            <Header title={"דף הבית"} />
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <br /> <br />
                    <h1 className={classes.title}> {user.FirstName} שלום</h1>
                    <p className={classes.score}>הניקוד שלך: <MonetizationOnOutlinedIcon style={{ color: '#FFD700' }} /> {user.Score}</p>
                    <br />
                    <img src={user.Image} className={classes.img} />
                </div>
                <br />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={startCross}
                    className={classes.submit}>התחל תשבץ</Button>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={LastCross}
                    className={classes.submit}>תשבץ אחרון</Button>
                <br />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={GoAddWord}
                    className={classes.addWord}>הוסף הגדרה</Button>
                <br/><br/>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={GoForum}
                    className={classes.forum}>פורום<PeopleIcon style={{ marginRight: 10 }}/></Button>
            </Container>
        </div>
    )
}
export default withRouter(HomePage);