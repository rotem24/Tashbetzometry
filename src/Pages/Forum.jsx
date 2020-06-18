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
    root1: {
        width: '100%',
        //maxWidth: 360,
        textAlign: 'right',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 380,


    },
    listSection: {
        backgroundColor: 'inherit',

    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,

    },
    text: {
        //fontFamily: 'Tahoma',
        textAlign: 'right',
    },
    like: {
        float: 'left',

    },
    top5: {
        float: 'right',
        marginRight: 15,
        marginTop: 10
    },


}));

const Forum = () => {
    //ContextApi
    const { UserDetails } = useContext(UserDetailsContext);
    const user = UserDetails;

    const classes = useStyles();

    let wordsToAdd = [];
    let wordsup10 = [];

    const [words, setWords] = useState([]);
    const [like, setLike] = useState([]);
    const [diffcultWord, setdiffcultWord] = useState([]);


    useEffect(() => {
        deleteUpTenFromdata();
        getAllAddWord();
        getDifficultWord();
    }, [like]);



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
           

            for (let i = 0; i < result.length; i++) {
                if (result[i].NumOfLike >= 10) {
                    wordsup10.push(result[i]);
                    continue;
                }
                else {
                    wordsToAdd.unshift(result[i])
                }
            }


        } catch (error) {
            console.log('ErrorGetAddWords', error);
        }

        setWords(wordsToAdd);
      

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

       setLike(words[index].NumOfLike + 1);

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
            <b className={classes.top5}>חמשת המובילים</b>
            <Top5Users />
            <Divider variant="middle" />
            <br />
            <div>מילת השבוע:<h5>{diffcultWord}</h5></div>
            <br />
            <List className={classes.root1} subheader={<li />}>
                {words.map((u, index) => (
                    <li key={index} className={classes.listSection}>
                        <ul className={classes.ul}>
                            <Divider variant="middle" />
                            {[0].map((wordsToAdd) => (
                                <ListItem key={index}>
                                    <ListItemText className={classes.text}>
                                        {u.FirstName} {u.LastName} מציע/ה להוסיף:<br /><br />{u.WordKey}
                                        <p className={classes.like} ><FavoriteOutlinedIcon onClick={() => PutLike(index)} /> {u.NumOfLike}</p>
                                    </ListItemText>
                                </ListItem>
                            ))}
                        </ul>
                    </li>
                ))}
            </List>
        </div>
    );
}
export default Forum;
