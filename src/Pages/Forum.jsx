import React, { useContext, useEffect, useState } from 'react';
import { makeStyles, Divider } from '@material-ui/core';
//Components
import Header from '../Components/Header';
import Top5Users from '../Components/Top5Users';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';

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
        //maxWidth: '36ch',
        //display: 'flex',
        //listStyle: 'none',
        backgroundColor: theme.palette.background.paper,
        direction: 'rtl',
        
    },
    ListItem: {
        margin: theme.spacing(1),
        textAlign: 'right',

    },
    text:{
        fontFamily: 'Tahoma'
    },
    like: {
       float: 'left', 
    },

}));

const Forum = () => {
    //ContextApi
    const { UserDetails } = useContext(UserDetailsContext);
    const user = UserDetails;

    const classes = useStyles();

    const [words, setWords] = useState([]);
    const [like, setLike] = useState([]);
    
    let wordsToAdd = [];
    let fiveWordsToAdd = [];

    useEffect(() => {
        getAllAddWord();
    }, []);

    let local = false;
    let apiUrl = 'http://proj.ruppin.ac.il/bgroup11/prod/api/';
    if (local) {
        let apiUrl = 'http://localhost:50664/api/';
    }

    const getAllAddWord = async () => {

        try {
            const res = await fetch(apiUrl + 'AddWord/', {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            let result = await res.json();
            console.log("result:", result);
            for (let i = 0; i < result.length; i++) {
                wordsToAdd.push(result[i])
            }
            

        } catch (error) {
            console.log('ErrorGetAddWords', error);
        }

        for (let i = 0; i < 5; i++) {
            fiveWordsToAdd.push(wordsToAdd[i]);
        }
        setWords(wordsToAdd);
        for (let i = 0; i < wordsToAdd.length; i++) {
            setLike(wordsToAdd[i].NumOfLike);
        } 
        console.log(like);
    }
    
    const PutLike = async (index) => {
       
        const l = words[index].NumOfLike + 1;
        setLike(l)
       
        console.log(words[index].NumOfLike + 1);
        
        const ad = {
            WordKey: words[index].WordKey,
            NumOfLike: words[index].NumOfLike + 1
        };
        

        try {
            await fetch(apiUrl + 'AddWord/AddLike', {
                method: 'PUT',
                body: JSON.stringify(ad),
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            console.log("UpdateLikeSuccsses"); 
          
            
        } catch (error) {
            console.log('ErrorUpdateLike', error);   
        }

    }

    return (
        <div>
            <Header className={classes.title} title={'פורום'} />
            <Top5Users />
            <Divider variant="middle" />
            <List className={classes.root}>
                {words.map((u, index) =>
                    <ListItem key={index} className={classes.ListItem}>
                        <ListItemText className={classes.text}>
                        {u.FirstName} {u.LastName} מציע/ה להוסיף:<br/><br/>{u.WordKey}
                        <p className={classes.like} ><FavoriteOutlinedIcon onClick={() => PutLike(index)}/> {u.NumOfLike}</p>
                       
                        </ListItemText>
                    </ListItem>
                )}
            </List>

        </div>
    );
}
export default Forum;
