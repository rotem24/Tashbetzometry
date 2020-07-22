import React, { useEffect, useState } from 'react';
import { makeStyles, TextField,Button } from '@material-ui/core';
import { useHistory, withRouter } from 'react-router-dom';
//Style
import '../StyleSheet/NotificationStyle.css'
//Components
import Header from '../Components/Header';

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
        minWidth: '150px',
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
    }
    
    const AddWordsTomakeCross = () => {
        var wordstemp=[];
        var words=[];
        var clues=[];
        var key=[];
        var wordsNoSpace=[];
        var wordsSplited = WordsFCross.WordsFCross.toString().split("\n");
        console.log("wordsSplited:", wordsSplited);

        for (let i = 0; i < wordsSplited.length; i++) {
            key=wordsSplited[i].split("-");
            wordstemp[i]=key[0];
            clues[i]=key[1];
            
        }
       
        for (let i = 0; i < wordstemp.length; i++) {
            var oneword="";
            wordsNoSpace = wordstemp[i].split(" ");
            for (let k = 0; k < wordsNoSpace.length; k++) {
                oneword+=wordsNoSpace[k];
                
            }
            
            for (let j = 0; j < oneword.length; j++) {
               var str="";
                    if (oneword[j] === "ף") {
                        str = oneword.replace("ף", "פ");
                        oneword = str;
                    }
                    else if (oneword[j] === "ך") {
                        str = oneword.replace("ך", "כ");
                        oneword = str;
                    }
                    else if (oneword[j] === "ן") {
                        str = oneword.replace("ן", "נ");
                        oneword = str;
                    }
                    else if (oneword[j] === "ם") {
                        str = oneword.replace("ם", "מ");
                        oneword = str;
                    }
                    else if (oneword[j] === "ץ") {
                        str = oneword.replace("ץ", "צ");
                        oneword = str;
                    }
                    else {
                        str = oneword;
                    }
               
                }
                words.push(str);
        }
     
        
        const dataForUserCross={
            words:words,
            clues:clues,
            keys:wordsSplited,
        } 
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
                <br/> <br/>
            </form>
            <Button className={classes.submit} onClick={AddWordsTomakeCross}>אישור</Button>
            <br/><br/>
            <p className={classes.Warning}>שים לב, עליך להזין 10 מילים ומעלה על מנת שתשבצומטרי יוכל להרכיב עבורך תשבץ</p>
        </div>
    )
}
export default withRouter(HardWords);
