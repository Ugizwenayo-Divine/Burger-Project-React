import React, { Component} from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';
import * as actionTypes from '../../store/actions/actions';


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
        return sum<=0;
    }
    addIngredients = (type) =>{
        const oldCount = this.props.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredient = {
            ...this.props.ingredients
        };
        updatedIngredient[type]=updatedCount;
        const additionalPrice = this.props.totalPrice[type];
        const oldPrice = this.props.totalPrice;
        const newPrice = oldPrice+ additionalPrice;
         this.setState({
             totalPrice:newPrice,
             ingredients:updatedIngredient,
         });
         this.updatePurchaseState(updatedIngredient);
    }
    removeIngredients = (type) => {
        if (this.props.ingredients[type]===0){
            return null;
        }
        const oldCount = this.props.ingredients[type];
        const updatedCount = oldCount - 1;
        const updatedIngredient = {
            ...this.props.ingredients
        };
        updatedIngredient[type]=updatedCount;
        const deductedPrice = this.props.totalPrice[type];
        const oldPrice = this.props.totalPrice;
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
        const queryParam = [];
        for( let i in this.props.ingredients){
            queryParam.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]));
        }
        queryParam.push('price='+this.props.totalPrice);
        const queryString = queryParam.join('&');
        console.log('222Q', queryString);
        this.props.history.push({
            pathname:'/checkout',
            search: queryString
        });
    }
    render() {
        const disabledInfo = {
            ...this.props.ingredients
        }
        for (let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0
        }
        let burger = this.state.error ? <p>Ingredients can't be loaded</p>:<Spinner/>;
        let orderSummary = null;
        if (this.props.ingredients){
            orderSummary = <OrderSummary 
                ingredients={this.props.ingredients} 
                total={this.props.totalPrice}
                continue={this.successOrder}
                cancel={this.hidOrderSummary}/>;
            burger=<Aux>
                        <Burger ingredients={this.props.ingredients} />
                        <BuildControls
                            ingredientAdded={this.props.addIngredients}
                            ingredientRemoved={this.props.removeIngredients}
                            disabled={disabledInfo}
                            price={this.props.totalPrice}
                            enable={this.updatePurchaseState(this.props.ingredients)}
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
const mapStateToProps = state => {
    return{
        ingredients:state.ingredients,
        totalPrice:state.price,  
    }
};

const mapDispatchToProps = dispatch => {
    return{
        addIngredients: (ingName) => dispatch({type:actionTypes.ADD_INGREDIENTS, ingredientName :ingName}),
        removeIngredients: (ingName) => dispatch({type:actionTypes.REMOVE_INGREDIENTS, ingredientName: ingName}),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)( withErrorHandler(BurgerBuilder,axios));
