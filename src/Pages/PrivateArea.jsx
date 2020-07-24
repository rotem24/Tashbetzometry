import React, { useContext, useEffect, useState } from 'react';
import { makeStyles, Divider, Avatar } from '@material-ui/core';
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
import ChartPodium from '../Components/ChartPodium';
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
        //marginBottom: 100,
        //marginTop: 12,
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

    //userpodium
    const [pod3, setPod3] = useState([{}]);
    var userList = [];
    var podium3 = [];
    const [place, setplace] = useState();

    //userHardestWord
    const [word, setWord] = useState('');
    var textcolor = localStorage.getItem('color');


    const classes = useStyles();
    let local = false;
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
        getScoresPodium();
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

    const getScoresPodium = async () => {
        try {
            const res = await fetch(apiUrl + 'User/Users', {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            let result = await res.json();
            for (let i = 0; i < result.length; i++) {
                userList.push(result[i])
            }
        }
        catch (error) {
            console.log('ErrorGetUsersScore', error);
        }

        userList.sort((a, b) => (a.Score < b.Score) ? 1 : -1)

        for (let i = 0; i < userList.length; i++) {
            if (userList[i].Mail == user.Mail) {
                setplace(i + 1);
                podium3.push(userList[i - 1]);
                podium3.push(userList[i]);
                podium3.push(userList[i + 1]);
            }
        }
        setPod3(podium3);


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
            //console.log("hardWords:", result[0]);
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
            <br /><br /><br />
            <Divider variant="middle" />
            <p style={{ color: textcolor, backgroundColor: '#989898' }}>המילה הקשה ביותר עבורך: {word}</p>
            <Divider variant="middle" />
            <Chart SharedFrom={sharedfrom} SharedWith={sharedwith} Hints={hints} CreateCross={createCross} graph={false}></Chart>
            <br />
            <Divider variant="middle" />
            <ChartPodium Podium3={pod3} Place={place}></ChartPodium>
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
