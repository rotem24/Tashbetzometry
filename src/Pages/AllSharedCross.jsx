import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Divider } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import swal from 'sweetalert';
//Style
import '../StyleSheet/NotificationStyle.css'
//Components
import Header from '../Components/Header';
//Context Api
import { UserDetailsContext } from '../Contexts/UserDetailsContext';
import { Card } from 'semantic-ui-react'
//IMG
import startCross from '../IMG/startCross.jpeg';
//GridList
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '15px',
        width: '90%',
        display: 'block',
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
    //   inline: {
    //     display: 'inline',
    // },
    // button: {
    //     marginBottom: '15px',
    //     maxWidth: '30px',
    //     float: 'left',
    //     textAlign: 'center',
    // },
    // img: {
    //     width: '15px',
    //     height: '15px',
    //     margin: theme.spacing(3),
    // },
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
            text: "התחל תשבץ",
            title: "האם להתחיל לפתור את תשבץ מס':" + data.CrossNum,
            buttons: {
                confirm: "כן",
                cancel: "ביטול"
            },
            dangerMode: true,
        })
            .then((gocross) => {
                if (gocross) {
                    history.push('/NewCross', { value: true, cross: data });
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


    return (
        <div>
            <Header title={'תשבצים משותפים'} />
            <div className={classes.root}>
                <GridList cellHeight={180} className={classes.gridList} >
                    {SharedCross.map((u) => (
                        <GridListTile key={u.CrossNum} onClick={() => GOCross(u)}>
                            <img src={startCross} alt={u.CrossNum} />
                            <GridListTileBar
                                title={u.CrossNum}
                                subtitle={<span>שותף ע"י: {u.SendFrom}</span>}
                                classes={{
                                    root: classes.titleBar,
                                    title: classes.title,
                                }}
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
            {/* {SharedCross.map((u, index) => (
                <button><img src={startCross} alt={u.CrossNum} onClick={() => GOCross(u)}/>{u.CrossNum}</button>
            ))} */}
            {/* List-רשימת תשבצים משותפים */}
            {/* <List className={classes.root1} subheader={<li />}>
                {SharedCross.map((u, index) => (
                    <li key={index} className={classes.listSection}>
                        <ul className={classes.ul}>
                            <Divider variant="middle" />
                            {[0].map((wordsToAdd) => (
                                <ListItem key={index}>
                                    {u.CrossNum}
                                </ListItem>
                            ))}
                        </ul>
                    </li>
                ))}
            </List> */}


            {/* card - ניסיון לביצוע כרטיסים (ללא אפשרות לחיצה עליהם)*/}
            {/* <Card.Group itemsPerRow={6}>
                <Card raised image={user.Image} />
                <Card raised image={user.Image} />

            </Card.Group> */}
        </div>
    )
}
export default AllSharedCross;
