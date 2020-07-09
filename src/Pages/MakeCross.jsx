import React, { useContext, useEffect, useState } from 'react';
import { makeStyles, Divider, TextField,Button } from '@material-ui/core';

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
    },
    input: {
        height: '100px'
    },
    Warning:{
        color: 'red'
    }
}));

const HardWords = () => {
    //ContextApi
    const { UserDetails } = useContext(UserDetailsContext);
    const user = UserDetails;
    const [WordsFCross, setWordsFCross] = useState();

    const classes = useStyles();
    useEffect(() => {
        //AddWordsTomakeCross();

    }, []);


    let local = false;
    let apiUrl = 'http://proj.ruppin.ac.il/bgroup11/prod/api/';
    if (local) {
        apiUrl = 'http://localhost:50664/api/';
    }

   
    const SaveIputWords = (event) => {
        setWordsFCross({ ...WordsFCross, WordsFCross: event.target.value })
        console.log("words:", WordsFCross);
        
        
    }

    const AddWordsTomakeCross = async () => {

    }
    return (
        <div>
            <Header title={'צור תשבץ'}/>
            <p>הכנס את רשימת המילים אשר תרצה שיופיעו בתשבץ</p>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={AddWordsTomakeCross}>
                <input type="text" name="word" placeholder="רשימת מילים" onChange={SaveIputWords} />
                <br />
                
                    <Button
                    type="submit"
                    variant="contained"
                    className={classes.submit}>
                    שלח לאישור
                   
            </Button>
            </form>
            <p className={classes.Warning}>שים לב, עליך להזין מעל 100 מילים על מנת שתשבצומטרי יוכל להרכיב עבורך תשבץ</p>

        </div>
    )
}
export default HardWords;
