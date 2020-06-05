import React, { useContext, useState } from 'react';
import { makeStyles, Button } from '@material-ui/core';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
//Components
import Header from '../Components/Header';
import ToolBar from '../Components/ToolBar';
//Context Api
import { UserDetailsContext } from '../Contexts/UserDetailsContext';

const useStyles = makeStyles((theme) => ({

    root: {
        '& > *': {
            margin: theme.spacing(2),
            width: '34ch',
            height: '6ch'
        },

        marginTop: 35,

    },
    score: {
        fontSize: 16,
        fontWeight: 'bolder',
        textAlign: 'center',
        marginTop: 20,

    },
    submit: {
        fontSize: 16,
        height: 50,
        backgroundColor: 'black',
        color: '#fff',
        fontFamily: 'Tahoma'
    },

}));

const AddWord = () => {
    //ContextApi
    const { UserDetails } = useContext(UserDetailsContext);
    const user = UserDetails;
    
    const classes = useStyles();

    const [newWord, setNewWord] = useState();
    const [newSolution, setNewSolution] = useState();

    const AddNewWord = (event) => {
        setNewWord({ ...newWord, word: event.target.value })
    }

    const AddNewSolution = (event) => {
        setNewSolution({ ...newSolution, solution: event.target.value })
    }

    let local = false;
    let apiUrl = 'http://proj.ruppin.ac.il/bgroup11/prod/api/';
    if (local) {
        let apiUrl = 'http://localhost:50664/api/';
    }

    function PostWordToServer(){
        const addWord = {
            UserMail: user.Mail,
            WordKey: newWord + '-' + newSolution,
            NumOfLike: 0
        };
    
        try {
            fetch(apiUrl + 'AddWord/', {
                method: 'POST',
                body: JSON.stringify(addWord),
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            console.log('PostWordToDBSuccsses');
        } catch (error) {
            console.log('ErrorPostWordToDB', error);
        }
    
    }

   
    return (

        <div>
            <Header title={'הוסף הגדרה'} />
            <p className={classes.score}> הניקוד שלך: <MonetizationOnOutlinedIcon style={{ color: '#FFD700' }} /> {user.Score}</p>
            <form className={classes.root} noValidate autoComplete="off">
                <input type="text" name="word" placeholder="הגדרה" onChange={AddNewWord} />
                <br />
                <input type="text" name="solution" placeholder="פתרון" onChange={AddNewSolution} />
                <br />
                <Button
                    type="submit"
                    variant="contained"
                    onClick={PostWordToServer}
                    className={classes.submit}>
                    שלח לאישור
                    
            </Button>
            </form>
        </div>

    );
}

export default AddWord;
