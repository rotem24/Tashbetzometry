import React from "react";
import { useHistory } from 'react-router-dom';
import Countdown, { zeroPad } from "react-countdown";
import swal from 'sweetalert';

const Timer = (props) => {

    const history = useHistory();

    const sendToCompetition = props.SendTo;
    const sendFrom = props.SendFrom;
    const crossNum = props.CrossNum;
    var counterWords;

    
    let local = false;
    let apiUrl = 'http://proj.ruppin.ac.il/bgroup11/prod/api/';
    if (local) {
        apiUrl = 'http://localhost:50664/api/';
    }

    const CometitionOver = () => {
        UpdateCompetitionCross();
        swal({
            title: "כל הכבוד",
            text: "פתרת " + counterWords + " הגדרות. התראה על המצנצח תשלח כאשר המתחרה יסיים את התשבץ",
            icon: "success",
            button: {
                text: "חזרה לדף הבית"
            },
            closeOnClickOutside: false
        })
            .then((value) => {
                if (value) {
                    history.push('/HomePage');
                }
            });
    };

    //עדכון טבלת תשחץ תחרות
    const UpdateCompetitionCross = async () => {

        counterWords = JSON.parse(localStorage.getItem("counterWords"));
        console.log("counterWords", counterWords);

        var CompetitionCross = {
            SendFrom: sendFrom,
            FromCountAnswer: counterWords,
            SendTo: sendToCompetition,
            ToCountAnswer: 0,
            CrossNum: crossNum,
            Notification: {
                Type: 'competition',
                Text: 'הזמין/ה אותך לתחרות ',
            }
        };
        console.log("CompetitionCross:", CompetitionCross);
        try {
            await fetch(apiUrl + 'Competitions', {
                method: 'POST',
                body: JSON.stringify(CompetitionCross),
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            console.log("seccesCompetitionCross");
        } catch (error) {
            console.log('ErrorPostCompetitionCross', error);
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
                date={Date.now() + 40000}
                zeroPadTime={2}
                renderer={renderer}
                onComplete={CometitionOver} />
        </div>
    )
}
export default Timer;