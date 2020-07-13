import React, { useState } from 'react';
import { makeStyles, Container } from '@material-ui/core';
import { useHistory, useLocation, withRouter } from 'react-router-dom';
//Components
import CrossData from '../Components/CrossData';
import Header from '../Components/Header';
import StopWatch from '../Components/StopWatch';


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
    const [endTime, setEndTime] = useState();

    const isCompetition = location.state.competition;
    const sendToCompetition = location.state.sendTo;
    

    var callbackFunction = (childData) => {
        setEndTime(childData);
        console.log("childData",childData);
    }


    return (
        <div>
            <Header title={'תשבץ תחרות'} goBack={'/HomePage'} />
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <StopWatch  parentCallback = {callbackFunction} />
                    <CrossData IsCompetition={isCompetition} SendToCompetition={sendToCompetition} EndTime={endTime}/>
                </div>
            </Container>
        </div>
    );
}

export default CompetitionCross;
