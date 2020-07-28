import React, { useContext } from "react";
import { useHistory } from 'react-router-dom';
import Countdown, { zeroPad } from "react-countdown";
import swal from 'sweetalert';
//ContextApi
import { UserDetailsContext } from '../Contexts/UserDetailsContext';

const Timer = (props) => {

    const history = useHistory();

    //ContextApi
    const { UserDetails, SetUserDetails } = useContext(UserDetailsContext);

    const isCompetitionUser2 = props.IsCompetitionUser2;
    const competitionUser2 = props.CompetitionUser2;
    console.log("competitionUser2", competitionUser2);
    var counterWordsUser2;


    let local = false;
    let apiUrl = 'http://proj.ruppin.ac.il/bgroup11/prod/api/';
    if (local) {
        apiUrl = 'http://localhost:50664/api/';
    }

    const CometitionOver = () => {
        UpdateCompetitionCrossUser2();
        if (competitionUser2.FromCountAnswer < counterWordsUser2) {
            swal({
                title: "ניצחת כל הכבוד! ",
                text: "הצלחת לפתור " + counterWordsUser2 + " הגדרות וזכית ב-30 נקודות",
                icon: "success",
                button: {
                    text: "חזרה לדף הבית"
                },
                closeOnClickOutside: false
            })
                .then((value) => {
                    if (value) {
                        var scoreUser2 = UserDetails.Score + 30;
                        SetUserDetails({ ...UserDetails, Score: scoreUser2 });
                        PutScore(UserDetails.Mail, scoreUser2);
                        var scoreUser1 = 30
                        PutScoreUser1(competitionUser2.SendFrom, scoreUser1, false);
                        SendLoseNotification(competitionUser2.SendFrom);
                        history.push('/HomePage');
                    }
                });
        }
        else if (competitionUser2.FromCountAnswer > counterWordsUser2) {
            swal({
                title: "הפסדת",
                text: "לא הצלחת לפתור מעל " + competitionUser2.FromCountAnswer + " הגדרות, ירדו לך 30 נקודות",
                icon: "error",
                button: {
                    text: "חזרה לדף הבית"
                },
                closeOnClickOutside: false
            })
                .then((value) => {
                    if (value) {
                        var scoreUser2 = UserDetails.Score - 30;
                        SetUserDetails({ ...UserDetails, Score: scoreUser2 });
                        PutScore(UserDetails.Mail, scoreUser2);
                        var scoreUser1 = 30
                        PutScoreUser1(competitionUser2.SendFrom, scoreUser1, true);
                        SendWinNotification(competitionUser2.SendFrom);
                        history.push('/HomePage');
                    }
                });
        }
        else {
            swal({
                title: "תיקו!",
                text: " הצלחת לפתור " + competitionUser2.FromCountAnswer + " הגדרות כמו יריבך",
                button: {
                    text: "חזרה לדף הבית"
                },
                closeOnClickOutside: false
            })
                .then((value) => {
                    if (value) {
                        SendTikoNotification(competitionUser2.SendFrom);
                        history.push('/HomePage');
                    }
                });
        }
    };

    //עדכון טבלת תשחץ תחרות
    const UpdateCompetitionCrossUser2 = async () => {

        counterWordsUser2 = JSON.parse(localStorage.getItem("counterWords"));
        try {
            fetch(apiUrl + 'Competitions/User2/' + competitionUser2.ContestNum + '/' + counterWordsUser2 + '/', {
                method: 'PUT',
                body: '',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
        } catch (error) {
            console.log('UpdateCompetitionCrossUser2', error);
        }
    }

    const PutScore = async (mail, value) => {
        let score = {
            Mail: mail,
            Score: value
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
            console.log('PutScoreError', error);
        }
    }

    const PutScoreUser1 = async (mail, value, isWin) => {
        let score = {
            Mail: mail,
            Score: value,
            IsWin: isWin
        };
        try {
            await fetch(apiUrl + 'User/ScoreUser1', {
                method: 'PUT',
                body: JSON.stringify(score),
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
        } catch (error) {
            console.log('PutScoreUser1Error', error);
        }
    }

    const SendWinNotification = async (mail) => {
        var win = {
            SendFrom: UserDetails.Mail,
            SendToGet: mail,
            Type: 'competition',
            Text: 'הפסיד/ה בתחרות, זכית ב-30 נקודות! ',
            ContestNum: competitionUser2.ContestNum
        }
        try {
            const res = await fetch(apiUrl + 'Notifications/Win/', {
                method: 'POST',
                body: JSON.stringify(win),
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            const result = await res.json();
            console.log('SendWinNotification', result);
        } catch (error) {
            console.log('ErrorSendWinNotification', error);
        }
    }

    const SendLoseNotification = async (mail) => {
        var lose = {
            SendFrom: UserDetails.Mail,
            SendToGet: competitionUser2.SendFrom,
            Type: 'competition',
            Text: 'ניצח/ה בתחרות, הפסדת 30 נקודות ',
            ContestNum: competitionUser2.ContestNum
        }
        try {
            const res = await fetch(apiUrl + 'Notifications/Win/', {
                method: 'POST',
                body: JSON.stringify(lose),
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            const result = await res.json();
            console.log('SendWinNotification', result);
        } catch (error) {
            console.log('ErrorSendWinNotification', error);

        }
    }

    const SendTikoNotification = async (mail) => {
        var lose = {
            SendFrom: UserDetails.Mail,
            SendToGet: competitionUser2.SendFrom,
            Type: 'competition',
            Text: ' פתר/ה מספר הגדרות זהה, התחרות הסתיימה בתיקו! ',
            ContestNum: competitionUser2.ContestNum
        }
        try {
            const res = await fetch(apiUrl + 'Notifications/Win/', {
                method: 'POST',
                body: JSON.stringify(lose),
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            const result = await res.json();
            console.log('SendWinNotification', result);
        } catch (error) {
            console.log('ErrorSendWinNotification', error);

        }
    }

    const renderer = ({ minutes, seconds }) => {
        return (<span>
            {zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
        );
    };


    return (
        <div>
            <Countdown
                date={Date.now() + 20000}
                zeroPadTime={2}
                renderer={renderer}
                onComplete={CometitionOver} />
        </div>
    )
}
export default Timer;