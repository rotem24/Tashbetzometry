import React, { useContext } from 'react';
import { makeStyles, Divider } from '@material-ui/core';
import { useHistory, withRouter } from 'react-router-dom';
//slider volum
import Grid from '@material-ui/core/Grid';
import Typographyv from '@material-ui/core/Typography';
import Sliderv from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
//slider font size
import Typographyt from '@material-ui/core/Typography';
import Slidert from '@material-ui/core/Slider';
//themecolor
import Button from '@material-ui/core/Button';
//Components
import Header from '../Components/Header';
//Context Api
import { UserDetailsContext } from '../Contexts/UserDetailsContext';
import ImagesList from '../Components/ImagesList'

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
        fontFamily: 'Suez One',
        fontSize: 30,
        fontWeight: 'bolder',
    },
    slid: {
        width: '70%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    theme: {
        paddingTop: '15%',
        color: 'black',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(2),
        },
    },
    submit: {
        width: 160,
        //fontFamily: 'Tahoma',
        fontFamily: 'Rubik',
        //margin: theme.spacing(2, 0, 2),  
        fontSize: 18,
        height: 50,
        color: 'black',
    }
}));


const Setting = () => {
    //ContextApi
    const { UserDetails } = useContext(UserDetailsContext);
    const user = UserDetails;
    const classes = useStyles();
    const history = useHistory();
    var color;

    //volume
    const [value, setValue] = React.useState(30);

    //fontsize
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const valuetext = (A) => {
        return 'A';
    };
    var local = false;
    var apiUrl = 'http://proj.ruppin.ac.il/bgroup11/prod/api/';
    if (local) {
        apiUrl = 'http://localhost:50664/api/'
    }

    async function changeback(value) {
        color = value;
        var UTheme = {
            Mail: user.Mail,
            theme: value
        }
        try {
            await fetch(apiUrl + 'User/Theme', {
                method: 'PUT',
                body: JSON.stringify(UTheme),
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })

            })
            console.log("PutThemeSeccsed");
        } catch (error) {
            console.log('ErrorPutScoreHeader', error);
        }

    };

    function saveSettings() {
        localStorage.setItem("color", color)
        history.push('/HomePage');
    }


    return (

        <div className={classes.root}>
            <div>
                <Header Color={color} className={classes.title} title={'הגדרות'} goBack={'/HomePage'} />
            </div>
            <br />
            <h4>בחר תמונת פרופיל</h4>
            <ImagesList></ImagesList>
            {/* <Typographyv id="continuous-slider" gutterBottom>
                עוצמת קול
            </Typographyv>
            <Grid className={classes.slid} container spacing={2}>
                <Grid item>
                    <VolumeDown />
                </Grid>
                <Grid item xs>
                    <Sliderv value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
                </Grid>
                <Grid item>
                    <VolumeUp />
                </Grid>
            </Grid>
            <Divider variant="middle" />
            <br />
            <Typographyt id="discrete-slider-small-steps" gutterBottom>
                גודל כתב
      </Typographyt>
            <Slidert className={classes.slid}
                defaultValue={3}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-small-steps"
                step={1}
                marks
                min={0}
                max={5}
                valueLabelDisplay="auto"
            /> */}
           
            <div className={classes.theme}>
            <h4>בחר ערכת נושא</h4>
                <Button onClick={() => changeback("#AF7AC5")} style={{ backgroundColor: "#AF7AC5", fontFamily: 'Rubik' }} >סגול</Button>
                <Button onClick={() => changeback("#2980B9")} style={{ backgroundColor: "#2980B9", fontFamily: 'Rubik' }}>כחול</Button>
                <Button onClick={() => changeback("#38908F")} style={{ backgroundColor: "#38908F", fontFamily: 'Rubik' }}>ירוק</Button>
                <Button onClick={() => changeback("#9AD9DB")} style={{ backgroundColor: "#9AD9DB", fontFamily: 'Rubik' }}>תכלת</Button>
                <Button onClick={() => changeback("#F7BB86")} style={{ backgroundColor: "#F7BB86", fontFamily: 'Rubik' }}>כתום</Button>
                <Button onClick={() => changeback("#ffb3ba")} style={{ backgroundColor: "#ffb3ba", fontFamily: 'Rubik' }}>ורוד</Button>

            </div>
            <br />
            <Button
                type="submit"
                variant="contained"
                onClick={saveSettings}
                className={classes.submit}>
                שמור 
            </Button>
        </div>
    );

}
export default withRouter(Setting)

