import React, {Component} from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    componentWillUpdate(){
        console.log('will update');
    }
    render(){
    const ingredients = this.props.ingredients;
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
            <p><strong>Total Price:{this.props.total.toFixed(2)}</strong></p>
            <p>Want to continue?</p>
            <Button btnType="Success" clicked={this.props.continue}>CONTINUE</Button>
            <Button btnType="Danger" clicked={this.props.cancel}>CANCEL</Button>
        </Aux>
    )
}}
export default OrderSummary;