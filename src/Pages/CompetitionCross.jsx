import  React ,{useEffect } from 'react';
import { makeStyles, Container } from '@material-ui/core';
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
    

    useEffect(() => {
        const timer = setTimeout(() => { }, 1800);
        return () => clearTimeout(timer);
    }, []);

    // var callbackFunction = (childData) => {
    //     endTime = childData;
    //     localStorage.setItem("endTime", endTime);   
    // }
 



    return (
        <div>
            <Header title={'תשבץ תחרות'} goBack={'/HomePage'} />
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Timer></Timer>
                    <CrossData IsCompetition={isCompetition} SendToCompetition={sendToCompetition} />
                </div>
            </Container>
        </div>
    );
}

export default CompetitionCross;
