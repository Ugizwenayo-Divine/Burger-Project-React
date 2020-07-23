import React from 'react';
import classes from './Order.css';

 const order = (props) => {
     const ingredients=[];
     for (let ing in props.ingredients){
         ingredients.push({
             name:ing,
             amount:props.ingredients[ing],
         });
     }
     const output = ingredients.map(ingredient => {
     return(<span
     key={ingredient.name}
     style={{
        textTransform:'capitalize',
        display:'iniline-block',
        margin:'0 8px',
        border:'1px solid #ccc',
        padding:'5px',
    }}
     >{ingredient.name}({ingredient.amount})</span>)
     })
        return(
        <div className={classes.Order}>
            <p>Ingredients: {output} </p>
            <p>Total Price <strong>{Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
        )
 }

 export default order;