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
        fontFamily: 'Assistant',
        maxHeight: 28
    },
    buttonAnswer: {
        marginBottom: '15px',
        marginTop: '5px',

        fontFamily: 'Assistant',
        maxHeight: 28
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
    const [answer, setAnswer] = useState({});
    const [openA, setOpenA] = useState(false);

    const [userAnswer, setUserAnswer] = useState({});


    var local = false;
    var apiUrl = 'http://proj.ruppin.ac.il/bgroup11/prod/api/'
    if (local) {
        apiUrl = 'http://localhost:50664/api/'
    };


    const handleClose = () => {
        setOpen(false);
    };

    const handleAClose = () => {
        setOpenA(false);
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

        } else if (notification[index].Type === 'helpFromFriend' && notification[index].Text === 'מבקש/ת עזרה בהגדרה ') {
            try {
                const res = await fetch(apiUrl + 'HelpFromFriend/' + notification[index].HelpNum + '/', {
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'application/json; charset=UTF-8',
                    })
                })
                let result = await res.json();
                console.log("GetHelpFromFriend:", result);
                var counter = 0;
                let str = '';
                for (let i = 0; i < result.Word.length; i++) {
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
        } else if (notification[index].Type === 'competition' && notification[index].Text === 'הזמין/ה אותך לתחרות ') {
            try {
                const res = await fetch(apiUrl + 'Competitions/User2/' + notification[index].ContestNum + '/', {
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'application/json; charset=UTF-8',
                    })
                })
                let result = await res.json();
                console.log("GetCompetitionsUser2:", result);
                history.push('/CompetitionUser2', { isCompetitionUser2: true, competitionUser2: result });
            } catch (error) {
                console.log("ErrorGetCompetitionsUser2", error);
            }
        }
    };

    const UpdateHasDoneNotifications = async (index) => {
        if (notification[index].Type === 'shareCross') {
            try {
                fetch(apiUrl + 'Notifications/HasDone/SharedCross/' + notification[index].CrossNum + '/', {
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
            try {
                fetch(apiUrl + 'Notifications/HasDone/HelpFromFriend/' + notification[index].HelpNum + '/', {
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
        else if (notification[index].Type === 'competition') {
            try {
                fetch(apiUrl + 'Notifications/HasDone/Competitions/' + notification[index].ContestNum + '/', {
                    method: 'PUT',
                    body: '',
                    headers: new Headers({
                        'Content-Type': 'application/json; charset=UTF-8',
                    })
                })
                setOpen(false);
            } catch (error) {
                console.log('ErrorUpdateHasDoneNotification', error);
            }
        }
    };

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
    };

    const UpdateAnswer = (event) => {
        setAnswer({ ...answer, answer: event.target.value });
        console.log(answer.answer);
    };

    const SendNotificationAnswer = async (event) => {
        event.preventDefault();
        var sta = {
            SendFrom: user.Mail,
            SendToGet: helpFromFriend.SendFrom,
            Type: 'helpFromFriend',
            Text: 'בא/ה לעזרת חבר ',
            HasDone: 0,
            HelpNum: helpFromFriend.HelpNum,
            HelpFromFriend: { UserAnswer: answer.answer }
        }
        try {
            const res = await fetch(apiUrl + 'Notifications/', {
                method: 'POST',
                body: JSON.stringify(sta),
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            const result = await res.json();
            console.log('HelpAnswer', result);
            setOpen(false);
        } catch (error) {
            console.log('ErrorSendNotificationAnswer', error);

        }
    };

    const SendDontKnowNotification = async () => {
        var sta = {
            SendFrom: user.Mail,
            SendToGet: helpFromFriend.SendFrom,
            Type: 'helpFromFriend',
            Text: 'לא ידע/ה לענות על ההגדרה ששלחת ',
            HasDone: 1,
            HelpNum: helpFromFriend.HelpNum,
            HelpFromFriend: { UserAnswer: 'לא יודע/ת' }
        }
        try {
            const res = await fetch(apiUrl + 'Notifications/', {
                method: 'POST',
                body: JSON.stringify(sta),
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            const result = await res.json();
            console.log('HelpAnswer', result);
            setOpen(false);
        } catch (error) {
            console.log('ErrorSendNotificationAnswer', error);
        }
    };

    const GetAnswer = async (index) => {
        UpdateHasDoneNotifications(index);
        try {
            const res = await fetch(apiUrl + 'HelpFromFriend/' + notification[index].HelpNum + '/', {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            let result = await res.json();
            console.log("GetAnswerFromFriend:", result);
            await setUserAnswer({ ...userAnswer, userAnswer: result.UserAnswer, word: result.Solution });
            await setOpenA(true);
        } catch (error) {
            console.log("ErrorHelpFromFriend", error);
        }
    }


    return (
        <div>
            <Header className={classes.title} title={'התראות'} goBack={'/HomePage'} />

            <List className={classes.root}>
                {notification.map((sc, index) => {
                    return (
                        <div key={index} style={{ backgroundColor: !sc.HasDone ? '#ecf7f9' : 'white' }}>
                            <ListItem alignItems="flex-start" style={{ paddingBottom: '0px' }}>
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
                            {sc.Text === 'שיתף/ה אותך בתשבץ ' && <Button
                                variant="contained"
                                className={classes.button}
                                onClick={() => HandleNotification(index)}
                            >
                                פתור
                            </Button>}
                            {sc.Text === 'מבקש/ת עזרה בהגדרה ' && <Button
                                variant="contained"
                                className={classes.button}
                                onClick={() => HandleNotification(index)}
                            >
                                פתור
                            </Button>}
                            {sc.Text === 'בא/ה לעזרת חבר ' && <Button
                                variant="contained"
                                className={classes.buttonAnswer}
                                onClick={() => GetAnswer(index)}
                            >
                                צפה בתשובה
                                </Button>}
                            {sc.Text === 'לא ידע/ה לענות על ההגדרה ששלחת ' && <br />}
                            {sc.Text === 'הזמין/ה אותך לתחרות ' && <Button
                                variant="contained"
                                className={classes.button}
                                onClick={() => HandleNotification(index)}
                            >
                                התחל תחרות
                            </Button>}
                            <Divider />
                        </div>
                    )
                })}
            </List>

            <Dialog open={open} onClose={handleClose} className={classes.dialog} aria-labelledby="form-dialog-title">
                <form className={classes.form} noValidate onSubmit={SendNotificationAnswer} dir='rtl'>
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
                            onChange={UpdateAnswer}
                            variant="outlined"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            type="submit"
                            color="primary">
                            שלח תשובה
                    </Button>
                        <Button
                            onClick={SendDontKnowNotification}
                            color="primary">
                            לא יודע
          </Button>
                    </DialogActions>
                </form>
            </Dialog>
            <Dialog
                open={openA}
                onClose={handleAClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                style={{ textAlign: 'center' }}
            >
                <DialogTitle id="alert-dialog-title">{"באתי לעזרת חבר"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" style={{ color: 'black' }}>
                        <b> הגדרה:</b> {userAnswer.word},<b> תשובה:</b> {userAnswer.userAnswer}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAClose} color="primary">
                        אוקי
          </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}
export default withRouter(Notification);