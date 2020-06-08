import React, { useContext, useEffect, useState } from 'react';
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

    const [words, setWords] = useState([]);
   

    useEffect(() => {
        getAllAddWord();
    }, []);

    let local = false;
    let apiUrl = 'http://proj.ruppin.ac.il/bgroup11/prod/api/';
    if (local) {
        let apiUrl = 'http://localhost:50664/api/';
    }

    const getAllAddWord = async () => {

        try {
            const res = await fetch(apiUrl + 'AddWord/', {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            let result = await res.json();
            console.log("result:", result)
            
        } catch (error) {
            console.log('ErrorGetAddWords', error);
        }
    }

    return (
        <div>
            <Header className={classes.title} title={'פורום'} />
            <Top5Users />

        </div>
    );
}
export default Forum;
