import React, { useContext, useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import swal from 'sweetalert';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import PeopleIcon from '@material-ui/icons/People';
import BorderColorIcon from '@material-ui/icons/BorderColor';
//Style
import '../StyleSheet/NotificationStyle.css'
//Components
import Header from '../Components/Header';
//Context Api
import { UserDetailsContext } from '../Contexts/UserDetailsContext';
//IMG
import startCross from '../IMG/startCross.jpeg';
//GridList
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '15px',
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    gridList: {
        transform: 'translateZ(0)',
        width: 500,
        height: '100%',

    },
    title: {
        color: 'white',
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    bar: {
        width: '100%',
        height: '65px',
        position: 'fixed',
        bottom: 0, 
    }

}));

const AllSharedCross = () => {
    const classes = useStyles();
    const history = useHistory();

    //ContextApi
    const { UserDetails } = useContext(UserDetailsContext);
    const user = UserDetails;

    const [SharedCross, setSharedCross] = useState([]);

    useEffect(() => {
        WatchAllSharedCross();
    }, []);

    let local = false;
    let apiUrl = 'http://proj.ruppin.ac.il/bgroup11/prod/api/';
    if (local) {
        apiUrl = 'http://localhost:50664/api/';
    }

    const GOCross = async (data) => {
        console.log(data);
        swal({
            //text: התחל תשבץ",
            title: "האם להתחיל לפתור את תשבץ מספר: " + data.CrossNum,
            buttons: {
                confirm: "כן",
                cancel: "ביטול"
            },
            dangerMode: true,
        })
            .then((gocross) => {
                if (gocross) {
                    history.push('/NewCross', { isShared: true, SharescrossData: data });
                }
            });
    }

    const WatchAllSharedCross = async () => {
        try {
            const res = await fetch(apiUrl + "SharedCross/" + user.Mail + "/WatchAll", {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            let result = await res.json();
            setSharedCross(result);
            console.log("AllSharedCross:", result);
        } catch (error) {
            console.log('ErrorGetHardWords', error);
        }
    }


    function WatchHardWords() {
        history.push('/HardWords');
    }

    function WatchAllUserCreateCross() {
        history.push('/UserCreateCross');
    }


    return (
        <div>
            <Header title={'תשבצים משותפים'} goBack={'/PrivateArea'} />
            <div className={classes.root}>
                <GridList cellHeight={180} className={classes.gridList} >
                    {SharedCross.map((u) => (
                        <GridListTile key={u.CrossNum} onClick={() => GOCross(u)}>
                            <img src={startCross} alt={u.CrossNum} />
                            <GridListTileBar
                                title={u.CrossNum}
                                subtitle={<span>שותף ע"י: {u.FirstName + " " + u.LastName}</span>}
                                classes={{
                                    root: classes.titleBar,
                                    title: classes.title,
                                }}
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
            <BottomNavigation
                showLabels
                className={classes.bar}
            >
                <BottomNavigationAction onClick={WatchHardWords} label="מילים קשות" icon={<PlaylistAddCheckIcon />} />
                <BottomNavigationAction onClick={WatchAllSharedCross} label="תשבצים משותפים" icon={<PeopleIcon />} />
                <BottomNavigationAction onClick={WatchAllUserCreateCross} label="תשבצים שיצרתי" icon={<BorderColorIcon />} />
            </BottomNavigation>
        </div>
    )
}
export default withRouter(AllSharedCross);
