import React from 'react';
import { withRouter, useLocation } from 'react-router-dom';
import { makeStyles, Container } from '@material-ui/core';
//Components
import CrossData from '../Components/CrossData';
import Header from '../Components/Header';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}));

function NewCross() {

    const classes = useStyles();
    const location = useLocation();

    const level = location.state.params;

    return (
        <div>
            <Header title={'תשבץ'} />
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <CrossData Level={level} />
                </div>
            </Container>
        </div>
    );
}
export default withRouter(NewCross);