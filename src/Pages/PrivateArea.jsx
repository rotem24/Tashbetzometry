import React, { useContext, useEffect, useState } from 'react';
import { makeStyles, Divider } from '@material-ui/core';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import PeopleIcon from '@material-ui/icons/People';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
//Components
import Header from '../Components/Header';
import { useHistory, withRouter } from 'react-router-dom';
import Chart from '../Components/Chart';
//Context Api
import { UserDetailsContext } from '../Contexts/UserDetailsContext';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '65px',
        position: 'absolute',
        bottom: 0
    },
    title: {
        flexGrow: 1,
        fontFamily: 'Suez One',
        fontSize: 30,
        fontWeight: 'bolder',
    },
    submit: {
        width: 180,
        //fontFamily: 'Tahoma',
        fontFamily: 'Assistant',
        margin: theme.spacing(2, 0, 2),
        fontSize: 16,
        height: 50,
        color: 'black'
    },
    avatar: {
        marginBottom: '17px',
        backgroundColor: '#999aab',
        width: '80px',
        height: '80px',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    score: {
        fontFamily: 'Rubik',
        textAlign: 'right',
        marginRight: '10px',
        fontSize: 18,
    },
}));


const PrivateArea = () => {
    //ContextApi
    const { UserDetails } = useContext(UserDetailsContext);
    const user = UserDetails;

    const history = useHistory();
    const [hardWords, setHardWords] = useState();
    const [sharedwith, setsharedwith] = useState();
    const [sharedfrom, setsharedfrom] = useState();
    const [createCross, setcreateCross] = useState();
    const [hints, sethints] = useState();
    const [sum, setsum] = useState();
    

    const classes = useStyles();
    let local = true;
    let apiUrl = 'http://proj.ruppin.ac.il/bgroup11/prod/api/';
    if (local) {
        apiUrl = 'http://localhost:50664/api/';
    }

    useEffect(() => {
        getCountSharedWithCross();
        getCountSharedFromCross();
        getCountHintForUser();
        GetAllCreateCross();
        GetHardWords();
    }, []);


    const getCountSharedWithCross = async () => {
        try {
            const res = await fetch(apiUrl + 'SharedCross/' + user.Mail + '/count', {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            let result = await res.json();
            setsharedwith(result);
            console.log("shared with:", result);
        } catch (error) {
            console.log('Errorshared from', error);
        }
    }

    const getCountSharedFromCross = async () => {
        try {
            const res = await fetch(apiUrl + 'SharedCross/' + user.Mail + '/countfrom', {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            let result = await res.json();
            setsharedfrom(result);
            console.log("shared from:", result);
        } catch (error) {
            console.log('Errorshared from', error);
        }
    }

    const getCountHintForUser = async () => {
        try {
            const res = await fetch(apiUrl + 'Hints/' + user.Mail + "/countHints", {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            let result = await res.json();
            sethints(result);
            console.log("Count Hints:", result);
            setsum(result);
            // settotal(total += result);
            console.log('total:', sum);
        } catch (error) {
            console.log('ErrorGetAddWords', error);
        }
        //var totall = await sumtotal();
    }

    const GetHardWords = async () => {

        try {
            const res = await fetch(apiUrl + "WordForUser/" + user.Mail + "/hardwords", {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            let result = await res.json();

            console.log("hardWords:", result);
            setHardWords(result);
        } catch (error) {
            console.log('ErrorGetHardWords', error);
        }
    }

    const GetAllCreateCross = async () => {

        try {
            const res = await fetch(apiUrl + "CreateCross/" + user.Mail + "/count", {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            let result = await res.json();

            console.log("CreateCross:", result);
            setcreateCross(result);
        } catch (error) {
            console.log('ErrorCreateCross', error);
        }
    }

    function WatchHardWords() {
        history.push('/HardWords');
    }

    function WatchAllSharedCross() {
        history.push('/AllSharedCross');
    }

    function WatchAllUserCreateCross() {
        history.push('/UserCreateCross');
    }



    return (
        <div>
            <Header className={classes.title} title={'אזור אישי'} goBack={'/HomePage'} />
            <div className={classes.paper}>
                <br/>
                <p className={classes.score}>הניקוד שלך: <MonetizationOnOutlinedIcon style={{ color: '#FFD700' }} /> {user.Score}</p>
                {/* <Avatar className={classes.avatar}
                        src={user.Image}
                    /> */}
            </div>
            <Chart SharedFrom={sharedfrom} SharedWith={sharedwith} Hints={hints} CreateCross={createCross} graph={false}></Chart>
            <br />
   

            <BottomNavigation
                showLabels
                className={classes.root}
            >
                <BottomNavigationAction onClick={WatchHardWords} label="מילים קשות" icon={<PlaylistAddCheckIcon />} />
                <BottomNavigationAction onClick={WatchAllSharedCross} label="תשבצים משותפים" icon={<PeopleIcon />} />
                <BottomNavigationAction onClick={WatchAllUserCreateCross} label="תשבצים שיצרתי" icon={<BorderColorIcon />} />
            </BottomNavigation>
        </div>
    );
}
export default withRouter(PrivateArea);
