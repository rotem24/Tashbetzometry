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
        borderBottom: '1px solid #a7b0ab',
        borderTop: '1px solid #a7b0ab'
    },
    text: {
        fontFamily: 'Tahoma',

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
    const [diffcultWord, setdiffcultWord] = useState([]);

    let wordsToAdd = [];
    let wordsup10 = [];
    let fiveWordsToAdd = [];
    let nums = [];
    var num = 0;

    useEffect(() => {
        deleteUpTenFromdata();
        getAllAddWord();
        getDifficultWord();
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
            console.log("suggestWords:", result);

            for (let i = 0; i < result.length; i++) {
                if (result[i].NumOfLike >= 10) {
                    wordsup10.push(result[i]);
                    continue;
                }
                else {
                    wordsToAdd.push(result[i])
                }
            }
            

        } catch (error) {
            console.log('ErrorGetAddWords', error);
        }

        setWords(wordsToAdd);

        for (let i = 0; i < wordsToAdd.length; i++) {
            setLike(wordsToAdd[i].NumOfLike);
        }
        console.log(like);
    }
    const getDifficultWord = async () => {

        try {
            const res = await fetch(apiUrl + 'Level/easy', {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            let result = await res.json();
            setdiffcultWord(result[0].KeyWord);



        } catch (error) {
            console.log('ErrorGetAddWords', error);
        }
    }
    const deleteUpTenFromdata = async () => {
        try {
            await fetch(apiUrl + 'AddWord/deletTen', {
                method: 'PUT',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            console.log("wordsover10likesdeleted");

        } catch (error) {
            console.log('Errordeleteup10likes', error);
        }
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
            <div>מילת השבוע:<h5>{diffcultWord}</h5></div>
            <List className={classes.root}>
                {words.map((u, index) =>
                    <ListItem key={index} className={classes.ListItem}>
                        <ListItemText className={classes.text}>
                            {u.FirstName} {u.LastName} מציע/ה להוסיף:<br /><br />{u.WordKey}
                            <p className={classes.like} ><FavoriteOutlinedIcon onClick={() => PutLike(index)} /> {u.NumOfLike}</p>

                        </ListItemText>
                    </ListItem>
                )}
            </List>

        </div>
    );
}
export default Forum;
