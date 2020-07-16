import React, { useContext, useState } from 'react';
import { useHistory, useLocation, withRouter } from 'react-router-dom';
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
//Dialog-helpFromFriend
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
    dialog: {
        color: 'black',
        textAlign: 'right',
        fontFamily: 'Tahoma',

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
    const [helpFromFriend, setHelpFromFriend] = useState({ FirstName: '', LastName: '', Solution: '', counter: '' });
    const [open, setOpen] = useState(false);
    const [answer, setAnswer] = useState();
    const [input, setInput] = useState({type: false, helperText:''});


    var local = true;
    var apiUrl = 'http://proj.ruppin.ac.il/bgroup11/prod/api/'
    if (local) {
        apiUrl = 'http://localhost:50664/api/'
    }


    const handleClose = () => {
        setOpen(false);
    };

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

        } else if (notification[index].Type === 'helpFromFriend') {
            
            try {
                const res = await fetch(apiUrl + 'HelpFromFriend/' + notification[index].HelpNum + '/', {
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'application/json; charset=UTF-8',
                    })
                })
                let result = await res.json();
                console.log("GetHelpFromFriend:", result);
                let counter = 0;
                let str = '';
                for (let i = 0; i < result.Solution.length; i++) {
                    counter++;
                    str += '_ ';
                }
                str += '(' + counter + ')';
                setHelpFromFriend({
                    ...result,
                    counter: str
                });
                setOpen(true);
            } catch (error) {
                console.log("ErrorHelpFromFriend", error);
            }
        }
    }

    const UpdateHasDoneNotifications = async (index) => {
        if (notification[index].Type === 'shareCross') {
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
        else if (notification[index].Type === 'helpFromFriend') {

        }
    }

    const DeleteNotification = async (SerialNum) => {
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
                    const newList = notification.filter((item) => item.SerialNum !== SerialNum);
                    setNotification(newList);
                    try {
                        fetch(apiUrl + 'Notifications/' + SerialNum + '/', {
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

    const CheckAnswer = (event) => {
        setAnswer(...answer, event.target.value);
        // if (answer !== helpFromFriend.Word) {
        //     alert('תשובה לא נכונה');
        // }
    }


    return (
        <div>
            <Header className={classes.title} title={'התראות'} goBack={'/HomePage'} />
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
                                            {sc.Text}
                                        </React.Fragment>
                                    }
                                />
                                <ClearIcon onClick={() => DeleteNotification(sc.SerialNum)} />
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

            <Dialog open={open} onClose={handleClose} className={classes.dialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">באתי לעזרת חבר</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {helpFromFriend.FirstName + ' ' + helpFromFriend.LastName + ' מבקש/ת עזרה בפתרון: '}
                        <br />
                        <b style={{ color: 'black' }}>{helpFromFriend.Solution + helpFromFriend.counter}</b>

                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="outlined-basic"
                        label="הזן תשובה"
                        variant="outlined"
                        fullWidth
                        onChange={CheckAnswer}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        שלח תשובה
          </Button>
                    <Button onClick={handleClose} color="primary">
                        לא יודע
          </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}

export default withRouter(Notification);