import React, { useContext,useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { makeStyles, Divider } from '@material-ui/core';
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
import ButtonGroup from '@material-ui/core/ButtonGroup';

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
    }

}));


const Setting = () => {
    //ContextApi
    const { UserDetails } = useContext(UserDetailsContext);
    const user = UserDetails;
    const classes = useStyles();
    const history = useHistory();
    const [color, setColor]= useState({});;
    

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
    var apiUrl = 'http://proj.ruppin.ac.il/bgroup11/prod/api/'
    if (local) {
        apiUrl = 'http://localhost:50664/api/'
    }

    async function changeback(value) {
        setColor(value);
        console.log(color);
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
        localStorage.setItem("color",color)
        history.push('/HomePage');
    }

    return (

        <div className={classes.root}>
            <div>
                <Header Color={color} className={classes.title} title={'הגדרות'} />
            </div>
            <br />
            <Typographyv id="continuous-slider" gutterBottom>
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
            />

            <br></br>
            <div className={classes.theme}>

                <Button onClick={() => changeback("#CE86F7")} style={{ backgroundColor: "#CE86F7" }} >סגול</Button>
                <Button onClick={() => changeback("#6699cc")} style={{ backgroundColor: "#6699cc" }}>כחול</Button>
                <Button onClick={() => changeback("#8AF786")} style={{ backgroundColor: "#8AF786" }}>ירוק</Button>
                <Button onClick={() => changeback("#F2F786")} style={{ backgroundColor: "#F2F786" }}>צהוב</Button>
                <Button onClick={() => changeback("#F7BB86")} style={{ backgroundColor: "#F7BB86" }}>כתום</Button>
                <Button onClick={() => changeback("#F786C1")} style={{ backgroundColor: "#F786C1" }}>ורוד</Button>

            </div>
            <Button
                    type="submit"
                    variant="contained"
                    onClick={saveSettings}
                    className={classes.submit}>
                    שמור הגדרות
                    
            </Button>

        </div>
    );

}
export default Setting;
