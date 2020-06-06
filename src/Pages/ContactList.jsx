import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
//Search
import SearchStyle from '../StyleSheet/SearchStyle.css';
//Components
import Header from '../Components/Header';
//Context Api
import { UserDetailsContext } from '../Contexts/UserDetailsContext';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        direction: 'rtl',
        marginTop: 20,
    },
    inline: {
        margin: theme.spacing(2),
        textAlign: 'right'
    },
    checkBox: {
        //display: 'flex'
        // flexDirection: 'left',
        // right: '250px',
    },
    search: {
        width: '100%'
    }
}));


export default function CheckboxListSecondary() {
    //ContextApi
    const { UserDetails } = useContext(UserDetailsContext);
    const user = UserDetails;

    const classes = useStyles();
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

    const FilterUser = (e) => {

       setU(u.filter(item => {
        return item.toLowerCase().search(
            e.target.value.toLowerCase()
        ) !== -1;
    })) 
        console.log(u);
    }

    return (
        <div>
            <Header title={'רשימת משתתפים'} />
            <div id='content'></div>
            <input placeholder="חיפוש" onChange={FilterUser} />
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
        </div>
    );
}