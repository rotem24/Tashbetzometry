import React, { useState, useEffect, useContext } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import $ from 'jquery';
import { Collapse } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import swal from 'sweetalert';
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";
//FriendHelp
import { makeStyles, Toolbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import Slide from '@material-ui/core/Slide';
//Components
import { Crossword } from './CrossWord';
import ToolBar from '../Components/ToolBar';
//StyleSheet
import '../StyleSheet/CrossStyle.css';
//ContextApi
import { UserDetailsContext } from '../Contexts/UserDetailsContext';


const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
        textAlign: 'right',
        flexGrow: 1,
        fontFamily: 'Calibri',
        fontSize: 25,
        fontWeight: 'bolder',
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    toolBar2: {
        backgroundColor: localStorage.getItem("color"),
    },
    submit: {
        fontSize: 18,
        backgroundColor: 'black',
        color: '#fff',
        width: '100%',
        height: '56px',
        position: 'fixed',
        bottom: 0,
    },
    text: {
        textAlign: 'right'
    }
}));

const override = css`
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -50px;
    margin-left: -50px;
    width: 100px;
    height: 100px;
`;

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function CrossData(props) {

    const classes = useStyles();
    const history = useHistory();

    //ContextApi
    const { UserDetails, SetUserDetails } = useContext(UserDetailsContext);

    var isLastCross = props.IsLastCross;
    const isSharedCrossUser = props.IsSharedCross;
    const isSharedCross = props.IsShareCross;
    const isCreate = props.IsCreateCross;
    const CreateCrossData = props.CreateCrossData
    const sharedCrossUser = props.SharedCrossData;
    const sharedCross = props.SharedCross;
    const level = props.Level;
    const dataForUserCross = props.DataForUserCross
    const isMakeCross = props.IsMakeCross;
    const isCompetition = props.Competition;
    const comptitionData = props.CompetitionData;
    const isCompetitionUser2 = props.IsCompetitionUser2;
    const competitionUser2 = props.CompetitionUser2;


    const [user, setUser] = useState(UserDetails);
    const [open, setOpen] = useState(false);
    const [crossword, setCrossword] = useState([]);
    const [clue, setClue] = useState({ "across": "", "down": "" });
    const [crossToSend, setCrossToSend] = useState([]);
    const [help, setHelp] = useState();
    const [openDialog, setOpenDialog] = useState(false);
    const [users, setUsers] = useState([]);
    const [checked, setChecked] = useState([]);
    const [members, SetMembers] = useState([]);
    const [loading, setLoading] = useState();
    const [toolbar, setToolbar] = useState();
    const [reload, setReload] = useState(true);

    var keys = [];
    var words = [];
    var clues = [];
    var pointer = 0;
    var legend;

    //UsercreateCrossArray
    var makeKeys = [];
    var makeWords = [];
    var makeClues = [];

    useEffect(() => {
        setLoading(true);
        setToolbar(false);
        if (isLastCross) {
            localStorage.countWords = JSON.parse(localStorage.getItem("countWords"));
            localStorage.countAnswer = JSON.parse(localStorage.getItem("countAnswer"));
        } else if (isSharedCross || isMakeCross || isSharedCrossUser || isCreate || isCompetition || isCompetitionUser2) {
            localStorage.setItem("countAnswer", 0);
            localStorage.setItem("countWords", 0);
        } else {
            localStorage.setItem("countAnswer", 0);
            localStorage.setItem("countWords", 0);
        }
        if (isMakeCross) {
            CreateCross(dataForUserCross);
        }
        else {
            GetWordsFromDB();
        }
        $("#clues").hide();
        $('#answer-form').hide();

    }, [reload]);

    var local = false;
    var apiUrl = 'http://proj.ruppin.ac.il/bgroup11/prod/api/'
    if (local) {
        apiUrl = 'http://localhost:50664/api/'
    }

    //GetRandomWords
    //GetLevelForGame - הפעלת הפונקציה
    const GetWordsFromDB = async () => {
        try {
            const res = await fetch(apiUrl + 'Words/', {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            let result = await res.json();
            console.log("Random:", result);

            for (var i = 0; i < result.length; i++) {
                keys[pointer] = result[i].Key;
                words[pointer] = result[i].Word;
                clues[pointer] = result[i].Clue;
                pointer++;
            }
            // הבאת מילים קשות לפי רמות קושי
            GetLevelFromDB();

        } catch (error) {
            console.log('ErrorGetRandomWords', error);
        }
    }

    //GetLevelWords
    //GetUserLevel - הפעלת הפונקציה
    const GetLevelFromDB = async () => {
        try {
            const res = await fetch(apiUrl + 'Level/{' + level + '}', {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            let result = await res.json();
            console.log("levelData:", result);

            var alredy = false;
            for (var i = 0; i < result.length; i++) {
                for (var j = 0; j < keys.length; j++) {
                    if (result[i].KeyWord === keys[j]) {
                        alredy = true;
                    }
                }
                if (alredy) {
                    break;
                }
                else {
                    keys[pointer] = result[i].KeyWord;
                    clues[pointer] = result[i].Solution;
                    words[pointer] = result[i].Word;
                    pointer++;
                }
            }
            //הבאת מילים קשות לפי רמת המשתמש
            GetUserLevelFromDB();

        } catch (error) {
            console.log('ErrorGetLevelWords', error);
        }
    }

    //GetUserLevelWords
    //GetAllData - הפעלת פונקציה
    const GetUserLevelFromDB = async () => {
        try {
            const res = await fetch(apiUrl + 'WordForUser/' + user.Mail + '/Level', {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            let result = await res.json();
            console.log("UserLevel:", result);

            var alredy = false;
            if (result) {
                for (var i = 0; i < result.length; i++) {
                    for (var j = 0; j < keys.length; j++) {
                        if (result[i].KeyWord === keys[j]) {
                            alredy = true;
                        }
                    }
                    if (alredy) {
                        break;
                    }
                    else {
                        keys[pointer] = result[i].KeyWord;
                        clues[pointer] = result[i].Solution;
                        words[pointer] = result[i].Word;
                        pointer++;
                    }
                }
            }
            //הבאת כל המילים מהדאטה
            GetAllDataFromDB();

        } catch (error) {
            console.log('ErrorGetUserLevelWords', error);
        }
    }

    //GetAllData
    //CreateCross - הפעלת הפונקציה
    var grid;
    const GetAllDataFromDB = async () => {
        try {
            const res = await fetch(apiUrl + 'Words/GetData', {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            const result = await res.json();
            console.log("Data:", result);
            CreateCross(result);
        } catch (error) {
            console.log('ErrorGetAllData', error);
        }
    }

    //CreateCrossword
    async function CreateCross(data) {
        if (isMakeCross) {
            var num;
            var cw;
            for (let i = 0; i < 10; i++) {
                num = i;
                makeKeys.push(data.keys[num]);
                makeWords.push(data.words[num]);
                makeClues.push(data.clues[num]);
            }
            localStorage.countWords = JSON.stringify(makeWords.length);
            console.log(makeKeys, makeWords, makeClues);
            cw = new Crossword(makeKeys, makeWords, makeClues, data);
        } else {
            //יצירת אובייקט עם המפתח, מילים והגדרות
            cw = new Crossword(keys, words, clues, data);
        }

        //יצירת תשבץ grid
        let tries = 20;
        grid = await cw.getSquareGrid(tries);
        console.log("Grid:", grid);

        if (isLastCross) {
            grid = JSON.parse(localStorage.grid);
            keys = JSON.parse(localStorage.keys);
            words = JSON.parse(localStorage.words);
            clues = JSON.parse(localStorage.clues);
            //localStorage.countWords = JSON.stringify(words.length);
        }
        else if (isSharedCross) {
            grid = JSON.parse(sharedCross.Grid);
            keys = JSON.parse(sharedCross.Keys);
            words = JSON.parse(sharedCross.Words);
            clues = JSON.parse(sharedCross.Clues);
            localStorage.countWords = JSON.stringify(words.length);
        }
        else if (isSharedCrossUser) {
            grid = JSON.parse(sharedCrossUser.Grid);
            keys = JSON.parse(sharedCrossUser.Keys);
            words = JSON.parse(sharedCrossUser.Words);
            clues = JSON.parse(sharedCrossUser.Clues);
            localStorage.countWords = JSON.stringify(words.length);
        }
        else if (isCreate) {
            grid = JSON.parse(CreateCrossData.Grid);
            keys = JSON.parse(CreateCrossData.Keys);
            words = JSON.parse(CreateCrossData.Words);
            clues = JSON.parse(CreateCrossData.Clues);
            localStorage.countWords = JSON.stringify(words.length);
        }
        else if (isCompetition) {
            grid = JSON.parse(comptitionData.Grid);
            keys = JSON.parse(comptitionData.Keys);
            words = JSON.parse(comptitionData.Words);
            clues = JSON.parse(comptitionData.Clues);
            localStorage.countWords = JSON.stringify(words.length);
        }
        else if (isCompetitionUser2) {
            grid = JSON.parse(competitionUser2.Grid)
            keys = JSON.parse(competitionUser2.Keys);
            words = JSON.parse(competitionUser2.Words);
            clues = JSON.parse(competitionUser2.Clues);
            localStorage.countWords = JSON.stringify(words.length);
        }
        else {
            localStorage.grid = JSON.stringify(grid);
            localStorage.keys = JSON.stringify(keys);
            localStorage.words = JSON.stringify(words);
            localStorage.clues = JSON.stringify(clues);
           //localStorage.countWords = JSON.stringify(words.length);
        }

        //כל המילים בתשבץ
        console.log("KeysAll:", keys);
        console.log("WordsAll:", words);
        console.log("CluesAll:", clues);


        //במידה ואין גריד טוב הבא מילים חדשות
        if (grid === null || grid === undefined) {
            $("#crossword").hide();
            window.location.reload(false);
            //setReload(!reload);
        }
        else {
            setLoading(false);
            setToolbar(true);

            //עדכון הדאטה במספר הפעמים שמילה מופיעה בכלל התשחצים
            CountWordInCross();

            //מונה את מספר הפעמים שמילה מופיעה לכל משתמש
            CountWordForUser();

            //המרת הגריד ל-HTML
            var show_answers = false;
            setCrossword(
                CrosswordUtils.toHtml(grid, show_answers)
            )

            if (isLastCross) {
                legend = JSON.parse(localStorage.legend);
            }
            else if (isCreate) {
                legend = JSON.parse(CreateCrossData.Legend)
            }
            else if (isSharedCross) {
                legend = JSON.parse(sharedCross.Legend);
            }
            else if (isSharedCrossUser) {
                legend = JSON.parse(sharedCrossUser.Legend);
            }
            else if (isCompetition) {
                legend = JSON.parse(comptitionData.Legend);
            }
            else if (isMakeCross) {
                legend = cw.getLegend(grid, isLastCross);
                localStorage.legend = JSON.stringify(legend);
                isLastCross = false;
            }
            else if (isCompetitionUser2) {
                legend = JSON.parse(competitionUser2.Legend);
            }
            else {
                legend = cw.getLegend(grid, isLastCross);
                localStorage.legend = JSON.stringify(legend);
                isLastCross = false;
            }

            setCrossToSend({
                Grid: grid,
                Keys: keys,
                Words: words,
                Clues: clues,
                Legend: legend
            });

            //יצירת ההגדרות בתחתית העמוד
            $("#clues").show();
            setClue({
                across: ShowClue.toHtml(legend.across, "across"),
                down: ShowClue.toHtml(legend.down, "down")
            })

            for (let i = 0; i < legend["across"].length; i++) {
                if (legend["across"][i].isSolved) {
                    $('#' + legend["across"][i].word + '-listing').attr('data-solved', true);
                    $('#' + legend["across"][i].word + '-listing').addClass('strikeout');
                    $('#' + legend["across"][i].word + '-listing').click(false);
                }
            }
            for (let i = 0; i < legend["down"].length; i++) {
                if (legend["down"][i].isSolved) {
                    $('#' + legend["down"][i].word + '-listing').attr('data-solved', true);
                    $('#' + legend["down"][i].word + '-listing').addClass('strikeout');
                    $('#' + legend["down"][i].word + '-listing').click(false);
                }
            }
            //חלונית אפשרויות המענה
            ShowCrossWordOptions();

            if (isMakeCross) {
                PutUserCreateCross();
            }
        }
    }

    //PutUserCreateCross
    const PutUserCreateCross = async () => {

        var CreateCross = {
            UserMail: user.Mail,
            Grid: JSON.stringify(grid),
            Keys: JSON.stringify(makeKeys),
            Words: JSON.stringify(makeWords),
            Clues: JSON.stringify(makeClues),
            Legend: JSON.stringify(legend)
        };
        console.log("createcross:", CreateCross);
        try {
            await fetch(apiUrl + 'CreateCross', {
                method: 'POST',
                body: JSON.stringify(CreateCross),
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            console.log("secces");
        } catch (error) {
            console.log('ErrorPostCountWordsInCross', error);
        }
    }

    //PutCountWordsInCross
    const CountWordInCross = async () => {
        var wordInCross = {
            KeysArr: keys,
            wordsArr: words,
            cluesArr: clues,
        };
        try {
            await fetch(apiUrl + 'Words', {
                method: 'PUT',
                body: JSON.stringify(wordInCross),
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
        } catch (error) {
            console.log('ErrorPutCountWordsInCross', error);
        }
    }

    //PutCountWordsInUserCross
    const CountWordForUser = async () => {
        var wordForUser = {
            UserMail: user.Mail,
            KeysArr: keys,
        };
        try {
            await fetch(apiUrl + "WordForUser", {
                method: 'POST',
                body: JSON.stringify(wordForUser),
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
        } catch (error) {
            console.log('ErrorPutCountWordsInUserCross', error);
        }
    }

    //Convert the clues to HTML
    var ShowClue = {
        toHtml: function (groups, type) {
            var element = "";
            for (var i = 0; i < groups.length; i++) {
                element += '<li ';
                element += 'data-word="' + groups[i]['word'].replace(/"/g, '&quot;') + '" ';
                element += 'data-clue="' + groups[i]['clue'].replace(/"/g, '&quot;') + '" ';
                element += 'data-x="' + groups[i]['x'] + '" ';
                element += 'data-y="' + groups[i]['y'] + '" ';
                element += 'data-across="' + type + '" ';
                element += 'class="word-clue clickable" ';
                element += '>';
                element += groups[i]['position'] + ' : ';
                element += '<span id="';
                element += groups[i]['word'] + '-listing';
                element += '" ';
                element += 'class="linkable">';
                element += groups[i]['clue'];
                element += '</span>';
                element += '</li>';
            }
            return element;
        }
    }

    //יצירת משבצות התשבץ ושמירת הנתנונים (אות ומיקום) על כל משבצת 
    var CrosswordUtils = {
        toHtml: function (grid, show_answers) {
            var char;
            var css_class;
            var is_start_of_word;
            show_answers = false;
            if (grid === null) return;
            var html = [];
            html.push("<table class='crossword'>");
            var label = 1;
            for (let r = 0; r < grid.length; r++) {
                html.push("<tr>");
                for (let c = 0; c < grid[r].length; c++) {
                    var cell = grid[r][c];
                    is_start_of_word = false;
                    var show = false;
                    if (cell === null) {
                        char = "&nbsp;";
                        css_class = "no-border";
                    } else {
                        char = cell['char'];
                        show = cell['isShow']
                        css_class = "tdclass";
                        is_start_of_word = (cell['across'] && cell['across']['is_start_of_word']) || (cell['down'] && cell['down']['is_start_of_word']);
                    }

                    if (is_start_of_word) {
                        //var img_url = CrosswordUtils.PATH_TO_PNGS_OF_NUMBERS + label + ".png";
                        if (show && isLastCross) {
                            html.push("<td id='" + c + "-" + r + "' class='p" + label + " " + css_class + " charshow' style='background-color:#cccccc' title='" + r + ", " + c + "'>" + char + "</td>");
                            label++;
                        } else {
                            html.push("<td id='" + c + "-" + r + "' class='p" + label + "' '" + css_class + "' title='" + r + ", " + c + "'>");
                            label++;
                        }
                    } else {
                        if (show && isLastCross) {
                            html.push("<td id='" + c + "-" + r + "' class='" + css_class + " charshow' style='background-color:#cccccc' title='" + r + ", " + c + "'>" + char + "</td>");
                        }
                        else {
                            html.push("<td id='" + c + "-" + r + "' class='" + css_class + "' title='" + r + ", " + c + "'>");
                        }
                    }
                }
                html.push("</tr>");
            }
            html.push("</table>");
            return html.join("\n");
        }
    }
    var counterWords;
    if (isLastCross) {
        counterWords = JSON.parse(localStorage.countAnswer);
    }
    else {
        counterWords = 0;
    }

    //חלון הזנת תשובה
    function ShowCrossWordOptions() {

        //solvefunction()
        //User clicked the "solve" button for a phrase on the across or down list. Provide a prompt for solving the clue.
        var solvefunction = function () {
            setOpen(false);
            $('#solution-answer').val('');
            $('#answer-results').hide();
            $('#answer-results').html('');

            for (let i = 0; i < grid.length; i++) {
                for (let j = 0; j < grid[i].length; j++) {
                    $("#" + j + "-" + i).css("background-color", "transparent");
                    $(".charshow").css("background-color", "#cccccc");
                }
            }

            var word = $(this).attr('data-word');
            var acrosstext;
            if ($(this).attr('data-across') === "across") {
                acrosstext = "מאוזן";
            }
            else {
                acrosstext = "מאונך";
            }

            var str = "";
            for (let i = 0; i < word.length; i++) {
                str += " _ "
            }
            $('#position-and-clue').html('<b>' + acrosstext + ': ' + $(this).attr('data-clue') + str + '(' + word.length + ')');
            $('#answer-form').show();
            $('#solution-answer').attr('maxlength', 50);
            $('#answer-button').attr('data-word', word);
            $('#reveal-answer-button').attr('data-word', word);
            $('#help-button').attr('data-word', word);

            var clue = $(this).attr('data-clue');
            $('#answer-button').attr('data-clue', clue);
            $('#reveal-answer-button').attr('data-clue', clue);
            $('#help-button').attr('data-clue', clue);

            var datax = $(this).attr('data-x');

            $('#answer-button').attr('data-x', datax);
            $('#reveal-answer-button').attr('data-x', datax);

            var datay = $(this).attr('data-y');

            $('#answer-button').attr('data-y', datay);
            $('#reveal-answer-button').attr('data-y', datay);

            var across = $(this).attr('data-across');

            $('#answer-button').attr('data-across', across);
            $('#reveal-answer-button').attr('data-across', across);

            $('#solution-answer').focus();

            $('#C').attr('disabled', false);
            $('#reveal-answer-button').attr('disabled', false);

            if (across === 'across') {
                for (var i = 0; i < word.length; i++) {
                    var newwidth = parseInt(datax) + i;
                    $("#" + newwidth + "-" + datay).css("background-color", "#cceeff");
                }
            }
            else {
                for (let i = 0; i < word.length; i++) {
                    var newheigt = parseInt(datay) + i;
                    $("#" + datax + "-" + newheigt).css("background-color", "#cceeff");
                }
            }
            return false;
        }

        //closesolvefunction()   
        //User clicked "close" on the "solve phrase" dialogue that was brought up by solvefunction().
        var closesolvefunction = function () {
            $('#answer-results').hide();
            $('#answer-form').hide();
            return false;
        }

        //answerfunction()  
        //User clicked "answer" on the "solve phrase" dialogue that was brought up by solvefunction().
        //משתמש לוחץ על בדוק תשובה
        //הוספת ניקוד (5 נקודות) למשתמש על תשובה נכונה
        var answerfunction = function () {
            var word = $(this).attr('data-word');
            var answer = $('#solution-answer').val();
            var answer2 = answer.split(" ");
            var answernospace = "";
            for (let i = 0; i < answer2.length; i++) {

                answernospace += answer2[i];
            }
            var str = "";
            for (var j = 0; j < answernospace.length; j++) {
                if (answernospace[j] === "ף") {
                    str = answernospace.replace("ף", "פ");
                    answernospace = str;
                }
                else if (answernospace[j] === "ך") {
                    str = answernospace.replace("ך", "כ");
                    answernospace = str;
                }
                else if (answernospace[j] === "ן") {
                    str = answernospace.replace("ן", "נ");
                    answernospace = str;
                }
                else if (answernospace[j] === "ם") {
                    str = answernospace.replace("ם", "מ");
                    answernospace = str;
                }
                else if (answernospace[j] === "ץ") {
                    str = answernospace.replace("ץ", "צ");
                    answernospace = str;
                }
                else {
                    str = answernospace;
                }
            }
            if (str === word) {
                var letterposition;
                var cell;
                var char;
                var position = "";
                var across = $(this).attr('data-across');
                var x = parseInt($(this).attr('data-x'), 10);
                var y = parseInt($(this).attr('data-y'), 10);

                //משתמש ענה על הגדרה במאוזן נכונה
                //הוספת ניקוד למשתמש
                //-סיום התשבץ - הודעה על כך ועדכון הניקוד ב DB 
                if (across === 'across') {
                    for (let i = 0; i < str.length; i++) {
                        var newwidth = x + i;
                        letterposition = 'letter-position-' + newwidth + '-' + y;
                        $('#' + letterposition).text(str[i]);
                        cell = grid[y][newwidth];
                        char = cell['char'];
                        cell['isShow'] = true;
                        for (let j = 0; j < legend['across'].length; j++) {
                            if (legend['across'][j].word === str) {
                                legend['across'][j].isSolved = true;
                            }
                        }
                        localStorage.grid = JSON.stringify(grid);
                        localStorage.legend = JSON.stringify(legend);
                        position = newwidth + "-" + y;
                        $("#" + newwidth + "-" + y).addClass("charshow");
                        $("#" + newwidth + "-" + y).css("background-color", "#cccccc");
                        document.getElementById(position).innerHTML = char;
                    }
                    if (isCompetition === true || isCompetitionUser2 === true) {

                    }
                    else {
                        //הוספת ניקוד למשתמש 
                        setUser({
                            Score: user.Score += 5
                        })
                        SetUserDetails({ ...UserDetails, Score: user.Score });
                    }
                    counterWords++;
                    localStorage.countAnswer = JSON.stringify(counterWords);
                    localStorage.counterWords = JSON.stringify(counterWords);
                    $('#' + word + '-listing').attr('data-solved', true);
                    $('#' + word + '-listing').addClass('strikeout');
                    $('#' + word + '-listing').click(false);
                    legend = JSON.parse(localStorage.legend);
                    //-סיום התשבץ - הודעה על כך ועדכון הניקוד ב DB 
                    if (counterWords === words.length) {
                        if (!isCompetition || !isCompetitionUser2) {
                            PutScore();
                        }
                        if (isMakeCross && isCreate) {
                            swal({
                                title: "כל הכבוד",
                                text: "הניקוד שלך הוא:" + user.Score,
                                icon: "success",
                                button: {
                                    text: "חזרה לדף הבית"
                                },
                            })
                                .then((value) => {
                                    if (value) {
                                        history.push('/HomePage');
                                    }
                                });
                        }
                        else {
                            swal({
                                title: "כל הכבוד",
                                text: "הניקוד שלך הוא:" + user.Score,
                                icon: "success",
                                button: {
                                    text: "חזרה לדף הבית"
                                },
                            })
                                .then((value) => {
                                    if (value) {
                                        history.push('/HomePage');
                                    }
                                });
                        }
                    }
                    $('#answer-form').hide();
                } else {
                    for (let i = 0; i < str.length; i++) {
                        var newheight = y + i;
                        letterposition = 'letter-position-' + x + '-' + newheight;
                        $('#' + letterposition).text(str[i]);
                        cell = grid[newheight][x];
                        char = cell['char'];
                        cell['isShow'] = true;
                        for (let j = 0; j < legend['down'].length; j++) {
                            if (legend['down'][j].word === str) {
                                legend['down'][j].isSolved = true;
                            }
                        }
                        localStorage.grid = JSON.stringify(grid);
                        localStorage.legend = JSON.stringify(legend);
                        position = x + "-" + newheight;
                        $("#" + x + "-" + newheight).addClass("charshow");
                        $("#" + x + "-" + newheight).css("background-color", "#cccccc");
                        document.getElementById(position).innerHTML = char;
                    }
                 if (isCompetition === true || isCompetitionUser2 === true) {
                        
                    }
                    else {
                        //הוספת ניקוד למשתמש 
                        setUser({
                            Score: user.Score += 5
                        })
                        SetUserDetails({ ...UserDetails, Score: user.Score });
                    }

                    counterWords++;
                    localStorage.countAnswer = JSON.stringify(counterWords);
                    localStorage.counterWords = JSON.stringify(counterWords);
                    $('#' + word + '-listing').attr('data-solved', true);
                    $('#' + word + '-listing').addClass('strikeout');
                    $('#' + word + '-listing').click(false);
                    legend = JSON.parse(localStorage.legend);
                    localStorage.grid = JSON.stringify(grid);
                    if (counterWords === words.length) {
                        if (!isCompetition || !isCompetitionUser2) {
                            PutScore();
                        }
                        if (isMakeCross && isCreate) {
                            swal({
                                title: "כל הכבוד",
                                text: "הניקוד שלך הוא:" + user.Score,
                                icon: "success",
                                button: {
                                    text: "חזרה לדף הבית"
                                },
                            })
                                .then((value) => {
                                    if (value) {
                                        history.push('/HomePage');
                                    }
                                });
                        }
                        else {

                            swal({
                                title: "כל הכבוד",
                                text: "הניקוד שלך הוא:" + user.Score,
                                icon: "success",
                                button: {
                                    text: "חזרה לדף הבית"
                                },
                            })
                                .then((value) => {
                                    if (value) {
                                        history.push('/HomePage');
                                    }
                                });
                        }

                    }
                    $('#answer-form').hide();
                }
                localStorage.grid = JSON.stringify(grid);
            } else {
                if (!$('#answer-results').is(':visible')) {
                    $('#answer-results').show();
                    $('#answer-results').html('תשובה שגויה, נסה שנית');
                }
            }
            return false;
        }

        //עדכון ניקוד למשתמש בDB
        const PutScore = async () => {
            let score = {
                Mail: user.Mail,
                Score: user.Score
            };
            try {
                await fetch(apiUrl + 'User/Score', {
                    method: 'PUT',
                    body: JSON.stringify(score),
                    headers: new Headers({
                        'Content-Type': 'application/json; charset=UTF-8',
                    })
                })
            } catch (error) {
                console.log('', error);
            }
        }

        //revealanswerfunction()
        //User clicked "reveal answer" on the "solve phrase" dialogue that was brought up by solvefunction().

        var wordsReavel = [];
        var revealanswerfunction = function () {
            if (user.Score >= 3) {
                var usermail = user.Mail;
                var word = $(this).attr('data-word');
                var across = $(this).attr('data-across');
                var clue = $(this).attr('data-clue');
                var x = parseInt($(this).attr('data-x'), 10);
                var y = parseInt($(this).attr('data-y'), 10);
                //var num = getRndInteger(0, word.length);
                var numOfLetter = 0;
                var i = 0;
                var num = 0;
                var numofrevelletter = 0;
                var xx = x;
                var yy = y;
                var WR;
                var position;
                var char;
                var cell;
                var letterposition;
                if (across === 'across') {
                    for (let index = 0; index < word.length; index++) {
                        if (grid[yy][xx++]['isShow']) {

                            numOfLetter += 1;
                        }
                    }
                }
                else {
                    for (let index = 0; index < word.length; index++) {
                        if (grid[yy++][xx]['isShow']) {

                            numOfLetter += 1;
                        }
                    }
                }

                for (i = 0; i < wordsReavel.length; i++) {
                    if (wordsReavel[i].Word === word || (wordsReavel[i].X === x && wordsReavel[i].Y === y)) {
                        if (num === wordsReavel[i].Number) {
                            num += 1;
                            i = 0;
                        }
                    }
                }
                if (across === 'across') {
                    var newwidth = x + num;
                    letterposition = 'letter-position-' + newwidth + '-' + y;
                    $('#' + letterposition).text(word[num]);
                    cell = grid[y][newwidth];
                    char = cell['char'];
                    cell['isShow'] = true;
                    for (let j = 0; j < legend['across'].length; j++) {
                        if (legend['across'][j].word === word) {
                            legend['across'][j].isSolved = true;
                        }
                    }
                    localStorage.grid = JSON.stringify(grid);
                    localStorage.legend = JSON.stringify(legend);
                    position = ""
                    position = newwidth + "-" + y;
                    document.getElementById(position).innerHTML = char;
                    $("#" + newwidth + "-" + y).addClass("charshow");
                    $("#" + newwidth + "-" + y).css("background-color", "#cccccc");
                    WR = {
                        Word: word,
                        Number: num,
                        X: newwidth,
                        Y: y
                    }
                } else {
                    var newheigt = y + num;
                    letterposition = 'letter-position-' + x + '-' + newheigt;
                    $('#' + letterposition).text(word[num]);
                    cell = grid[newheigt][x];
                    char = cell['char'];
                    cell['isShow'] = true;
                    for (let j = 0; j < legend['down'].length; j++) {
                        if (legend['down'][j].word === word) {
                            legend['down'][j].isSolved = true;
                        }
                    }
                    localStorage.grid = JSON.stringify(grid);
                    localStorage.legend = JSON.stringify(legend);
                    position = ""
                    position = x + "-" + newheigt;
                    document.getElementById(position).innerHTML = char;
                    $("#" + x + "-" + newheigt).addClass("charshow");
                    $("#" + x + "-" + newheigt).css("background-color", "#cccccc");
                    WR = {
                        Word: word,
                        Number: num,
                        X: x,
                        Y: newheigt
                    }
                }
                localStorage.grid = JSON.stringify(grid);
                wordsReavel.push(WR);

                //הכנסת הרמז לטבלת Hints
                PostHint(usermail, word, clue);

                setUser({
                    Score: user.Score -= 3
                })
                SetUserDetails({ ...UserDetails, Score: user.Score });

                for (let i = 0; i < wordsReavel.length; i++) {
                    if (wordsReavel[i].Word === word) {
                        numofrevelletter += 1;
                    }
                }

                if (numOfLetter + 1 === word.length) {
                    counterWords++;
                    localStorage.countAnswer = JSON.stringify(counterWords);
                    localStorage.counterWords = JSON.stringify(counterWords);
                    $('#' + word + '-listing').attr('data-solved', true);
                    $('#' + word + '-listing').addClass('strikeout');
                    $('#' + word + '-listing').click(false);
                    $('#' + word + '-listing').attr('data-solved', true);
                    legend = JSON.parse(localStorage.legend);
                    if (counterWords === words.length) {
                        if (!isCompetition || !isCompetitionUser2) {
                            PutScore();
                        }
                        if (isMakeCross && isCreate) {
                            swal({
                                title: "כל הכבוד",
                                text: "הניקוד שלך הוא:" + user.Score,
                                icon: "success",
                                button: {
                                    text: "חזרה לדף הבית"
                                },
                            })
                                .then((value) => {
                                    if (value) {
                                        history.push('/HomePage');
                                    }
                                });
                        }
                        else {

                            swal({
                                title: "כל הכבוד",
                                text: "הניקוד שלך הוא:" + user.Score,
                                icon: "success",
                                button: {
                                    text: "חזרה לדף הבית"
                                },
                            })
                                .then((value) => {
                                    if (value) {
                                        history.push('/HomePage');
                                    }
                                });
                        }
                    }
                }

            }
            else { setOpen(true) }
            $('#answer-form').hide();
        }

        //Dialog functions
        var handleClickOpen = function () {
            var help = {
                word: $(this).attr('data-word'),
                clue: $(this).attr('data-clue'),
                key: $(this).attr('data-word') + "-" + $(this).attr('data-clue')
            }
            setHelp(help);
            setOpenDialog(true);
            getAllUsers();
        };

        $('.word-clue').click(solvefunction);
        $('#cancel-button').click(closesolvefunction);
        $('#answer-button').click(answerfunction);
        $('#reveal-answer-button').click(revealanswerfunction);
        $('#help-button').click(handleClickOpen);
    }

    const PostHint = async (usermail, word, clue) => {
        var hint = {
            UserMail: usermail,
            Word: word,
            Clue: clue
        }
        try {
            await fetch(apiUrl + "Hints", {
                method: 'POST',
                body: JSON.stringify(hint),
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
        } catch (error) {
            console.log('ErrorPostHint', error);
        }
    }

    const handleClose = () => {
        setOpenDialog(false);
    };

    const getAllUsers = async () => {
        try {
            const res = await fetch('http://proj.ruppin.ac.il/bgroup11/prod/api/User/Users', {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            let result = await res.json();
            setUsers(result);
            SetMembers(result);
        } catch (error) {
            console.log('ErrorGetUsersList', error);
        }
    }

    //Users list function
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    //Search function
    const FilterSearch = (event) => {
        var updatedList = users;
        console.log("updatedList", updatedList)
        updatedList = updatedList.filter((item) => {
            return item.FirstName.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
        });
        SetMembers(updatedList);
    }

    const SendHelp = async () => {
        var sh = {
            SendFrom: user.Mail,
            SendTo: checked,
            KeyWord: help.key,
            IsHelped: false,
            Notification: {
                Type: 'helpFromFriend',
                Text: 'מבקש/ת עזרה בהגדרה ',
                //Date: moment().format("MM-DD-YYYY HH:mm:ss") 
            }
        };

        try {
            const res = await fetch(apiUrl + 'HelpFromFriend/', {
                method: 'POST',
                body: JSON.stringify(sh),
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            console.log(res);
            const result = await res.json();
            if (result >= 1) {
                console.log('PostSendHelpSuccsses');
                swal({
                    text: ' הגדרה נשלחה בהצלחה ',
                    button: {
                        text: "המשך משחק"
                    },
                })
                setOpenDialog(false);
            } else {
                swal({
                    title: "הגדרה לא נשלחה ל- " + checked,
                    text: "נסה שנית מאוחר יותר",
                    icon: "error",
                    button: "חזור למשחק"
                });
                setOpenDialog(false);
            }
        } catch (error) {
            console.log('ErrorPostHelpFromFriend', error);
            swal({
                title: "הגדרה לא נשלחה ל- " + checked,
                text: "נסה שנית מאוחר יותר",
                icon: "error",
                button: "חזור למשחק"
            });
            setOpenDialog(false);
        }
    }

    return (
        <div>
            {toolbar && <ToolBar User={user} Cross={crossToSend} />}
            <div className="ClimbingBoxLoader">
                <BeatLoader
                    css={override}
                    size={20}
                    color={"#123abc"}
                    loading={loading}
                />
            </div>
            <div id="answer-form">
                <div className={"short-margin"}>

                    <p id="position-and-clue"></p>

                    <p><input id="solution-answer" type="text" size="40" placeholder="הזן תשובה" /></p>

                    <p id="answer-results" className={"hidden"}></p>

                    <p><input type="button" id="answer-button" value=" בדוק  " />  <input type="button" id="reveal-answer-button" value=" רמז " /> <input type="button" id="help-button" value=" עזרה מחבר " /> <input type="button" id="cancel-button" value=" X " /></p>

                </div>
            </div>
            <div id="crossword" dangerouslySetInnerHTML={{ __html: crossword }} ></div>
            <table id="clues">
                <thead>
                    <tr>
                        <th>מאוזן</th>
                        <th>מאונך</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><ul id="across">{ReactHtmlParser(clue.across)}</ul></td>
                        <td><ul id="down">{ReactHtmlParser(clue.down)}</ul></td>
                    </tr>
                </tbody>
            </table>
            <Collapse in={open}>
                <Alert severity="error">אין לך מספיק ניקוד!</Alert>
            </Collapse>

            <Dialog fullScreen open={openDialog} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar className={classes.toolBar2}>
                        <Typography variant="h6" className={classes.title}>
                            רשימת משתתפים
                        </Typography>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <input placeholder="חפש משתמש" onChange={FilterSearch} />
                <List dense className={classes.root}>
                    {members.map((value) => {
                        const labelId = `checkbox-list-secondary-label-${value}`;
                        return (
                            <ListItem key={value.Mail} button>
                                <ListItemAvatar>
                                    <Avatar
                                        alt={`Avatar n°${value + 1}`}
                                        src={value.Image}
                                    />
                                </ListItemAvatar>
                                <ListItemText className={classes.text} id={labelId} primary={`${value.FirstName + ' ' + value.LastName}`} />
                                <Checkbox
                                    edge="end"
                                    onChange={handleToggle(value.Mail)}
                                    checked={checked.indexOf(value.Mail) !== -1}
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItem>)
                    })}
                </List>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className={classes.submit}
                    onClick={SendHelp}
                >
                    שלח
            </Button>
            </Dialog>
        </div >
    );
}
export default withRouter(CrossData);
