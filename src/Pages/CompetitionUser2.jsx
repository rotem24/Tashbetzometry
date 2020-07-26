import React from 'react';
import {Container}  from '@material-ui/core';
import { useLocation, withRouter } from 'react-router-dom';
//Components
import CrossData from '../Components/CrossData';
import Header from '../Components/Header';
import TimerUser2 from '../Components/TimerUser2';


const CompetitionUser2 = () => {

    const location = useLocation();

    const isCompetitionUser2 = location.state.isCompetitionUser2;
    const competitionUser2 = location.state.competitionUser2;


    return (
        <div>
            <Header title={'תשבץ תחרות'} goBack={'/HomePage'} />
            <Container component="main" maxWidth="xs">
                <div>
                    <TimerUser2 IsCompetitionUser2={isCompetitionUser2} CompetitionUser2={competitionUser2} />
                    <CrossData IsCompetitionUser2={isCompetitionUser2} CompetitionUser2={competitionUser2}  />
                </div>
            </Container>
        </div>
    );
}
export default withRouter(CompetitionUser2);
