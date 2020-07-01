import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
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

    const notification = location.state.params;    
    const [sharedCross, setSharedCross] = useState();


    var local = true;
    var apiUrl = 'http://proj.ruppin.ac.il/bgroup11/prod/api/'
    if (local) {
      apiUrl = 'http://localhost:50664/api/'
    }

    useEffect(async () => {
        for (let index = 0; index < notification.length; index++) {
            if (notification[index].Type === "shareCross") {
                await GetSharedCross();
                break;
            }          
        }
    }, []);

    const GetSharedCross = async () => {
        try {
            const res = await fetch(apiUrl + 'SharedCross/' + user.Mail + '/', {
              method: 'GET',
              headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
              })
            })
            let result = await res.json();
            console.log("SharedCross:",result);
            setSharedCross(result);         
            
          } catch (error) {
            console.log("ErrorSharedCross", error);
          }
    }


    const GoToShareCross = (index) => {
        history.push('/NewCross', { value: true, cross: sharedCross[index] });
    }

    return (
        <div>
            <Header className={classes.title} title={'התראות'} />
            <List className={classes.root}>
                {notification.map((sc, index) => {
                    return (
                        <span>
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
                                <ClearIcon />
                            </ListItem>
                            <Button
                            variant="contained"
                            className={classes.button}
                            onClick={() => GoToShareCross(index)}
                            >
                                טפל
                                </Button>
                            <Divider />
                        </span>
                    )})}
            </List>
        </div>
    );
}

export default Notification;