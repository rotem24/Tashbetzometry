import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Toolbar } from '@material-ui/core';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import ShareSharpIcon from '@material-ui/icons/ShareSharp';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: 'Calibri',
        fontSize: '13px',
        fontWeight: 'bolder',
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        direction: 'rtl',
        marginTop: 20,
    },
    toolBar: {
        marginRight: 'auto',
        marginLeft: 'auto',

    },
    sendIcon: {
        marginRight: 220,
    },
    button: {
        fontFamily: 'Calibri',
        fontSize: '13px',
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
    },
    inline: {
        margin: theme.spacing(2),
        textAlign: 'right'
    },
    search: {
        width: '100%'
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    extendedIcon: {
        marginRight: theme.spacing(1),

    },

}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ToolBar = (props) => {

    const user = props.User;

    const classes = useStyles();
    const history = useHistory();
    const [open, setOpen] = React.useState(false);

    const GoToContact = () => {
        history.push('/ContactList')
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const [users, setUsers] = useState([]);
    const [checked, setChecked] = React.useState([1]);
    const [u, setU] = useState([]);

    let userList = [];

    useEffect(() => {
        getAllUsers();
    }, []);

    var local = false;
    var apiUrl = 'http://proj.ruppin.ac.il/bgroup11/prod/api/'
    if (local) {
        apiUrl = 'http://localhost:50664/api/'
    }

    const getAllUsers = async () => {
        try {
            const res = await fetch(apiUrl + 'User/Users', {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            let result = await res.json();
            for (let i = 0; i < result.length; i++) {
                userList.push(result[i]);
            }
            setUsers(userList);
            setU(userList)
            console.log("users:", users);
        } catch (error) {
            console.log('ErrorGetUsersList', error);
        }
    }

    const FilterUser = (e) => {

        setU(u.filter(item => {
            return item.toLowerCase().search(
                e.target.value.toLowerCase()
            ) !== -1;
        }))
        console.log(u);
    }

    const handleToggle = (users) => () => {
        const currentIndex = checked.indexOf(users);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(users);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    return (
        <div className={classes.root}>
            <Toolbar className={classes.toolBar}><MonetizationOnOutlinedIcon style={{ color: '#FFD700', paddingLeft: 3 }} />{user.Score}
                <Button className={classes.button}>
                    <ShareSharpIcon className={classes.sendIcon} onClick={handleClickOpen} />
                     שתף חבר
                    </Button>
            </Toolbar>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            רשימת משתתפים
            </Typography>
                    </Toolbar>
                </AppBar>
                <List dense className={classes.root}>
                    {u.map((u, index) => {
                        const labelId = `checkbox-list-secondary-label-${index}`;
                        return (
                            <ListItem key={index} button>
                                <ListItemSecondaryAction>
                                    <Checkbox className={classes.checkBox}
                                        edge="end"
                                        onChange={handleToggle(index)}
                                        checked={checked.indexOf(index) !== -1}
                                        inputProps={{ 'aria-labelledby': labelId }}
                                        className={classes.checkBox}
                                    />
                                </ListItemSecondaryAction>
                                <ListItemAvatar>
                                    <Avatar
                                        alt={`Avatar n°${index + 1}`}
                                        src={u.Image}
                                    />
                                </ListItemAvatar>
                                <ListItemText className={classes.inline} id={labelId} primary={u.FirstName + ' ' + u.LastName} />
                            </ListItem>
                        );
                    })}
                </List>
            </Dialog>
        </div>
    );
}
export default ToolBar;
