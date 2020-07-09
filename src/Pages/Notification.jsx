import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import swal from 'sweetalert';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';
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
    }
}));

const Notification = () => {
    //ContextApi
    const { UserDetails } = useContext(UserDetailsContext);
    const user = UserDetails;

    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();

    const [notification, setNotification] = useState(location.state.params);


    var local = false;
    var apiUrl = 'http://proj.ruppin.ac.il/bgroup11/prod/api/'
    if (local) {
        apiUrl = 'http://localhost:50664/api/'
    }

    const HandleNotification = async (index) => {
        await UpdateHasDoneNotifications(index);
        if (notification[index].Type === 'shareCross') {
            try {
                const res = await fetch(apiUrl + 'SharedCross/' + notification[index].CrossNum + '/', {
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'application/json; charset=UTF-8',
                    })
                })
                let result = await res.json();
                console.log("GetSharedCross:", result);
                history.push('/NewCross', { isSharedCross: true, cross: result });
            } catch (error) {
                console.log("ErrorSharedCross", error);
            }
        }
    }

    const UpdateHasDoneNotifications = async (index) => {
        try {
            fetch(apiUrl + 'Notifications/HasDone/' + notification[index].CrossNum + '/', {
                method: 'PUT',
                body: '',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
        } catch (error) {
            console.log('ErrorUpdateHasDoneNotification', error);
        }
    }

    const DeleteNotification = async (crossNum) => {
        swal({
            text: "התראה זו תמחק לצמיתות",
            title: 'האם אתה בטוח?',       
            buttons: {
                confirm: "מחק",
                cancel: "ביטול"
            },
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const newList = notification.filter((item) => item.CrossNum !== crossNum);
                    setNotification(newList);
                    try {
                        fetch(apiUrl + 'Notifications/' + crossNum + '/', {
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
                        console.log('ErrorDeleteNotification', error);
                    }
                }
            });
    }


    return (
        <div>

            <Header className={classes.title} title={'התראות'}  goBack={'/HomePage'}/>
            <List className={classes.root}>
                {notification.map((sc, index) => {
                    return (
                        <div style={{ backgroundColor: !sc.HasDone ? '#ecf7f9' : 'white' }}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt={sc.FirstName + " " + sc.LastName} src={sc.Image} />
                                </ListItemAvatar>
                                <ListItemText
                                    pimary="שיתוף תשבץ"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary"
                                            >
                                                {sc.FirstName + " " + sc.LastName + " "}
                                            </Typography>
                                            {'שיתף/ה אותך בתשבץ '}
                                        </React.Fragment>
                                    }
                                />
                                <ClearIcon onClick={() => DeleteNotification(sc.CrossNum)} />
                            </ListItem>
                            <Button
                                variant="contained"
                                className={classes.button}
                                onClick={() => HandleNotification(index)}
                            >
                                שחק
                                </Button>
                            <Divider />
                        </div>
                    )
                })}
            </List>
        </div>
    );
}

export default Notification;