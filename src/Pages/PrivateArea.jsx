import React, { useContext, useEffect, useState } from 'react';
import { makeStyles, Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
//Components
import Header from '../Components/Header';
import { useHistory, useLocation } from 'react-router-dom';

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
        color: 'black',
        fontFamily: 'Tahoma',
        margin: theme.spacing(2, 0, 2),
     
    },
    avatar: {
        margin: theme.spacing(0.5),
        backgroundColor: '#999aab',
        width: '20%',
        height: '20%',
        display:'block',
        marginLeft:'auto',
        marginRight: 'auto',
    },
    img: {
        width: 150,
        borderRadius: '50%'
    },
    title:{
       float:'left',
    },
}));




const PrivateArea = () => {
    //ContextApi
    const { UserDetails } = useContext(UserDetailsContext);
    const user = UserDetails;
    const location = useLocation();
    const history = useHistory();

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

    function WatchHardWords() {
        history.push('/HardWords');
    }

    function WatchAllSharedCross() {
        history.push('/AllSharedCross');
    }


    return (
        <div>
            <Header className={classes.title} title={'אזור אישי'} />
            <div className={classes.paper}>
                <br></br>
                    <p className={classes.score}>הניקוד שלך: <MonetizationOnOutlinedIcon style={{ color: '#FFD700' }} /> {user.Score}</p>
                    <Avatar className={classes.avatar}
                        src={user.Image}
                    />
                    <img src={user.Image} className={classes.img} />
                </div>
            <Chart SharedFrom={sharedfrom} SharedWith={sharedwith} Hints={hints}></Chart>
            <Button
                    type="submit"
                    variant="contained"
                    onClick={WatchHardWords}
                    className={classes.submit}>
                    רשימת מילים קשות
                   
            </Button><br></br>
            <Button
                    type="submit"
                    variant="contained"
                    onClick={WatchAllSharedCross}
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
