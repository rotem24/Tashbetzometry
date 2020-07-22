import React from 'react';
import { makeStyles, Container } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
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
    //const [endTime, setEndTime] = useState();

    var endTime = 0;
    const isCompetition = location.state.competition;
    const sendToCompetition = location.state.sendTo;
    

    // var callbackFunction = (childData) => {
    //     endTime = childData;
    //     localStorage.setItem("endTime", endTime);   
    // }
 


    return (
        <div>
            <Header title={'תשבץ תחרות'} goBack={'/HomePage'} />
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <StopWatch/>
                    {/* <StopWatch  parentCallback = {callbackFunction} /> */}
                    <CrossData IsCompetition= {isCompetition} SendToCompetition={sendToCompetition} EndTime = {endTime} />
                </div>
            </Container>
        </div>
    );
}

export default CompetitionCross;
