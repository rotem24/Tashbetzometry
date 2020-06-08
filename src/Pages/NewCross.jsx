import React, { useContext } from 'react';
import { withRouter, useLocation } from 'react-router-dom';
import { makeStyles, Container } from '@material-ui/core';
//Components
import CrossData from '../Components/CrossData';
import Header from '../Components/Header';
import ToolBar from '../Components/ToolBar';
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
    const user = UserDetails;

    const level = location.state.params;

    return (
        <div>
            <Header title={'תשבץ'} />
            <ToolBar User={user} />
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <CrossData Level={level} />
                </div>
            </Container>
        </div>
    );
}
export default withRouter(NewCross);