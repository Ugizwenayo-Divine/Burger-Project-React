import React from 'react';
import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import Navigations from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const sideDrawer = (props) => {
    let realClasses = [classes.SideDrawer, classes.Close];
    if(props.open){
        realClasses = [classes.SideDrawer, classes.Open];
    }
    return(
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
        <div className={realClasses.join(' ')}>
            <div className={classes.Logo}>
                <Logo/>
            </div>
            <nav>
                <Navigations/>
            </nav> 
        </div>
        </Aux>
    )
};
export default sideDrawer;