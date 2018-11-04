import React,{Component} from 'react';
import {Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
class Checkout extends Component {
    state={
        ingredients:{
            salad:1,
            meat:1,
            bacon:1,
            cheese:1
        }
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            // ['salad', '1']
            ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients: ingredients});
    }

    cancelHandler=()=>{
        this.props.history.goBack();
    }

    continueHandeler=()=>{
        this.props.history.replace(this.props.match.path+'/contact-data');
    }

    render(){
        
        return (
            <div>
                <CheckoutSummary 
                ingredients={this.state.ingredients} 
                cancel={this.cancelHandler}
                continue={this.continueHandeler}
                />
                <Route path={this.props.match.path+'/contact-data'} component={ContactData} />
            </div>
        )
    }
}


export default Checkout;