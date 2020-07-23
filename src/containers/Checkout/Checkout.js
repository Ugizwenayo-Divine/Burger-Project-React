import React,{Component} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/Contact-Data/Contact-Data';

class Checkout extends Component {
    state={
        ingredients:null,
        totalPrice:0,
    }
    componentWillMount(){
        let ingredients = {};
        let price=0;
        const query = new URLSearchParams(this.props.location.search);
        for(let param of query.entries()){
            if(param[0]==='price'){
                price = param[1];
            }
            else{
            ingredients[param[0]]= +param[1];
            }
        }
        console.log('prii',price);
        this.setState({ingredients:ingredients,totalPrice:price});
    }
    succedCheck = ()=>{
        this.props.history.replace('/checkout/contactData');
    }
    failCheck = ()=>{
        this.props.history.goBack();
    }
    render(){
        return(
            <div>
                <CheckoutSummary 
                ingredients={this.props.ingredients} 
                succedCheck={this.succedCheck}
                failCheck={this.failCheck} />
                <Route path={this.props.match.url+'/contactData'} exact component={ContactData}></Route>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return{
        ingredients:state.ingredients,
        totalPrice:state.price,  
    }
};

export default connect(mapStateToProps)(Checkout);