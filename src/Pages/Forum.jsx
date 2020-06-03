import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
//Components
import Header from '../Components/Header';
import Top5Users from '../Components/Top5Users';

//Context Api
import { UserDetailsContext } from '../Contexts/UserDetailsContext';

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
        fontFamily: 'Suez One',
        fontSize: 30,
        fontWeight: 'bolder',
    },
}));

const Forum = () => {
    //ContextApi
    const { UserDetails } = useContext(UserDetailsContext);
    const user = UserDetails;

    const classes = useStyles();

    return (
        <div>
            <Header className={classes.title} title={'פורום'} />
            <Top5Users/>

        </div>
    );
}
export default Forum;
