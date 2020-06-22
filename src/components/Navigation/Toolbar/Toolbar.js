import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import Navigation from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) =>{
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.sideDrawerOpen}/>
            <Logo height="80%"/>
            <nav className={classes.DesktopOnly}>
                {/* <Navigation items={['link','add','remove']}></Navigation> */}
                <Navigation />
            </nav>
        </header>
    );
};
export default toolbar;
