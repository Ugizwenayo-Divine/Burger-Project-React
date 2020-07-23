import React from 'react';
import Navigation from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => {
    return(
        <ul className={classes.NavigationItems}>
        <Navigation link="/" exact>Burger Builder</Navigation>
        <Navigation link="/orders" exact>Orders</Navigation>

        </ul>
    );
}
export default navigationItems;