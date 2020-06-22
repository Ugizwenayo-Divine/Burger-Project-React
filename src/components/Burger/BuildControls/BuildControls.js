import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
const controls = [
    {label:'Salad', type:'salad'},
    {label:'Bacon', type:'bacon'},
    {label:'Cheese', type:'cheese'},
    {label:'Meat', type:'meat'},
]
const buildControls = (props) =>{
    return(
        <Aux>
            <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
            <div className={classes.BuildControls}>
                {controls.map(control => (
                    <BuildControl  
                    key={control.type} 
                    label={control.label}
                    add={() => props.ingredientAdded(control.type)}
                    remove={() => props.ingredientRemoved(control.type)}
                    disabled={props.disabled[control.type]}/>
                ))}
            </div>
            <button className={classes.OrderButton} disabled={props.enable} onClick={props.click}>ORDER NOW</button>
        </Aux>
    );
}
export default buildControls;