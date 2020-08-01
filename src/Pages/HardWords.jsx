import React, { useContext, useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { makeStyles, Divider } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import PeopleIcon from '@material-ui/icons/People';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import ListItemText from '@material-ui/core/ListItemText';
import swal from 'sweetalert';
//Style
import '../StyleSheet/NotificationStyle.css'
//Components
import Header from '../Components/Header';
//Context Api
import { UserDetailsContext } from '../Contexts/UserDetailsContext';

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
    },
    bar: {
        width: '100%',
        height: '65px',
        position: 'fixed',
        bottom: 0,
    },
    ul: {
        fontFamily: 'Rubik'
    }
}));

const HardWords = () => {

    //ContextApi
    const { UserDetails } = useContext(UserDetailsContext);
    const user = UserDetails;

    const classes = useStyles();
    const history = useHistory();

    const [words, setWords] = useState([]);

    useEffect(() => {
        WatchHardWords();

    }, []);

    let local = false;
    let apiUrl = 'http://proj.ruppin.ac.il/bgroup11/prod/api/';
    if (local) {
        apiUrl = 'http://localhost:50664/api/';
    }


    const WatchHardWords = async () => {
        try {
            const res = await fetch(apiUrl + "WordForUser/" + user.Mail + "/hardwords", {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            let result = await res.json();

            console.log("hardWords:", result);
            setWords(result);
        } catch (error) {
            console.log('ErrorGetHardWords', error);
        }
    }

    function WatchAllSharedCross() {
        history.push('/AllSharedCross');
    }

    function WatchAllUserCreateCross() {
        history.push('/UserCreateCross');
    }

    const DeleteHardWord = async (word, solution) => {
        swal({
            text: 'הגדרה זו תמחק מרשימת המילים הקשות',
            title: 'האם אתה בטוח?',
            buttons: {
                confirm: "מחק",
                cancel: "ביטול"
            },
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const newList = words.filter((item) => item.Word !== word && item.Solution !== solution);
                    setWords(newList);
                    try {
                        fetch(apiUrl + 'WordForUser/' + user.Mail + '/' + word + '/' + solution + '/', {
                            method: 'DELETE',
                            body: '',
                            headers: new Headers({
                                'Content-Type': 'application/json; charset=UTF-8',
                            })
                        })
                        swal("התראה נמחקה", {
                            icon: "success",
                        });
                    } catch (error) {
                        console.log('ErrorDeleteHardWord', error);
                    }
                }
            });
    };


    return (
        <div>
            <Header title={'מילים קשות'} goBack={'/PrivateArea'} />
            <List className={classes.root1} subheader={<li />}>
                {words.map((u, index) => (
                    <li key={index} className={classes.listSection}>
                        <ul>
                            <Divider variant="fullWidth" />
                            {[0].map((wordsToAdd) => (
                                <ListItem key={index} >
                                    <ListItemText>
                                        {u.WordWithSpace}-{u.Solution}
                                    </ListItemText>
                                    <DeleteOutlinedIcon onClick={() => DeleteHardWord(u.Word,u.Solution)}  />
                                </ListItem>
                            ))}
                        </ul>
                    </li>
                ))}
            </List>
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
export default withRouter(HardWords);
