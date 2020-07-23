import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) =>{
    console.log('cheSu', props);
    return(
        <div className={classes.CheckoutSummary}>
            <h1>Hope you enjoy your burger!</h1>
            <div style={{width:'100%',margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
                <Button btnType='Success' clicked={props.succedCheck}>CONTINUE</Button>
                <Button btnType='Danger' clicked={props.failCheck}>CANCEL</Button>
            </div>
        </div>
    )
}

export default checkoutSummary;