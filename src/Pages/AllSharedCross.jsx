import React, { useContext, useEffect, useState } from 'react';
import { makeStyles, Divider } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
//Style
import '../StyleSheet/NotificationStyle.css'
//Components
import Header from '../Components/Header';
//Context Api
import { UserDetailsContext } from '../Contexts/UserDetailsContext';
import { Card } from 'semantic-ui-react'


const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
        fontFamily: 'Suez One',
        fontSize: 30,
        fontWeight: 'bolder',
    },
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    button: {
        marginBottom: '15px',
        minWidth: '90px',
    }
}));

const AllSharedCross = () => {
    //ContextApi
    const { UserDetails } = useContext(UserDetailsContext);
    const user = UserDetails;
    const [SharedCross, setSharedCross] = useState([]);
    const classes = useStyles();
    useEffect(() => {
        WatchAllSharedCross();

    }, []);

    let local = true;
    let apiUrl = 'http://proj.ruppin.ac.il/bgroup11/prod/api/';
    if (local) {
        apiUrl = 'http://localhost:50664/api/';
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

    const CardExampleColumnCount = () => (
        <Card.Group itemsPerRow={6}>
            <Card raised image={user.Image} />
            <Card raised image={user.Image} />
           
        </Card.Group>
    )
    return (
        <div>
            <Header title={'תשבצים משותפים'} />
            <List className={classes.root1} subheader={<li />}>
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
            </List>
        </div>
    )
}
export default AllSharedCross;
