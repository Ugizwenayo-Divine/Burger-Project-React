import React, { Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS_PRICE = {
    salad:0.5,
    bacon:0.7,
    meat:1.3,
    cheese:0.4
}
class BurgerBuilder extends Component {
    state = {
        ingredients : {
            salad:0,
            cheese:0,
            bacon:0,
            meat:0,
        },
        totalPrice: 4,
        purchaseable:true,
        orderVisibility:false,
    }
    updatePurchaseState= (ingredient) => {
        const ingredients = {
            ...ingredient,
        }
        const array = Object.keys(ingredients);
        const valuesArray = array.map(ingr=>{
            return ingredients[ingr];
        });
        const sum = valuesArray.reduce((sum,val)=>{
            return sum+val;
        },0);
        console.log('sum',valuesArray,sum);
            this.setState({
                purchaseable:sum<=0,
            });
    }
    addIngredients = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type]=updatedCount;
        const additionalPrice = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice+ additionalPrice;
         this.setState({
             totalPrice:newPrice,
             ingredients:updatedIngredient,
         });
         this.updatePurchaseState(updatedIngredient);
    }
    removeIngredients = (type) => {
        if (this.state.ingredients[type]===0){
            return null;
        }
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount - 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type]=updatedCount;
        const deductedPrice = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - deductedPrice;
         this.setState({
             totalPrice:newPrice,
             ingredients:updatedIngredient,
         });
         this.updatePurchaseState(updatedIngredient);
    }
    displayOrderSummary = ()=>{
        this.setState({
            orderVisibility:true,
        });
    }
    hidOrderSummary = (event) =>{
        this.setState({
            orderVisibility:false,
        });
    }
    successOrder = (event) =>{
        alert('Well ordered');
    }
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0
        }

        return (
            <Aux>
                <Modal order={this.state.orderVisibility} clicked={this.hidOrderSummary}>
                    <OrderSummary 
                    ingredients={this.state.ingredients} 
                    total={this.state.totalPrice}
                    continue={this.successOrder}
                    cancel={this.hidOrderSummary}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                ingredientAdded={this.addIngredients}
                ingredientRemoved={this.removeIngredients}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                enable={this.state.purchaseable}
                click={this.displayOrderSummary}/>
            </Aux>
        )
    }
}

export default BurgerBuilder;
