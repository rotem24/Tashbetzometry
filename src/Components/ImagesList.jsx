import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Button from '@material-ui/core/Button';
import { useHistory, withRouter } from 'react-router-dom';
//import tileData from './tileData';
import bob from '../IMG/bobspong.jpg';
import miki from '../IMG/mikimaous.jpg';
import mini from '../IMG/minimaous.png';
import poo from '../IMG/poo.gif';
//Context Api
import { UserDetailsContext } from '../Contexts/UserDetailsContext';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    img: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    choose: {
        backgroundColor: "white",
        textAlign: 'center',

    }
}));

const tileData = [
    {
        img: bob,
    },
    {
        img: miki,
    },
    {
        img: mini,
    },
    {
        img: poo,
    },
];
const ImagesList = () => {
    //ContextApi
    const { UserDetails } = useContext(UserDetailsContext);
    const user = UserDetails;

    var local = true;
    var apiUrl = 'http://proj.ruppin.ac.il/bgroup11/prod/api/'
    if (local) {
        apiUrl = 'http://localhost:50664/api/'
    }

    const ChangePhoto = async (value) => {
        var UPhoto = {
            Mail: user.Mail,
            Photo: value
        }
        
        localStorage.setItem("Photo", JSON.stringify(value))
        // try {
        //     await fetch(apiUrl + 'User/Photo', {
        //         method: 'PUT',
        //         body: JSON.stringify(UPhoto),
        //         headers: new Headers({
        //             'Content-Type': 'application/json; charset=UTF-8',
        //         })

        //     })
        //     console.log("PutPhotoSeccsed");
           
        // } catch (error) {
        //     console.log('ErrorPutPhoto', error);
        // }
    }

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={2.5}>
                {tileData.map((tile) => (
                    <GridListTile key={tile.img}>
                        <img src={tile.img} alt={tile.title} />
                        <GridListTileBar
                            actionIcon={
                                <IconButton className={classes.choose} onClick={() => ChangePhoto(tile.img)}>
                                    בחר
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );

}

export default ImagesList;