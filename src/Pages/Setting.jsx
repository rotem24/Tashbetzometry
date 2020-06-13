import React, { useContext } from 'react';
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
function valuetext(A) {
    return 'A';
}
function changeback() {
    console.log('in');
    alert("in");//מפה ישלח את הצבע להדר וישנה את הבאקגרונדקולוק

}

const Setting = () => {
    //ContextApi
    const { UserDetails } = useContext(UserDetailsContext);
    const user = UserDetails;
    const classes = useStyles();

    //volume
    const [value, setValue] = React.useState(30);

    //fontsize
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (

        <div className={classes.root}>
            <div>
                <Header className={classes.title} title={'הגדרות'} />
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

                <Button onclick={changeback} style={{ backgroundColor: "#CE86F7" }}>סגול</Button>
                <Button onclick={changeback} style={{ backgroundColor: "#8866F9" }}>כחול</Button>
                <Button onclick={changeback} style={{ backgroundColor: "#8AF786" }}>ירוק</Button>
                <Button onclick={changeback} style={{ backgroundColor: "#F2F786" }}>צהוב</Button>
                <Button onclick={changeback} style={{ backgroundColor: "#F7BB86" }}>כתום</Button>
                <Button onclick={changeback} style={{ backgroundColor: "#F786C1" }}>ורוד</Button>

            </div>

        </div>
    );

}
export default Setting;
