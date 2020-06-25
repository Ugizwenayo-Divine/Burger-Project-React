import React, { Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';

const INGREDIENTS_PRICE = {
    salad:0.5,
    bacon:0.7,
    meat:1.3,
    cheese:0.4
}
class BurgerBuilder extends Component {
    state = {
        ingredients : null,
        totalPrice: 4,
        purchaseable:true,
        orderVisibility:false,
        loading: false,
        error:false,
    }
    componentDidMount(){
        axios.get('/ingredients.json')
        .then(response => {
            this.setState({ingredients:response.data})
        })
        .catch(error =>{
            this.setState({error:true})
        })
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
        this.setState({loading:true});
        const order = {
            ingredients:this.state.ingredients,
            totalPrice:this.state.totalPrice,
            customer:{
                name:'diny',
                email:'diny@test.com',
                address:{
                    street:'454gg',
                    zipcode:'250',
                    province:'west',
                    country:'Rwanda',
                },
                paymentMethod:'mobile money',
            }
        };
        axios.post('/orders.json',order)
        .then(response => {
            this.setState({loading:true, orderVisibility:false});
        })
        .catch(error => {
            this.setState({loading:true, orderVisibility:false});
        });
    }
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0
        }
        let burger = this.state.error ? <p>Ingredients can't be loaded</p>:<Spinner/>;
        let orderSummary = null;
        if (this.state.ingredients){
            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients} 
                total={this.state.totalPrice}
                continue={this.successOrder}
                cancel={this.hidOrderSummary}/>;
            burger=<Aux>
                        <Burger ingredients={this.state.ingredients} />
                        <BuildControls
                            ingredientAdded={this.addIngredients}
                            ingredientRemoved={this.removeIngredients}
                            disabled={disabledInfo}
                            price={this.state.totalPrice}
                            enable={this.state.purchaseable}
                            click={this.displayOrderSummary}/>
                    </Aux>
        }
         if (this.state.loading) {
             orderSummary = <Spinner />;
         }

        return (
            <Aux>
                <Modal order={this.state.orderVisibility} clicked={this.hidOrderSummary}>
                    {orderSummary}
                </Modal>
                    {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder,axios);
