import React from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) =>{
    return (
        <Aux>
            <Backdrop show={props.order} clicked={props.clicked}></Backdrop>
        <div className={classes.Modal} style={{
            transform:props.order? 'translateY(0)':'translateY(-100vh)'
        }}>
        {props.children}
    </div>
    </Aux>
    );
}

export default modal;