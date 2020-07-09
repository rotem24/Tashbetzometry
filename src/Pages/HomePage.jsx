import React, { useContext, useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { makeStyles, Container, Button } from '@material-ui/core';
import { Avatar, Divider } from '@material-ui/core';
import swal from 'sweetalert';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import PeopleIcon from '@material-ui/icons/People';
//Components
import Header from '../Components/Header';
//StyleSheet
import HomeStyle from '../StyleSheet/HomeStyle.css';
//Card
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
//Image
import startCross from '../IMG/startCross.jpeg';
import addWord1 from '../IMG/addWord1.jpg';
import LastCrossIMG from '../IMG/LastCrossIMG.jpg';
//Circular
import Circle from 'react-circle';
//Context Api
import { UserDetailsContext } from '../Contexts/UserDetailsContext';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(0.5),
        backgroundColor: '#999aab',
    },
    title: {
        fontFamily: 'Rubik',
        fontSize: 40,
        fontWeight: 'bolder',
        marginBottom: 14
    },
    img: {
        width: 150,
        borderRadius: '50%'
    },
    submit: {
        fontSize: 22,
        height: '100px',
        border: '2px',
        backgroundColor: 'black',
        color: '#00000',
        backgroundImage: `url(${startCross})`,
        backgroundSize: 'cover',
        fontWeight: 'bolder',
        fontFamily: 'Tahoma',
        //margin: theme.spacing(2, 0, 2),
        //width: 100,
        //marginLeft: 20
    },
    score: {
        fontSize: 16,
        fontWeight: 'bolder',
    },
    forum: {
        margin: theme.spacing(2, 0, 2),
        fontSize: 15,
        height: 50,
        width: 200,
        backgroundColor: 'orange',
        color: '#00000',
        backgroundSize: 'cover',
        fontWeight: 'bolder',
        fontFamily: 'Tahoma'
    },
    addWord: {
        fontSize: 22,
        border: '2px',
        height: '100px',
        fontWeight: 'bolder',
        fontFamily: 'Tahoma',
        backgroundImage: `url(${addWord1})`,
        backgroundSize: 'cover',
        //margin: theme.spacing(2),
        //borderRadius: '30%',
        //height: 100,
        //width: 100,
        //color: '#00000',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#999aab',
        width: '110px',
        height: '110px',
    },
    circular: {
        width: '120px',
    },
    typography: {
        margin: theme.spacing(0.5),
        fontFamily: 'Rubik',
        fontSize: 22,
        textAlign: 'right'
    },
    root: {
        backgroundImage: `url(${LastCrossIMG})`,
        border: '2px',
        maxHeight: '160px',
    }
}));


function HomePage() {
    const classes = useStyles();
    const history = useHistory();

    //ContextApi
    const { UserDetails } = useContext(UserDetailsContext);

    const [percentage, setPercentage] = useState();

    const user = UserDetails;

    localStorage.setItem('user', JSON.stringify(user));

    let local = false;
    let apiUrl = 'http://proj.ruppin.ac.il/bgroup11/prod/api/';
    if (local) {
        apiUrl = 'http://localhost:50664/api/';
    }

    useEffect(() => {
        var countWords = JSON.parse(localStorage.countWords);
        var countAnswer = JSON.parse(localStorage.countAnswer);
        setPercentage(Math.round((countAnswer / countWords) * 100));
        console.log("percentage", percentage);
    }, []);


    const startCross = (event) => {
        swal("בחר רמת קושי", {
            buttons: {
                easy: { text: 'קל', value: 'easy' },
                medium: { text: 'בינוני', value: 'medium' },
                hard: { text: 'קשה', value: 'hard' },
            },
            closeOnClickOutside: false
        })
            .then((value) => {
                history.push('/NewCross', { params: value });
            });
    }

    const LastCross = (event) => {
        history.push('/NewCross', { params: false, lastCross: true });
    }

    function GoForum() {
        history.push('/Forum');
    }

    function GoAddWord() {
        history.push('/AddWord');
    }

    return (
        <div>
            <Header title={"דף הבית"} />
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <br />
                    <Avatar className={classes.avatar}
                        src={user.Image}
                    />
                    <h1 className={classes.title}>שלום {user.FirstName}</h1>
                    <p className={classes.score}>הניקוד שלך: <MonetizationOnOutlinedIcon style={{ color: '#FFD700' }} /> {user.Score}</p>
                    <br />
                </div>
                <Card className={classes.root} onClick={LastCross}>
                    <CardActionArea>
                        <Typography className={classes.typography} gutterBottom variant="h5" component="h2">
                            התשבץ האחרון
                        </Typography>
                        <Divider variant="fullWidth" />
                        <Circle
                            animate={true} // Boolean: Animated/Static progress
                            animationDuration="2.5s" //String: Length of animation
                            responsive={false} // Boolean: Make SVG adapt to parent size
                            size={115} // Number: Defines the size of the circle.
                            lineWidth={30} // Number: Defines the thickness of the circle's stroke.
                            progress={percentage} // Number: Update to change the progress and percentage.
                            progressColor="#66ff99"  // String: Color of "progress" portion of circle.
                            bgColor="#e0ebeb" // String: Color of "empty" portion of circle.
                            textColor="black" // String: Color of percentage text color.
                            textStyle={{
                                font: 'bold 5rem Helvetica, Arial, sans-serif' // CSSProperties: Custom styling for percentage.
                            }}
                            percentSpacing={10} // Number: Adjust spacing of "%" symbol and number.
                            roundedStroke={true} // Boolean: Rounded/Flat line ends
                            showPercentage={true} // Boolean: Show/hide percentage.
                            showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
                        />
                    </CardActionArea>
                    <CardActions>
                        {}
                    </CardActions>
                </Card>
                <br />
                <Card className={classes.submit} onClick={startCross}>
                    <CardActionArea>
                        <Typography className={classes.typography} gutterBottom variant="h5" component="h2">
                            התחל תשבץ
                        </Typography>
                        <Divider variant="fullWidth" />
                    </CardActionArea>
                    <CardActions>
                        {}
                    </CardActions>
                </Card>
                <br />
                <Card className={classes.addWord} onClick={GoAddWord}>
                    <CardActionArea>
                        <Typography className={classes.typography} gutterBottom variant="h5" component="h2">
                            הוסף הגדרה
                        </Typography>
                        <Divider variant="fullWidth" />
                    </CardActionArea>
                    <CardActions>
                        {}
                    </CardActions>
                </Card>
                {/* <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={startCross}
                    className={classes.submit}>התחל תשבץ</Button> */}
                {/* <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={GoAddWord}
                    className={classes.addWord}>הוסף הגדרה</Button> */}
                <br />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={GoForum}
                    className={classes.forum}>פורום<PeopleIcon style={{ marginRight: 10 }} /></Button>
            </Container>
        </div>
    )
}
export default withRouter(HomePage);