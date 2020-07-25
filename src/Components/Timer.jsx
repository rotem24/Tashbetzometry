import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useHistory } from 'react-router-dom';
import Countdown, { zeroPad } from "react-countdown";
import swal from 'sweetalert';

const Timer = () => {
    const history = useHistory();
    const [wordscompliet, setwordscompliet] = useState(JSON.parse(localStorage.getItem("countAnswer")));
    console.log("wordscompliet:", wordscompliet);
    useEffect(() => {

    }, [wordscompliet]);

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
                if (value) {
                    history.push('/HomePage');
                }
            });
    };


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