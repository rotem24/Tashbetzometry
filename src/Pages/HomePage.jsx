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
import '../StyleSheet/HomeStyle.css';
//Card
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
//Image
import LastCrossIMG from '../IMG/LastCrossIMG.jpg';
import rightTop from '../IMG/rightTop.png';
import rightBott from '../IMG/rightBott.png';
import leftTop from '../IMG/leftTop.png';
import leftBott from '../IMG/leftBott.png';
//Circular
import Circle from 'react-circle';
//Context Api
import { UserDetailsContext } from '../Contexts/UserDetailsContext';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'flex-end',
    },
    avatar: {
        backgroundColor: '#999aab',
        width: '63px',
        height: '60px',
        marginTop: '15px',
        position: 'absolute',
        right: '15px'
    },
    title: {
        fontFamily: 'Rubik',
        fontSize: 28,
        fontWeight: 'bolder',
        marginRight: 20,
        marginTop: 30,
        position: 'absolute',
        right: '65px'
    },
    score: {
        fontSize: 18,
        fontFamily: 'Rubik',
        marginTop: 32,
        position: 'absolute',
        left: '15px'
    },
    forum: {
        margin: theme.spacing(2, 0, 2),
        fontSize: 20,
        width: '300px',
        height: '45px',
        backgroundColor: localStorage.getItem("color"),
        color: 'white',
        fontFamily: 'Rubik',
        position: 'stiky',
        top: -25,
        borderRadius: '12px'
    },
    circular: {
        width: '120px',
    },
    root: {
        backgroundImage: `url(${LastCrossIMG})`,
        maxHeight: '140px',
        width: 300,
        marginRight: 'auto',
        marginLeft: 'auto',
        borderRadius: '20px',
    },
    typography: {
        margin: theme.spacing(0.5),
        fontFamily: 'Rubik',
        fontSize: 20,
        textAlign: 'right',
    },
    startCross: {
        backgroundImage: `url(${rightTop})`,
        fontFamily: 'Rubik',
        fontSize: 20,
        minHeight: '50px',
        minWidth: '160px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'stiky',
        right: '3px',
        bottom: '10px',
        paddingLeft: 40,
        paddingBottom: 55,
        lineHeight:'130%'

    },
    startComp: {
        backgroundImage: `url(${leftTop})`,
        minHeight: '155px',
        minWidth: '130px',
        backgroundSize: 'cover',
        fontFamily: 'Rubik',
        fontSize: 20,
        position: 'stiky',
        left: '2px',
        top: '5px',
        paddingRight: 40,
        paddingBottom: 70,
        lineHeight:'130%'
    },
    addWord: {
        backgroundImage: `url(${rightBott})`,
        fontFamily: 'Rubik',
        fontSize: 20,
        minHeight: '150px',
        minWidth: '130px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'stiky',
        left: '6px',
        top: '-25px',
        paddingLeft: 50,
        paddingTop: 35,
        lineHeight:'130%'
        //paddingRight: 30
    },
    createCross: {
        backgroundImage: `url(${leftBott})`,
        fontFamily: 'Rubik',
        fontSize: 20,
        minHeight: '130px',
        minWidth: '145px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'stiky',
        left: '5px',
        bottom: '10px',
        paddingTop: 15,
        paddingRight: 40,
        lineHeight:'130%'
        
    }
}));


function HomePage(props) {

    const classes = useStyles();
    const history = useHistory();

    //ContextApi
    const { UserDetails } = useContext(UserDetailsContext);
    const user = UserDetails;
    localStorage.setItem('user', JSON.stringify(user));

    const [percentage, setPercentage] = useState();


    let local = false;
    let apiUrl = 'http://proj.ruppin.ac.il/bgroup11/prod/api/';
    if (local) {
        apiUrl = 'http://localhost:50664/api/';
    }

    useEffect(() => {
        if (!localStorage.getItem("countWords") || !localStorage.getItem("countAnswer")) {
            setPercentage(0);
        }
        else if (localStorage.getItem("countWords") === '0' && localStorage.getItem("countAnswer") === '0') {
            setPercentage(0);
        } else if (localStorage.getItem("countAnswer") === '0') {
            setPercentage(0);
        } else {
            var countWords = JSON.parse(localStorage.countWords);
            var countAnswer = JSON.parse(localStorage.countAnswer);
            setPercentage(Math.round((countAnswer / countWords) * 100));
        }
        if (Math.round((countAnswer / countWords) * 100) === '1') {
            setPercentage(100);
        }
    }, [percentage]);


    const startCross = (event) => {
        swal("בחר רמת קושי", {
            buttons: {
                easy: { text: 'קל', value: 'easy' },
                medium: { text: 'בינוני', value: 'medium' },
                hard: { text: 'קשה', value: 'hard' },
            },
        })
            .then((value) => {
                if (value === 'easy' || value === 'medium' || value === 'hard') {
                    history.push('/NewCross', { params: value });
                }
                else {
                    history.push('/HomePage')
                }
            });
    }

    const LastCross = (event) => {
        if (!localStorage.getItem("grid") || !localStorage.getItem("words") || !localStorage.getItem("clues") || !localStorage.getItem("keys") || !localStorage.getItem("legend")) {
            swal({
                text: "טרם התחלת תשבץ",
                button: {
                    text: 'אישור',

                },
                showCancelButton: 'true',
            })
                .then((value) => {
                    if (value) {
                        history.push('/HomePage');
                    }
                });
        }
        else {
            history.push('/NewCross', { params: false, lastCross: true });
        }
    }

    function GoForum() {
        history.push('/Forum');
    }

    function GoAddWord() {
        history.push('/AddWord');
    }

    function MakeCross() {
        history.push('/MakeCross');
    }

    function startCompetition() {
        swal({
            title: 'התחל תחרות',
            text: " לרשותך 10 דקות. כדי לנצח ולזכות ב-30 נקודות, עליך לענות על יותר הגדרות מהמתחרה שתבחר ",
            buttons: {
                text: "שחק",
                cancel: "ביטול"
            },
            closeOnClickOutside: true
        })
            .then((value) => {
                if (value) {
                    history.push('/CompetitionCross', { user: user.Mail });
                }
            });
    }


    return (
        <div>
            <Header title={"דף הבית"} Homepage={true} />
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <p className={classes.score}>ניקוד : <MonetizationOnOutlinedIcon style={{ color: '#FFD700' }} /> {user.Score}</p>
                    <h1 className={classes.title}>שלום {user.FirstName}</h1>
                    <Avatar className={classes.avatar} src={user.Image} />
                </div>
                <br /><br /><br /><br />
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
                            size={100} // Number: Defines the size of the circle.
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
                <div className={classes.allDiv}>
                    <div className={classes.topDiv}>
                        <Button className={classes.startCross} onClick={startCross}>
                            התחל
                        <br />
                        תשבץ
                    </Button>
                        <Button className={classes.startComp} onClick={startCompetition}>
                            התחל
                        <br />
                        תחרות
                </Button>
                    </div>
                    <div className={classes.bottonDiv}>
                        <Button className={classes.addWord} onClick={GoAddWord}>
                            הוסף
                        <br />
                        הגדרה
                    </Button>
                        <Button className={classes.createCross} onClick={MakeCross}>
                            צור
                        <br />
                        תשבץ
                    </Button>
                    </div>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={GoForum}
                        className={classes.forum}>פורום<PeopleIcon style={{ marginRight: 11 }} /></Button>
                </div>
            </Container>
        </div >
    )
}
export default withRouter(HomePage);