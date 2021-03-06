import React from 'react';
import burgerLogo from '../../assets/original.png';
import classes from './Logo.css';

const logo = (props) =>{
    return (
        <div className={classes.Logo} style={{height:props.height}}>
            <img src={burgerLogo} alt="logo"></img>
        </div>
    );
}

export default logo;