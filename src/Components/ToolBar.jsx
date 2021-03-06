import React, { useState } from 'react';
import { makeStyles, Toolbar } from '@material-ui/core';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import ShareSharpIcon from '@material-ui/icons/ShareSharp';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import swal from 'sweetalert';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        direction: 'rtl'
    },
    toolBar: {
        marginTop: '0px',
        marginRight: 'auto',
        marginLeft: 'auto',
        fontFamily: 'Rubik',
        fontSize: '18px',
    },
    button: {
        fontFamily: 'Rubik',
        fontSize: '18px',
        position: 'absolute',
        left: '15px'
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
        textAlign: 'right',
        flexGrow: 1,
        fontFamily: 'Assistant',
        fontSize: 25,
        fontWeight: 'bolder',
    },
    inline: {
        margin: theme.spacing(2),
        textAlign: 'right',
    },
    search: {
        width: '100%'
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    toolBar2: {
        backgroundColor: localStorage.getItem("color"),
    },
    submit: {
        fontSize: 18,
        backgroundColor: 'black',
        color: '#fff',
        width: '100%',
        height: '56px',
        position: 'fixed',
        bottom: 0,   
    },
    text: {
        textAlign: 'right'
    },
    sendIcon: {
       marginBottom: 5 
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ToolBar = (props) => {

    const user = props.User;
    const crossToSend = props.Cross; 

    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [checked, setChecked] = useState([]);
    const [members, SetMembers] = useState([]);
  

    //Dialog functions
    const handleClickOpen = () => {
        setOpen(true);
        getAllUsers();
    };
    const handleClose = () => {
        setOpen(false);
    };

    //Ajaxcall
    var local = false;
    var apiUrl = 'http://proj.ruppin.ac.il/bgroup11/prod/api/';
    if (local) {
        apiUrl = 'http://localhost:50664/api/'
    }

    const getAllUsers = async () => {
        try {
            const res = await fetch('http://proj.ruppin.ac.il/bgroup11/prod/api/User/Users', {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            let result = await res.json();
            setUsers(result);
            SetMembers(result);
        } catch (error) {
            console.log('ErrorGetUsersList', error);
        }
    }

    //Users list function
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    //Search function
    const FilterSearch = (event) => {
        var updatedList = users;
        console.log("updatedList", updatedList)
        updatedList = updatedList.filter((item) => {
            return item.FirstName.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
        });
        SetMembers(updatedList);
    }

    const SendCross = async () => {
        var cts = {
            SendFrom: user.Mail,
            SendTo: checked,
            Grid: JSON.stringify(crossToSend.Grid),
            Keys: JSON.stringify(crossToSend.Keys),
            Words: JSON.stringify(crossToSend.Words),
            Clues: JSON.stringify(crossToSend.Clues),
            Legend: JSON.stringify(crossToSend.Legend),
            Notification: {
                Type: 'shareCross',
                Text: 'שיתף/ה אותך בתשבץ ',
               // Date: moment().format("DD-MM-YYYY HH:mm:ss")
            }
        };

        try {
            const res = await fetch(apiUrl + 'SharedCross/', {
                method: 'POST',
                body: JSON.stringify(cts),
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            if (res.ok) {
                console.log('PostSendCrossSuccsses');
                swal({
                    text: 'תשבץ נשלח בהצלחה',
                    button: {
                        text: "המשך משחק"
                    },
                })
                setOpen(false);
            } else {
                swal({
                    title: "תשבץ לא נשלח",
                    text: "נסה שנית מאוחר יותר",
                    icon: "error",
                    button: "חזור למשחק"
                });
                setOpen(false);
            }
        } catch (error) {
            console.log('ErrorPostSendCross', error);
            swal({
                title: "תשבץ לא נשלח",
                text: "נסה שנית מאוחר יותר",
                icon: "error",
                button: "חזור למשחק"
            });
            setOpen(false);
        }
    }


    return (
        <div className={classes.root}>
            <Toolbar className={classes.toolBar}><MonetizationOnOutlinedIcon style={{ color: '#FFD700', paddingLeft: 3}} />{user.Score}
                <Button className={classes.button} onClick={handleClickOpen}>
                    <ShareSharpIcon className={classes.sendIcon} onClick={handleClickOpen} />
                     שתף חבר
                    </Button>
            </Toolbar>

            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar className={classes.toolBar2}>
                        <Typography variant="h6" className={classes.title}>
                            רשימת משתתפים
                        </Typography>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <input placeholder="חפש משתמש" onChange={FilterSearch} />
                <List dense className={classes.root}>
                    {members.map((value) => {
                        const labelId = `checkbox-list-secondary-label-${value}`;
                        return (
                            <ListItem key={value.Mail} button>
                                <ListItemAvatar>
                                    <Avatar
                                        alt={`Avatar n°${value + 1}`}
                                        src={value.Image}
                                    />
                                </ListItemAvatar>
                                <ListItemText className={classes.text} id={labelId} primary={`${value.FirstName + ' ' + value.LastName}`} />
                                <Checkbox
                                    edge="end"
                                    onChange={handleToggle(value.Mail)}
                                    checked={checked.indexOf(value.Mail) !== -1}
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItem>
                        )
                    })}
                </List>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className={classes.submit}
                    onClick={SendCross}
                >
                    שלח
            </Button>
            </Dialog>
        </div>
    );
}
export default ToolBar;
