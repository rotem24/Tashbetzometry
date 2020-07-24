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
import LastCrossIMG from '../IMG/LastCrossIMG.jpg';
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
        width: '45px',
        height: '45px',
        marginTop: '15px',
        position: 'absolute',
        right: '15px'
    },
    title: {
        fontFamily: 'Rubik',
        fontSize: 28,
        fontWeight: 'bolder',
        marginRight: 4,
        marginTop: 22,
        position: 'absolute',
        right: '65px'
    },
    img: {
        width: 150,
        borderRadius: '50%'
    },
    submit: {
        fontSize: 20,
        height: '50px',
        border: '2px',
        color: '#00000',
    },
    score: {
        fontSize: 18,
        fontFamily: 'Rubik',
        marginTop: 27,
        position: 'absolute',
        left: '15px'
    },
    forum: {
        margin: theme.spacing(2, 0, 2),
        fontSize: 20,
        height: 45,
        width: 230,
        backgroundColor: 'orange',
        color: '#00000',
        backgroundSize: 'cover',
        fontFamily: 'Rubik'
    },
    addWord: {
        fontSize: 22,
        border: '2px',
        height: '50px',
        fontWeight: 'bolder',
    },
    circular: {
        width: '120px',
    },
    typography: {
        margin: theme.spacing(0.5),
        fontFamily: 'Rubik',
        fontSize: 20,
        textAlign: 'right',
    },
    root: {
        backgroundImage: `url(${LastCrossIMG})`,
        border: '2px',
        maxHeight: '150px',
        width: 320,
        marginRight: 'auto',
        marginLeft: 'auto',
        borderRadius: '10px',
    }
}));


function HomePage(props) {
    const classes = useStyles();
    const history = useHistory();
    const [percentage, setPercentage] = useState();
    const { UserDetails } = useContext(UserDetailsContext);
    const user = UserDetails;
    const [image, setImage] = useState(user.Image);
    //ContextApi
    localStorage.setItem('user', JSON.stringify(user));


    let local = false;
    let apiUrl = 'http://proj.ruppin.ac.il/bgroup11/prod/api/';
    if (local) {
        apiUrl = 'http://localhost:50664/api/';
    }

    useEffect(() => {
        if (!localStorage.getItem("countWords") || !localStorage.getItem("countAnswer")) {
            setPercentage(0);
        } else {
            var countWords = JSON.parse(localStorage.countWords);
            var countAnswer = JSON.parse(localStorage.countAnswer);
            setPercentage(Math.round((countAnswer / countWords) * 100));
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
        history.push('/ContactsCompetition');
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
                <Card className={classes.submit} onClick={startCompetition}>
                    <CardActionArea>
                        <Typography className={classes.typography} gutterBottom variant="h5" component="h2">
                            התחל תחרות
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
                </Card><br />
                <Card className={classes.addWord} onClick={MakeCross}>
                    <CardActionArea>
                        <Typography className={classes.typography} gutterBottom variant="h5" component="h2">
                            צור תשבץ
                        </Typography>
                        <Divider variant="fullWidth" />
                    </CardActionArea>
                    <CardActions>
                        {}
                    </CardActions>
                </Card>

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