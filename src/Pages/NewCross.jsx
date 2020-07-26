import React from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles, Container } from '@material-ui/core';
//Components
import CrossData from '../Components/CrossData';
import Header from '../Components/Header';


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

    const level = location.state.params;
    const isLastCross = location.state.lastCross;
    const dataForUserCross = location.state.data;
    const isMakeCross = location.state.value;
    const CreateCrossData = location.state.CreateCrossData;
    const isCreateCross = location.state.isCreate;
    const isSharesCross = location.state.isShared;
    const SharescrossData = location.state.SharescrossData;
    const isSheredCross = location.state.isSharedCross;
    const sharedCross = location.state.cross;

    return (
        <div>
            <Header title={'תשבץ'} goBack={'/HomePage'} />
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <CrossData
                        Level={level}
                        IsLastCross={isLastCross}
                        DataForUserCross={dataForUserCross}
                        IsMakeCross={isMakeCross}
                        IsCreateCross={isCreateCross}
                        CreateCrossData={CreateCrossData}
                        IsSharedCross={isSharesCross}
                        SharedCrossData={SharescrossData}
                        IsShareCross={isSheredCross}
                        SharedCross={sharedCross}
                    />
                </div>
            </Container>
        </div>
    );
}
export default NewCross;