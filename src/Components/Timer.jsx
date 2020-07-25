import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { useHistory } from 'react-router-dom';
import Countdown, { zeroPad } from "react-countdown";
import swal from 'sweetalert';
//Context Api
import { UserDetailsContext } from '../Contexts/UserDetailsContext';

const Timer = (props) => {

    //ContextApi
    const { UserDetails } = useContext(UserDetailsContext);
    const user = UserDetails;
    const history = useHistory();
    const [wordscompliet, setwordscompliet] = useState(JSON.parse(localStorage.getItem("countAnswer")));
    console.log("wordscompliet:", wordscompliet);
    const sendToCompetition = props.SendToCompetition;

    const CometitionOver = () => {

        swal({
            title: "כל הכבוד",
            text: "פתרת " + wordscompliet + " מילים",
            icon: "success",
            button: {
                text: "חזרה לדף הבית"
            },
            closeOnClickOutside: false
        })
            .then((value) => {
                UpdateCompetitionCross();
                if (value) {
                    history.push('/HomePage');
                }
            });
    };

    let local = true;
    let apiUrl = 'http://proj.ruppin.ac.il/bgroup11/prod/api/';
    if (local) {
        apiUrl = 'http://localhost:50664/api/';
    }

    //עדכון טבלת תשחץ תחרות
    const UpdateCompetitionCross = async () => {

        var CompetitionCross = {
            SendFrom: user.Mail,
            FromCountAnswer: JSON.parse(localStorage.countAnswer),
            SendTo: sendToCompetition,
            ToCountAnswer: 0,
            Grid: JSON.parse(localStorage.grid),
            Keys: JSON.parse(localStorage.keys),
            Word: JSON.parse(localStorage.words),
            Clues: JSON.parse(localStorage.clues),
            Legend: JSON.parse(localStorage.legend),
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

        // Render a countdown
        return (<span>
            {zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
        );

    };
    return (
        <div>
            <Countdown date={Date.now() + 20000} zeroPadTime={2} renderer={renderer} onComplete={CometitionOver} />
            {/* document.getElementById("root") */}

        </div>
    )
}
export default Timer;