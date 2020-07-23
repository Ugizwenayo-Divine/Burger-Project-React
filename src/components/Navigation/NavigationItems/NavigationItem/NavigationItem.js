import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './NavigationItem.css';
const navigationItem = (props) => {
    return(
            // props.children.map(item => {
            //     return <li className={classes.NavigationItem}><a>{item}</a></li>
            // })
            <li className={classes.NavigationItem}><NavLink to={props.link} exact={props.exact}>{props.children}</NavLink></li>
    )
};
export default navigationItem;