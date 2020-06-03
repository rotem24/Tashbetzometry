import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Toolbar } from '@material-ui/core';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
//Context Api
import { UserDetailsContext } from '../Contexts/UserDetailsContext';

const useStyles = makeStyles((theme) => ({
    toolBar: {
        fontSize: 16,
        marginTop: 5,
        marginRight: 'auto',
        marginLeft: 'auto',
        fontWeight: 'bolder',
    },
    sendIcon: {
        marginRight: 220,
    }
}));


const ToolBar = (props) => {
    //ContextApi
    const { UserDetails } = useContext(UserDetailsContext);
    const user = props.User;
    

    const classes = useStyles();
    const history = useHistory();

    const GoToContact = () => {
        history.push('/ContactList')
    }

    return (
        <div>
            <Toolbar className={classes.toolBar}> <MonetizationOnOutlinedIcon style={{ color: '#FFD700', paddingLeft: 3 }} />{user.Score}
                <SendOutlinedIcon className={classes.sendIcon} onClick={GoToContact} />
            </Toolbar>
        </div>
    );
}
export default ToolBar;
