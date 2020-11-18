/* Header JS */
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    navTitle:{
        flex:1,
        justifyContent: 'space-between'
    }
  }));


function Header() {
    const classes = useStyles();
    
    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar className={classes.navTitle}>
                    <NavLink
                    exact 
                      to="/"
                      activeStyle={{
                        fontWeight: "bold",
                        color: "red"
                      }} 
                      style={{color:'#fff',textDecoration:'none', fontWeight:'bold'}}>
                        Home
                    </NavLink>
                    <NavLink
                      exact  
                      to="/myfav"
                      activeStyle={{
                        fontWeight: "bold",
                        color: "red"
                      }} 
                      style={{color:'#fff',textDecoration:'none', fontWeight:'bold'}}>
                      My Favourite
                    </NavLink>
                </Toolbar>
            </AppBar>
            
        </React.Fragment>
    )
}

export default Header;


