import React, { useContext, useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { withRouter, useHistory } from 'react-router-dom';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
import PowerSettingsNewOutlinedIcon from '@material-ui/icons/PowerSettingsNewOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Badge from '@material-ui/core/Badge';
//Context Api
import { UserDetailsContext } from '../Contexts/UserDetailsContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: 'Suez One',
    fontSize: 30,
    fontWeight: 'bolder',
  },
  backBtn: {
    color: 'white',
    marginLeft: 15,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#d9e6f2'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  list: {
    direction: 'ltr',
  },
  toolBar: {
    backgroundColor: '#6699cc'
  }
}));

const drawerWidth = 240;

function Header(props) {
  //ContextApi
  const { UserDetails } = useContext(UserDetailsContext);
  const user = UserDetails;

  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const [color, setColor] = useState(user.Theme);
  const [badgeContent, setBadgeContent] = useState(0);
  const [notification, setNotification] = useState();

  var local = false;
  var apiUrl = 'http://proj.ruppin.ac.il/bgroup11/prod/api/'
  if (local) {
    apiUrl = 'http://localhost:50664/api/'
  }

  useEffect(() => {
    GetNotifications()
}, []);

const GetNotifications = async () => {
  var c = localStorage.getItem("color");
  if (color !== c) {
    setColor(c);
  }
  try {
    const res = await fetch(apiUrl + 'Notifications/' + user.Mail + '/', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
      })
    })
    let result = await res.json();
    console.log("GetNotifications:",result);
    setBadgeContent(result.length);
    setNotification(result);
  } catch (error) {
    console.log("ErrorGetNotifications", error);
  }
}

  //עדכון ניקוד למשתמש בDB
  const PutScore = async () => {
    var score = {
      Mail: user.Mail,
      Score: user.Score
    }
    try {
      await fetch(apiUrl + 'User/Score', {
        method: 'PUT',
        body: JSON.stringify(score),
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
        })
      })
    } catch (error) {
      console.log('ErrorPutScoreHeader', error);
    }
  }

  const GoBack = () => {
    PutScore();
    history.push('/HomePage');
  }

  const handleDrawerOpen = () => {
    PutScore();
    setOpen(true);
  };

  const handleDrawerClose = () => {
    PutScore();
    setOpen(false);
  };

  function GoOut() {
    PutScore();
    history.push('/');
  };

  function GoToSetting() {
    PutScore();
    history.push('/Setting');
  };

  function GoToEditProfile() {
    PutScore();
    history.push('/EditProfile');
  };

  function GoToPrivateArea() {
    PutScore();
    history.push('/PrivateArea');
  };

  function GoToNotification() {
    PutScore();
    setBadgeContent(0);
    history.push('/Notification', { params: notification });
  };

  const handleBagde = (value)=>{
    console.log(value);
    
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: color }} Bagdge={handleBagde}>
          <ArrowForwardIosIcon className={classes.backBtn} onClick={GoBack} />
          <Badge badgeContent={badgeContent} color="error">
            <NotificationsNoneIcon onClick={GoToNotification} />
          </Badge>
          <Typography variant="h6" className={classes.title}>
            {props.title}
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />

        <List className={classes.list}>
          <ListItem button>
            <ListItemIcon> <AccountCircleOutlinedIcon onClick={GoToPrivateArea} /></ListItemIcon>
            <ListItemText primary='אזור אישי' onClick={GoToPrivateArea} />
          </ListItem>
          <ListItem button>
            <ListItemIcon> <SettingsOutlinedIcon onClick={GoToSetting} /></ListItemIcon>
            <ListItemText primary='הגדרות' onClick={GoToSetting} />
          </ListItem>
          <ListItem button>
            <ListItemIcon> <EditOutlinedIcon onClick={GoToEditProfile} /></ListItemIcon>
            <ListItemText primary='עריכת פרופיל' onClick={GoToEditProfile} />
          </ListItem>
          <ListItem button>
            <ListItemIcon> <PowerSettingsNewOutlinedIcon onClick={GoOut} /></ListItemIcon>
            <ListItemText primary='התנתק' onClick={GoOut} />
          </ListItem>

        </List>
        <Divider />
      </Drawer>
    </div>
  );

}
export default withRouter(Header);