import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        //maxWidth: '36ch',
        display: 'flex',
        //listStyle: 'none',
        //backgroundColor: theme.palette.background.paper,
        direction: 'rtl',
        
    },  
    list: {
        display: 'inline',
        textAlign: 'center',
      
    },
    ListItem: {
        width: '100%',
        display: 'inline',
        margin: theme.spacing(0),
        textAlign: 'center',
    },
    inline: {
        float: 'right',
        
    }

}));




export default function AlignItemsList() {
    const classes = useStyles();

    const [users, setUsers] = useState([]);
    let userList = [];
    let top5 = [];

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
                userList.push(result[i])
            }
            
        }
        catch (error) {
            console.log('ErrorGetUsersScore', error);
        }

        userList.sort((a, b) => (a.Score < b.Score) ? 1 : -1)

        for (let i = 0; i < 5; i++) {
            top5.push(userList[i]);      
        }       
        setUsers(top5);
        
    }

    return (
        <List className={classes.root}>
            {users.map((u, index) =>
                <ListItem key={index} className={classes.list}>
                    <ListItemAvatar className={classes.ListItem}>
                        <Avatar  alt={`Avatar n°${index + 1}`} src={u.Image} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={u.FirstName}
                        className={classes.inline}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    color="textPrimary"
                                    
                                >
                                </Typography>
                                {u.Score}
                            </React.Fragment>
                        }
                    />
                </ListItem>
            )}
        </List>
    );
}