import React, { useEffect, useState } from 'react';
import { makeStyles, Container, TextareaAutosize } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
//Components
import CrossData from '../Components/CrossData';
import Header from '../Components/Header';
import Timer from '../Components/Timer';


const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}));

const CompetitionCross = () => {

    const classes = useStyles();
    const location = useLocation();
    //const [endTime, setEndTime] = useState();

    var endTime = 0;
    const isCompetition = location.state.competition;

    const sendToCompetition = location.state.sendTo;
    const [competitionData, setcompetitionData] = useState();
    const [num, setnum] = useState(getRandomInt(94, 152));
    console.log("num", num);

    useEffect(() => {

        CreateCompetitionCross();
        const timer = setTimeout(() => { }, 1800);
        return () => clearTimeout(timer);
    }, []);

    // var callbackFunction = (childData) => {
    //     endTime = childData;
    //     localStorage.setItem("endTime", endTime);   
    // }
    let local = true;
    let apiUrl = 'http://proj.ruppin.ac.il/bgroup11/prod/api/';
    if (local) {
        apiUrl = 'http://localhost:50664/api/';
    }
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const CreateCompetitionCross = async () => {

        try {
            const res = await fetch(apiUrl + "Competitions/" + num + "/", {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            let result = await res.json();
            setcompetitionData(result);
            console.log("competitionData:", result);
        } catch (error) {
            console.log('ErrorcompetitionData', error);
        }
    }

    return (
        <div>
            <Header title={'תשבץ תחרות'} goBack={'/HomePage'} />
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    {competitionData && <Timer></Timer>}
                    {competitionData && <CrossData IsCompetition={isCompetition} SendToCompetition={sendToCompetition} CompetitionData={competitionData} />}
                </div>
            </Container>
        </div>
    );
}

export default CompetitionCross;
