import React, { useContext, useState } from 'react';
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
import NotificationStyle from '../StyleSheet/NotificationStyle.css'
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
}));

const Notification = () => {
    //ContextApi
    const { UserDetails } = useContext(UserDetailsContext);
    const user = UserDetails;

    const classes = useStyles();
    const location = useLocation();

    const [sharedCross, setSharedCross] = useState(location.state.params);


    return (
        <div>
            <Header className={classes.title} title={'התראות'} />
            <List className={classes.root}>
                {sharedCross.map((sc, index) => {
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
                            <Button variant="contained">טפל</Button>
                            <Divider />
                        </span>
                    )
                })}
            </List>
        </div>
    );
}

export default Notification;