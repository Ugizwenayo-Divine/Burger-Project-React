import React,{Component} from 'react';
import Order from '../../components/Order/Order';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import axios from '../../axios-orders';
import withErrors from '../../hoc/withErrorHandler/WithErrorHandler';

class Orders extends Component{
    state={
        orders:[],
        loading:true,
    }
    componentDidMount(){
        const fetchedOrders=[];
        axios.get('/orders.json')
        .then(res=>{
            this.setState({loading:true});
            for(let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id:key,
                });
            }
            this.setState({orders:fetchedOrders});
        })
        .catch(err=>{
            this.setState({loading:true});
        })
    }
    render(){
        return(
            <Aux>
                {this.state.orders.map(order=>(
                    <Order key={order.id} ingredients={order.ingredients} price={order.totalPrice}/>
                ))}
            </Aux>
        );
    }
}

export default withErrors(Orders,axios);