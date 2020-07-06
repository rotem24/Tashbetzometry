import React, { useContext,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
//Components
import Header from '../Components/Header';
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




const PrivateArea = () => {
    //ContextApi
    const { UserDetails } = useContext(UserDetailsContext);
    const user = UserDetails;

    const classes = useStyles();
    let local = true;
    let apiUrl = 'http://proj.ruppin.ac.il/bgroup11/prod/api/';
    if (local) {
         apiUrl = 'http://localhost:50664/api/';
    }

    useEffect(() => {
        getCountSharedWithCross();
        getCountSharedFromCross();
        getCountHintForUser();
    },[]);

  
    const getCountSharedWithCross = async () => {

        try {
            const res = await fetch(apiUrl + 'SharedCross/'+user.Mail+'/count', {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            let result = await res.json();
            console.log("shared with:",result);
            
           
        } catch (error) {
            console.log('ErrorGetAddWords', error);
        }

       

    }
    const getCountSharedFromCross = async () => {

        try {
            const res = await fetch(apiUrl + 'SharedCross/'+user.Mail+'/countfrom', {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            let result = await res.json();
            console.log("shared from:",result);
            
           
        } catch (error) {
            console.log('ErrorGetAddWords', error);
        }

       

    }
    const getCountHintForUser = async () => {

        try {
            const res = await fetch(apiUrl + 'Hints/'+user.Mail+"/countHints", {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            let result = await res.json();
            console.log("Count Hints:",result);
            
           
        } catch (error) {
            console.log('ErrorGetAddWords', error);
        }

       

    }

    return (
        <div>
            <Header className={classes.title} title={'אזור אישי'} />
        </div>
    );
}
export default PrivateArea;
