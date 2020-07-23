import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
const burger = (props) => {
    console.log('ty', props.ingredients);
    let transformedIngredients = Object.keys(props.ingredients)
    .map(ing => {
        return [...Array(props.ingredients[ing])].map((n,i) => {
            return <BurgerIngredient key = {ing + i} type = {ing} />
        })
    })
    .reduce((preArr,curArr) => {
        return preArr.concat(curArr);
    },[]);
    console.log(transformedIngredients);
    if(transformedIngredients.length === 0){
        transformedIngredients=<p>Start entering ingredients!!!</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
                {transformedIngredients}
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>
        </div>

    );
};

export default burger;