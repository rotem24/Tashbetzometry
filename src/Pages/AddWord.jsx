import React, { useContext, useState } from 'react';
import { makeStyles, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
//Components
import Header from '../Components/Header';
import swal from 'sweetalert';
//Context Api
import { UserDetailsContext } from '../Contexts/UserDetailsContext';

const useStyles = makeStyles((theme) => ({

    root: {
        '& > *': {
            margin: theme.spacing(2),
            width: '25ch',
            height: '4ch'
        },
        marginTop: 20, 
    },
    score: {
        fontSize: 18,
        marginTop: 30,
        float: 'right',
        marginRight: 20,
        fontFamily: 'Rubik'
    },
    submit: {
        width: 160,
        fontSize: 18,
        height: 50,
        backgroundColor: 'black',
        color: '#fff',
        fontFamily: 'Assistant'
    }
}));

const AddWord = () => {
    //ContextApi
    const { UserDetails } = useContext(UserDetailsContext);
    const user = UserDetails;
    const history = useHistory();

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

    

    const PostWordToServer = async (event) => {
        event.preventDefault();

        const addWord = {
            UserMail: user.Mail,
            WordKey: newWord.word + '-' + newSolution.solution,
            NumOfLike: 0
        };

        console.log(addWord);
         
        try {
            await fetch(apiUrl + 'AddWord/', {
                method: 'POST',
                body: JSON.stringify(addWord),
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })

            })
            console.log('PostAddWordToDBSuccsses');
            swal({
                text:'ההגדרה נשלחה לפורום ותוסף למאגר לאחר 10 לייקים',
                button: {
                    text: "המשך"
                },
            })
            .then((value) => {
                if (value){
                history.push('/AddWord');
                }
            });
            
        } catch (error) {
            console.log('ErrorPostAddWordToDB', error);
        }   
    }  
   
    return (

        <div>
            <Header title={'הוסף הגדרה'}  goBack={'/HomePage'}/>
            <p className={classes.score}>ניקוד: <MonetizationOnOutlinedIcon style={{ color: '#FFD700' }} /> {user.Score}</p>
            <br/>
            <br />
            <form className={classes.root} noValidate autoComplete="off" onSubmit={PostWordToServer}>
                <input type="text" name="word" placeholder="הגדרה" onChange={AddNewWord} />
                <br />
                <input type="text" name="solution" placeholder="פתרון" onChange={AddNewSolution} />
                <br />
                <Button
                    type="submit"
                    variant="contained"
                    className={classes.submit}>
                    שלח לאישור
                   
            </Button>
            </form>
        </div>

    );
}

export default AddWord;
