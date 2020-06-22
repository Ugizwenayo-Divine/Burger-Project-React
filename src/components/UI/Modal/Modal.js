import React, {Component} from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.order !== this.props.order;
    }
    render(){
    return (
        <Aux>
            <Backdrop show={this.props.order} clicked={this.props.clicked}></Backdrop>
        <div className={classes.Modal} style={{
            transform:this.props.order? 'translateY(0)':'translateY(-100vh)'
        }}>
        {this.props.children}
    </div>
    </Aux>
    )
    }
}

export default Modal;
