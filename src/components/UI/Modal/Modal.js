import React,{Component} from 'react';

import classes from './Modal.css';
import Backdrop from '../Backdrop/Bakdrop';
import Aux1 from '../../../hoc/Aux1';

class Modal extends Component{
    shouldComponentUpdate(nextProps,nextState){
        return nextProps.show!==this.props.show;
    }
    // componentWillUpdate(){
    //     console.log('hi');
    // } 

    render(){
        return(
            <Aux1>
            <Backdrop show={this.props.show} clicked={this.props.modalDisabled} />
            <div className={classes.Modal}
            style={{
                transform: this.props.show?'translateY(0)':'translateY(-100vh)',
                opacity:  this.props.show?'1':'0',
            }}>
                {this.props.children}
            </div>
        </Aux1>
        )
    }
}

export default Modal;