import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Toolbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        direction: 'rtl'
    },
    toolBar: {
        marginTop: '0px',
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    button: {
        fontFamily: 'Calibri',
        fontSize: '16px',
        fontWeight: 'bolder',
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
        fontFamily: 'Calibri',
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
        backgroundColor: '#6699cc',
    },
    submit: {
        margin: theme.spacing(2, 0, 2),
        fontSize: 18,
        height: 56,
        backgroundColor: 'black',
        color: '#fff',
        position: '-webkit-sticky',
        bottom: '1px'
    },
    text: {
        textAlign: 'right'
    }
}));

const ContactsCompetition = () => {
    // const user = props.User;
    // const crossToSend = props.Cross; 

    const classes = useStyles();
    const history = useHistory();

    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [checked, setChecked] = useState([]);
    const [members, SetMembers] = useState([]);


    //Dialog functions
    useEffect(() => {
        setOpen(true);
        getAllUsers();
    });


    //Ajaxcall
    var local = false;
    var apiUrl = 'http://proj.ruppin.ac.il/bgroup11/prod/api/'
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
        history.push('/CompetitionCross', { sendTo: checked, competition: true});
    }

    const handleClose = () => {
        setOpen(false);
        history.push('/HomePage');
    };


    return (
        <div>
            <Dialog fullScreen open={open} onClose={handleClose} >
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
                <input placeholder="search" onChange={FilterSearch} />
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
                    התחל תחרות
            </Button>
            </Dialog>
        </div>
    
    );
}

export default ContactsCompetition;
