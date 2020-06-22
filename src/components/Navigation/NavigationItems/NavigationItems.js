import React from 'react';
import Navigation from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => {
    return(
        <ul className={classes.NavigationItems}>
        <Navigation link="/" active>Burger Builder</Navigation>
        <Navigation link="/">Checkout</Navigation>

        </ul>
    );
}
export default navigationItems;