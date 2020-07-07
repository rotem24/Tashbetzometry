import React, { useContext, useEffect, useState } from 'react';
import { makeStyles, Button } from '@material-ui/core';
//Components
import Header from '../Components/Header';

//Context Api
import { UserDetailsContext } from '../Contexts/UserDetailsContext';
import Chart from '../Components/Chart'
//import { Bar, Pie } from 'react-chartjs-2';

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
        fontFamily: 'Suez One',
        fontSize: 30,
        fontWeight: 'bolder',
    },
    submit: {
        fontSize: 16,
        height: 50,
        backgroundColor: 'black',
        color: '#fff',
        fontFamily: 'Tahoma',
        
        
    },
}));




const PrivateArea = () => {
    //ContextApi
    const { UserDetails } = useContext(UserDetailsContext);
    const user = UserDetails;

    const [sharedwith, setsharedwith] = useState();
    const [sharedfrom, setsharedfrom] = useState();
    const [hints, sethints] = useState();
    const [sum, setsum] = useState();




    const classes = useStyles();
    let local = false;
    let apiUrl = 'http://proj.ruppin.ac.il/bgroup11/prod/api/';
    if (local) {
        apiUrl = 'http://localhost:50664/api/';
    }

    useEffect(() => {
        getCountSharedWithCross();
        getCountSharedFromCross();
        getCountHintForUser();
    }, []);


    const getCountSharedWithCross = async () => {

        try {
            const res = await fetch(apiUrl + 'SharedCross/' + user.Mail + '/count', {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            let result = await res.json();
            setsharedwith(result);
            console.log("shared with:", result);



        } catch (error) {
            console.log('ErrorGetAddWords', error);
        }



    }
    const getCountSharedFromCross = async () => {

        try {
            const res = await fetch(apiUrl + 'SharedCross/' + user.Mail + '/countfrom', {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            let result = await res.json();
            setsharedfrom(result);
            console.log("shared from:", result);



        } catch (error) {
            console.log('ErrorGetAddWords', error);
        }



    }
    const getCountHintForUser = async () => {

        try {
            const res = await fetch(apiUrl + 'Hints/' + user.Mail + "/countHints", {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            let result = await res.json();
            sethints(result);
            console.log("Count Hints:", result);
            setsum(result);
            // settotal(total += result);
            console.log('total:', sum);



        } catch (error) {
            console.log('ErrorGetAddWords', error);
        }

        //var totall = await sumtotal();
    }
    // const sumtotal= async()=>{
    //     settotal(sharedfrom + sharedwith + hints);
    //     console.log(total);

    // }


    return (
        <div>
            <Header className={classes.title} title={'אזור אישי'} />
            <Chart SharedFrom={sharedfrom} SharedWith={sharedwith} Hints={hints}></Chart>
            <Button
                    type="submit"
                    variant="contained"
                    className={classes.submit}>
                    רשימת מילים קשות
                   
            </Button><br></br>
            <Button
                    type="submit"
                    variant="contained"
                    className={classes.submit}>
                   תשבצים משותפים
                   
            </Button><br></br>
            <Button
                    type="submit"
                    variant="contained"
                    className={classes.submit}>
                                       
            </Button><br></br>
        </div>

    );
}
export default PrivateArea;
