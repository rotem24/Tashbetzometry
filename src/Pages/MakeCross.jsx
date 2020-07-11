import React, { useContext, useEffect, useState } from 'react';
import { makeStyles, Divider, TextField,Button } from '@material-ui/core';
import { useHistory, withRouter } from 'react-router-dom';
//Style
import '../StyleSheet/NotificationStyle.css'
//Components
import Header from '../Components/Header';
//Context Api
import { UserDetailsContext } from '../Contexts/UserDetailsContext';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
        fontFamily: 'Suez One',
        fontSize: 30,
        fontWeight: 'bolder',
    },
    root: {
        width: '100%',
        //backgroundColor: theme.palette.background.paper,
        fontSize: 18,
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
    },
    submit: {
        fontSize: 16,
        height: 50,
        backgroundColor: 'black',
        color: '#fff',
        fontFamily: 'Tahoma'
    },
    note: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    list: {
        width: '60%',
        backgroundColor: theme.palette.background.paper,
        color: ' #b5b0b0 '
      
    }
}));

const HardWords = () => {
    //ContextApi
    const { UserDetails } = useContext(UserDetailsContext);
    const user = UserDetails;
    const [WordsFCross, setWordsFCross] = useState();
    const history = useHistory();

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
    
    const AddWordsTomakeCross = () => {
        var words=[];
        var clues=[];
        var keywords=[];
        var key=[];
        var wordsSplited = WordsFCross.WordsFCross.toString().split("\n");
        console.log("wordsSplited:", wordsSplited);

        for (let i = 0; i < wordsSplited.length; i++) {
            key=wordsSplited[i].split("-");
            words[i]=key[0];
            clues[i]=key[1];
        }
     
        
        const dataForUserCross={
            words:words,
            clues:clues,
            keyWords:wordsSplited,
        }
        console.log("data:",dataForUserCross);
        
        history.push('/NewCross', { value: true, data: dataForUserCross })
    }

  
    return (
        <div>
            <Header title={'צור תשבץ'}  goBack={'/HomePage'}/>
            <br/>
            <p>הכנס את רשימת המילים אשר תרצה שיופיעו בתשבץ</p>
     
            <form className={classes.root} noValidate autoComplete="off" onSubmit={AddWordsTomakeCross}>
            <p>רשימת מילים</p>
            <TextField
                id="outlined-multiline-static"
                label="הגדרה-פתרון
                הגדרה-פתרון
                הגדרה-פתרון"
                multiline
                rows={10}
                variant="outlined"
                onChange={SaveIputWords}
                className={classes.list}
             />
                <br /> <br />
                
                <Button
                    type="submit"
                    variant="contained"
                    className={classes.submit}>
                    שלח לאישור
                   
            </Button>
            </form>
            <Button onClick={AddWordsTomakeCross}>אישור</Button>
            <p className={classes.Warning}>שים לב, עליך להזין מעל 100 מילים על מנת שתשבצומטרי יוכל להרכיב עבורך תשבץ</p>

        </div>
    )
}
export default withRouter(HardWords);
