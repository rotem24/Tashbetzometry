import React, { useState, useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom';
import Countdown, { zeroPad } from "react-countdown";
import swal from 'sweetalert';

const Timer = (props) => {

    const history = useHistory();

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
        swal({
            title: "כל הכבוד",
            text: "פתרת " + counterWordsUser2 + " מילים",
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
    const UpdateCompetitionCrossUser2 = async () => {

        counterWordsUser2 = JSON.parse(localStorage.getItem("counterWords"));
        console.log("counterWords", counterWordsUser2);


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