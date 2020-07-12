import React, { useContext } from 'react';
import { withRouter, useLocation } from 'react-router-dom';
import { makeStyles, Container } from '@material-ui/core';
//Components
import CrossData from '../Components/CrossData';
import Header from '../Components/Header';
//ContextApi
import { UserDetailsContext } from '../Contexts/UserDetailsContext';


const useStyles = makeStyles((theme) => ({
    paper: {

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}));

function NewCross() {

    const classes = useStyles();
    const location = useLocation();

    const { UserDetails } = useContext(UserDetailsContext);
    //const user = UserDetails;

    const level = location.state.params;
    const isLastCross = location.state.lastCross;
    const dataForUserCross = location.state.data;
    const isMakeCross = location.state.value;
    const CreateCrossData = location.state.CreateCrossData;
    const isCreateCross = location.state.isCreate;
    const isCompetition = location.state.competition;
    const sendToCompetition = location.state.sendTo;
    console.log("isCompetition", isCompetition);
    console.log("sendToCompetition", sendToCompetition);
    
    
    return (
        <div>
            <Header title={'תשבץ'} goBack={'/HomePage'} />
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <CrossData Level={level} IsLastCross={isLastCross} DataForUserCross={dataForUserCross} IsMakeCross={isMakeCross} IsCreateCross={isCreateCross} CreateCrossData={CreateCrossData} IsCompetition={isCompetition} SendToCompetition={sendToCompetition}/>
                </div>
            </Container>
        </div>
    );
}
export default NewCross;