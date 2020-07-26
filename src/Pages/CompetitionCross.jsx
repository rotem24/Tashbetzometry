import React, { useEffect, useState } from 'react';
import { makeStyles, Container, Toolbar } from '@material-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
//ContactsCompetition
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
//Components
import CrossData from '../Components/CrossData';
import Header from '../Components/Header';
import Timer from '../Components/Timer';


const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
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
        position: 'sticky',
        bottom: '1px'
    },
    text: {
        textAlign: 'right'
    }
}));

const CompetitionCross = () => {

    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();

    const sendFrom = location.state.user;

    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [checked, setChecked] = useState([]);
    const [members, SetMembers] = useState([]);
    const [cross, SetCross] = useState();
    const [num, setnum] = useState(getRandomInt(94, 152));
    let temp;

    useEffect(() => {
        getAllUsers();
    }, []);


    let local = false;
    let apiUrl = 'http://proj.ruppin.ac.il/bgroup11/prod/api/';
    if (local) {
        apiUrl = 'http://localhost:50664/api/';
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
            setOpen(true);
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

    const handleClose = () => {
        setOpen(false);
    };

    const IconClose = () => {
        setOpen(false);
        history.push('/HomePage');
    };

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const CreateCompetitionCross = async () => {
        try {
            const res = await fetch(apiUrl + "Competitions/" + num + "/", {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            let result = await res.json();
            console.log("competitionData:", result);
            SetCross(result);
            handleClose();
        } catch (error) {
            console.log('ErrorcompetitionData', error);
        }
    }

    var callbackFunction = (childData) => {
        var value = childData;
        console.log('value?', value);
    }

    return (
        <div>
            <div>
                <Dialog fullScreen open={open} onClose={handleClose} >
                    <AppBar className={classes.appBar}>
                        <Toolbar className={classes.toolBar2}>
                            <Typography variant="h6" className={classes.title}>
                                רשימת משתתפים
                        </Typography>
                            <IconButton edge="start" color="inherit" onClick={IconClose} aria-label="close">
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
                        onClick={CreateCompetitionCross}
                    >
                        התחל תחרות
            </Button>
                </Dialog>
            </div>
            <div>
                <Header title={'תשבץ תחרות'} goBack={'/HomePage'} />
                <Container component="main" maxWidth="xs">
                    <div className={classes.paper}>
                        {cross && <Timer SendTo={checked[0]} SendFrom={sendFrom} CrossNum={cross.ContestNum} />}
                        {cross && <CrossData Competition={true} CompetitionData={cross} parentCallback={callbackFunction} />}
                    </div>
                </Container>
            </div>
        </div>
    );
}
export default CompetitionCross;
