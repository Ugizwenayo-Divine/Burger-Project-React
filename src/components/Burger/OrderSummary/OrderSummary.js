import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const ingredients = props.ingredients;
    const ingredient = Object.keys(ingredients)
    .map(ingr=>{
        return <li key={ingr+1}><span style={{
            textTransform:'capitalize'
        }}>{ingr}</span> : {ingredients[ingr]}</li>;
    })
    return (
        <Aux>
            <h2>Your Order:</h2>
            <p>Your burger descriptions:</p>
            <ul>
                {ingredient}
            </ul>
            <p><strong>Total Price:{props.total.toFixed(2)}</strong></p>
            <p>Want to continue?</p>
            <Button btnType="Success" clicked={props.continue}>CONTINUE</Button>
            <Button btnType="Danger" clicked={props.cancel}>CANCEL</Button>
        </Aux>
    )
}
export default OrderSummary;