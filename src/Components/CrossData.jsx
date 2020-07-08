import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import $ from 'jquery';
import { Collapse } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import swal from 'sweetalert';
//Components
import { Crossword } from './CrossWord';
import ToolBar from '../Components/ToolBar';
//StyleSheet
import '../StyleSheet/CrossStyle.css';
//ContextApi
import { UserDetailsContext } from '../Contexts/UserDetailsContext';


function CrossData(props) {
    //ContextApi
    const { UserDetails, SetUserDetails } = useContext(UserDetailsContext);

    const history = useHistory();
    const location = useLocation();

    var isLastCross = props.IsLastCross;
    const isSharedCross = location.state.value;
    const sharedCross = location.state.cross;

    const level = props.Level;
    const [user, setUser] = useState(UserDetails);
    const [open, setOpen] = useState(false);
    const [crossword, setCrossword] = useState([]);
    const [clue, setClue] = useState({ "across": "", "down": "" });
    const [crossToSend, setCrossToSend] = useState([]);

    var keys = [];
    var words = [];
    var clues = [];
    var pointer = 0;
    var legend;

    useEffect(() => {
        $("#clues").hide();
        $('#answer-form').hide();
        GetWordsFromDB();
    }, []);

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
                    if (result[i].KeyWord == keys[j]) {
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

        //יצירת אובייקט עם המפתח, מילים והגדרות
        let cw = new Crossword(keys, words, clues, data);

        //יצירת תשבץ grid
        let tries = 20;
        grid = await cw.getSquareGrid(tries);
        console.log("Grid:", grid);


        if (isLastCross) {
            grid = JSON.parse(localStorage.grid);
            keys = JSON.parse(localStorage.keys);
            words = JSON.parse(localStorage.words);
            clues = JSON.parse(localStorage.clues);
        }
        else if (isSharedCross) {
            grid = JSON.parse(sharedCross.Grid);
            keys = JSON.parse(sharedCross.Keys);
            words = JSON.parse(sharedCross.Words);
            clues = JSON.parse(sharedCross.Clues);
        }
        else {
            localStorage.grid = JSON.stringify(grid);
            localStorage.keys = JSON.stringify(keys);
            localStorage.words = JSON.stringify(words);
            localStorage.clues = JSON.stringify(clues);
        }

        //כל המילים בתשבץ
        console.log("KeysAll:", keys);
        console.log("WordsAll:", words);
        console.log("CluesAll:", clues);

        //במידה ואין גריד טוב הבא מילים חדשות
        if (grid === null || grid === undefined) {
            $("#crossword").hide();
            window.location.reload(false);
        }
        else {
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
            else if (isSharedCross) {
                legend = JSON.parse(sharedCross.Legend);
            }
            else {
                legend = cw.getLegend(grid);
                localStorage.legend = JSON.stringify(legend);
                isLastCross = false;
            }

            //יצירת ההגדרות בתחתית העמוד
            $("#clues").show();
            setClue({
                across: ShowClue.toHtml(legend.across, "across"),
                down: ShowClue.toHtml(legend.down, "down")
            })
            //חלונית אפשרויות המענה
            ShowCrossWordOptions();

            setCrossToSend({
                Grid: grid,
                Keys: keys,
                Words: words,
                Clues: clues,
                Legend: legend
            });
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
            show_answers = false;
            if (grid === null) return;
            var html = [];
            html.push("<table class='crossword'>");
            var label = 1;
            for (let r = 0; r < grid.length; r++) {
                html.push("<tr>");
                for (let c = 0; c < grid[r].length; c++) {
                    var cell = grid[r][c];
                    var is_start_of_word = false;
                    var show = false;
                    if (cell === null) {
                        var char = "&nbsp;";
                        var css_class = "no-border";
                    } else {
                        var char = cell['char'];
                        show = cell['isShow']
                        var css_class = "tdclass";
                        var is_start_of_word = (cell['across'] && cell['across']['is_start_of_word']) || (cell['down'] && cell['down']['is_start_of_word']);
                    }

                    if (is_start_of_word) {
                        var img_url = CrosswordUtils.PATH_TO_PNGS_OF_NUMBERS + label + ".png";
                        if (show && isLastCross) {
                            html.push("<td id='" + c + "-" + r + "'class='p" + label + "' '" + css_class + "' " + 'style="background-color:#cccccc"' + "title='" + r + ", " + c + "'>" + char + "</td>");
                            label++;
                        } else {
                            html.push("<td id='" + c + "-" + r + "'class='p" + label + "' '" + css_class + "' title='" + r + ", " + c + "'>");
                            label++;
                        }
                    } else {
                        if (show && isLastCross) {
                            html.push("<td id='" + c + "-" + r + "' class='" + css_class + "' " + 'style="background-color:#cccccc"' + "title='" + r + ", " + c + "'>" + char + "</td>");
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

    //חלון הזנת תשובה
    function ShowCrossWordOptions() {

        //solvefunction()
        //User clicked the "solve" button for a phrase on the across or down list. Provide a prompt for solving the clue.
        var counterWords = 0;
        var solvefunction = function () {
            setOpen(false);
            $('#solution-answer').val('');
            $('#answer-results').hide();
            $('#answer-results').html('');


            for (let i = 0; i < grid.length; i++) {
                for (let j = 0; j < grid[i].length; j++) {
                    //$("#" + j + "-" + i).css("background-color", "white");
                    $(".charshow").css("background-color", "#cccccc");
                }
            }

            var word = $(this).attr('data-word');
            var acrosstext;
            if ($(this).attr('data-across') == "across") {
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

            var clue = $(this).attr('data-clue');
            $('#answer-button').attr('data-clue', clue);
            $('#reveal-answer-button').attr('data-clue', clue);

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

            if (across == 'across') {
                for (var i = 0; i < word.length; i++) {
                    var newwidth = parseInt(datax) + i;
                    $("#" + newwidth + "-" + datay).css("background-color", "#cceeff");
                }
            }
            else {
                for (var i = 0; i < word.length; i++) {
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
                var across = $(this).attr('data-across');
                var x = parseInt($(this).attr('data-x'), 10);
                var y = parseInt($(this).attr('data-y'), 10);

                //משתמש ענה על הגדרה במאוזן נכונה
                //הוספת ניקוד למשתמש
                //-סיום התשבץ - הודעה על כך ועדכון הניקוד ב DB 
                if (across === 'across') {
                    for (let i = 0; i < str.length; i++) {
                        var newwidth = x + i;
                        var letterposition = 'letter-position-' + newwidth + '-' + y;
                        $('#' + letterposition).text(str[i]);
                        var cell = grid[y][newwidth];
                        var char = cell['char'];
                        cell['isShow'] = true;
                        var position = ""
                        position = newwidth + "-" + y;
                        $("#" + newwidth + "-" + y).addClass("charshow");
                        $("#" + newwidth + "-" + y).css("background-color", "#cccccc");
                        document.getElementById(position).innerHTML = char;
                    }
                    //הוספת ניקוד למשתמש 
                    setUser({
                        Score: user.Score += 5
                    })
                    SetUserDetails({ ...UserDetails, Score: user.Score });

                    counterWords++;
                    localStorage.countAnswer = JSON.stringify(counterWords);
                    localStorage.countWords = JSON.stringify(words.length);
                    $('#' + word + '-listing').attr('data-solved', true);
                    $('#' + word + '-listing').addClass('strikeout');
                    $('#' + word + '-listing').click(false);
                    legend = JSON.parse(localStorage.legend);
                    //-סיום התשבץ - הודעה על כך ועדכון הניקוד ב DB 
                    if (counterWords === words.length) {
                        PutScore();
                        swal({
                            title: "כל הכבוד",
                            text: "הניקוד שלך הוא:" + user.Score,
                            icon: "success",
                            button: "חזרה לדף הבית",
                        });
                        history.push('/HomePage');
                    }
                    $('#answer-form').hide();
                } else {
                    for (let i = 0; i < str.length; i++) {
                        var newheight = y + i;
                        var letterposition = 'letter-position-' + x + '-' + newheight;
                        $('#' + letterposition).text(str[i]);
                        var cell = grid[newheight][x];
                        var char = cell['char'];
                        cell['isShow'] = true;
                        var position = ""
                        position = x + "-" + newheight;
                        $("#" + x + "-" + newheight).addClass("charshow");
                        $("#" + x + "-" + newheight).css("background-color", "#cccccc");
                        document.getElementById(position).innerHTML = char;
                    }
                    //הוספת ניקוד למשתמש 
                    setUser({
                        Score: user.Score += 5
                    })
                    SetUserDetails({ ...UserDetails, Score: user.Score });

                    counterWords++;
                    $('#' + word + '-listing').attr('data-solved', true);
                    $('#' + word + '-listing').addClass('strikeout');
                    $('#' + word + '-listing').click(false);
                    legend = JSON.parse(localStorage.legend);
                    if (counterWords === words.length) {
                        PutScore();
                        swal({
                            title: "כל הכבוד",
                            text: "הניקוד שלך הוא:" + user.Score,
                            icon: "success",
                            button: "חזרה לדף הבית",
                        });
                        history.push('/HomePage');
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
        function getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        var num = 0;
        var wordsReavel = [];
        var revealanswerfunction = function () {
            if (user.Score > 3) {
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
                for (i = 0; i < wordsReavel.length; i++) {
                    if (wordsReavel[i].Word === word || (wordsReavel[i].X === x && wordsReavel[i].Y === y)) {
                        if (num === wordsReavel[i].Number) {
                            //num = getRndInteger(0, word.length);
                            num += 1;
                            i = 0;
                        }
                    }
                }
                if (across === 'across') {
                    var newwidth = x + num;
                    var letterposition = 'letter-position-' + newwidth + '-' + y;
                    $('#' + letterposition).text(word[num]);
                    var cell = grid[y][newwidth];
                    var char = cell['char'];
                    cell['isShow'] = true;
                    var position = ""
                    position = newwidth + "-" + y;
                    document.getElementById(position).innerHTML = char;
                    $("#" + newwidth + "-" + y).addClass("charshow");
                    $("#" + newwidth + "-" + y).css("background-color", "#cccccc");
                    var WR = {
                        Word: word,
                        Number: num,
                        X: newwidth,
                        Y: y
                    }
                } else {
                    var newheigt = y + num;
                    var letterposition = 'letter-position-' + x + '-' + newheigt;
                    $('#' + letterposition).text(word[num]);
                    var cell = grid[newheigt][x];
                    var char = cell['char'];
                    cell['isShow'] = true;
                    var position = ""
                    position = x + "-" + newheigt;
                    document.getElementById(position).innerHTML = char;
                    $("#" + x + "-" + newheigt).addClass("charshow");
                    $("#" + x + "-" + newheigt).css("background-color", "#cccccc");
                    var WR = {
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

                for (var i = 0; i < wordsReavel.length; i++) {
                    if (wordsReavel[i].Word === word) {
                        numOfLetter += 1;
                    }

                    setUser({
                        Score: user.Score -= 3
                    })
                    SetUserDetails({ ...UserDetails, Score: user.Score });
                    if (numOfLetter === word.length) {
                        counterWords++;
                        $('#' + word + '-listing').attr('data-solved', true);
                        $('#' + word + '-listing').addClass('strikeout');
                        $('#' + word + '-listing').click(false);
                        $('#' + word + '-listing').attr('data-solved', true);
                        legend = JSON.parse(localStorage.legend);
                        if (counterWords === words.length) {
                            PutScore();
                            swal({
                                title: "כל הכבוד",
                                text: "הניקוד שלך הוא:" + user.Score,
                                icon: "success",
                                button: "חזרה לדף הבית",
                            });
                            history.push('/HomePage');
                        }
                    }
                }
            }
            else { setOpen(true) }
            $('#answer-form').hide();
        }
        $('.word-clue').click(solvefunction);
        $('#cancel-button').click(closesolvefunction);
        $('#answer-button').click(answerfunction);
        $('#reveal-answer-button').click(revealanswerfunction);

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

    return (
        <div>
            <ToolBar User={user} Cross={crossToSend} />
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
        </div >
    );
}
export default CrossData;
