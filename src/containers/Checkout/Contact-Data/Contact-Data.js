import React,{Component} from 'react';
import {connect} from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/spinner/Spinner';
import classes from './Contact_Data.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state={
        orders:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your E-mail'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
            },
            zipcode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Zip Code'
                },
                value:'',
                validation:{
                    required:true,
                    minlength:5,
                    maxlength:5,
                },
                valid:false,
                touched:false,
            },
            province:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your province'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your country'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
            },
            paymentMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest',displayValue:'Fastest'},
                        {value:'cheapest',displayValue:'Cheapest'}
                    ]
                },
                value:'',
                valid:true,
                touched:false,
            },
            },
        isFormValid:false,
        loading:false,
    }
    validateElement =(value,rules)=>{
        let isValid=true;
        if (!rules){
            return true;
        }
            if(rules.required){
                isValid = value.trim() !== '' && isValid;
            }
            if(rules.minlength){
                isValid = value.length >= rules.minlength && isValid;
            }
            if(rules.maxlength){
                isValid = value.length <= rules.maxlength && isValid;
            }
        return isValid;
    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading:true});
        const formData = {};
        for(let element in this.state.orders){
            formData[element]=this.state.orders[element].value;
        }
        const order = {
            ingredients:this.props.ingredients,
            totalPrice:this.props.totalPrice,
            orderData:formData
        };
        axios.post('/orders.json',order)
        .then(response => {
            this.setState({loading:false});
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({loading:false});
        });
    }
    inputChangeHandler = (event,identifier) => {
        const updatedForm = {
            ...this.state.orders
        };
        const updatedFormElement = {
            ...updatedForm[identifier]
        };
        let formValid=true;
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.validateElement(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedForm[identifier] = updatedFormElement;
        for(let key in updatedForm){
            formValid = updatedForm[key].valid && formValid;
        }
        this.setState({orders:updatedForm, isFormValid:formValid});
    }
    render(){
        let formElements = [];
        for (let key in this.state.orders){
            formElements.push({
                id:key,
                config:this.state.orders[key]
            })
        }
        let form=(                
        <form onSubmit={this.orderHandler}>
            {formElements.map(formElement=>{
                return(
                <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig} 
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    touched={formElement.config.touched}
                    shouldUpdate={formElement.config.validation}
                    changed={(event) => this.inputChangeHandler(event,formElement.id)}
                />)
            })}
            <Button btnType='Success' disabled={!this.state.isFormValid}>ORDER</Button>
        </form>);
        if(this.state.loading){
            form=<Spinner/>
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return{
        ingredients:state.ingredients,
        totalPrice:state.price,  
    }
};

export default connect(mapStateToProps)(ContactData);