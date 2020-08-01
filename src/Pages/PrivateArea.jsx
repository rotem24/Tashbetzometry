import React, { useContext, useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { makeStyles, Divider, Avatar } from '@material-ui/core';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import PeopleIcon from '@material-ui/icons/People';
import BorderColorIcon from '@material-ui/icons/BorderColor';
//Components
import Header from '../Components/Header';
import Chart from '../Components/Chart';
import BarChart from '../Components/BarChart';
//Context Api
import { UserDetailsContext } from '../Contexts/UserDetailsContext';



const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '65px',
        position: 'fixed',
        bottom: 0,
    },
    title: {
        flexGrow: 1,
        fontFamily: 'Suez One',
        fontSize: 30,
        fontWeight: 'bolder',
    },
    submit: {
        width: 180,
        fontFamily: 'Assistant',
        margin: theme.spacing(2, 0, 2),
        fontSize: 16,
        height: 50,
        color: 'black'
    },
    score: {
        fontFamily: 'Rubik',
        textAlign: 'right',
        marginRight: '10px',
        fontSize: 18,
    },
    paper: {
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'flex-end',
    },
    avatar: {
        backgroundColor: '#999aab',
        width: '45px',
        height: '45px',
        marginTop: '15px',
        position: 'absolute',
        right: '15px'
    },
    title: {
        fontFamily: 'Rubik',
        fontSize: 28,
        fontWeight: 'bolder',
        marginRight: 4,
        marginTop: 22,
        position: 'absolute',
        right: '65px'
    },
    img: {
        width: 150,
        borderRadius: '50%'
    },
    score: {
        fontSize: 18,
        fontFamily: 'Rubik',
        marginTop: 27,
        position: 'absolute',
        left: '15px'
    },
    text: {
        color: 'red'
    },
    rootList: {
        width: '100%',
        display: 'flex',
        direction: 'rtl',
    },
    list: {
        display: 'inline',
        textAlign: 'center',

    },
    ListItem: {
        width: '100%',
        display: 'inline',
        margin: theme.spacing(0),
        textAlign: 'center',
    },
    inline: {
        float: 'center',
    }
}));


const PrivateArea = () => {
    //ContextApi
    const { UserDetails } = useContext(UserDetailsContext);
    const user = UserDetails;

    const history = useHistory();

    //donughtchart
    const [hardWords, setHardWords] = useState();
    const [sharedwith, setsharedwith] = useState();
    const [sharedfrom, setsharedfrom] = useState();
    const [createCross, setcreateCross] = useState();
    const [hints, sethints] = useState();

    //userHardestWord
    const [word, setWord] = useState('');
    var textcolor = localStorage.getItem('color');

    const classes = useStyles();

    let local = false;
    let apiUrl = 'http://proj.ruppin.ac.il/bgroup11/prod/BackEnd/api/';
    if (local) {
        apiUrl = 'http://localhost:50664/api/';
    }

    useEffect(() => {
        getCountSharedWithCross();
        getCountSharedFromCross();
        getCountHintForUser();
        GetAllCreateCross();
        GetHardWords();
        WatchHardestWords();
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
            //console.log("shared with:", result);
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
            // console.log("shared from:", result);
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
            // console.log("Count Hints:", result);

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

            //console.log("hardWords:", result);
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

            //console.log("CreateCross:", result);
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

    const WatchHardestWords = async () => {

        try {
            const res = await fetch(apiUrl + "WordForUser/" + user.Mail + "/Level", {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            let result = await res.json();
            var wordkey = '';
            wordkey += result[0].Word;
            wordkey += "-";
            wordkey += result[0].WordWithSpace;
            setWord(wordkey);

        } catch (error) {
            console.log('ErrorGetHardWords', error);
        }
    }

    return (

        <div>
            <Header className={classes.title} title={'אזור אישי'} goBack={'/HomePage'} />
            <div className={classes.paper}>
                <p className={classes.score}>ניקוד : <MonetizationOnOutlinedIcon style={{ color: '#FFD700' }} /> {user.Score}</p>
                <h1 className={classes.title}>שלום {user.FirstName}</h1>
                <Avatar className={classes.avatar} src={user.Image} />
            </div>
            <br /><br />
            <Chart SharedFrom={sharedfrom} SharedWith={sharedwith} Hints={hints} CreateCross={createCross} graph={false} />
            <p style={{ color: textcolor, backgroundColor: 'white', marginTop:7 }}>המילה הקשה ביותר עבורך:<br /> {word}</p>
            <BarChart />
            <Divider variant="middle" />
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
