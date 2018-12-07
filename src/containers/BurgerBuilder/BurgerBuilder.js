import React, { Component } from 'react';
import {connect} from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Aux1 from '../../hoc/Aux1';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {addIngredient,removeIngredient,initIngredients} from '../../store/actions/burgerBuilder';



class BurgerBuilder extends Component{
    state={
        totalPrice:4,
        purchasing:false,
        loading:false,
    }
    componentDidMount(){
        this.props.onInitIngredients();
    }
    // componentDidMount(){
    //     axios.get('/ingredients.json')
    //     .then(response=>{
    //         this.setState({ingredients:response.data});
    //     }).catch(error=>{
    //         this.setState({error:true});
    //     });
    // }
    // updatePutchaseState=(ingredients)=>{
    //     const sum = Object.keys( ingredients )
    //         .map( igKey => {
    //             return ingredients[igKey];
    //         } )
    //         .reduce( ( sum, el ) => {
    //             return sum + el;
    //         }, 0 );
    //     this.setState( { purchasable: sum > 0 } );
    // }
    updatePurchase=()=>{
        console.log(this.props.totalPrice);
        return this.props.totalPrice>4;
    }

    purchaseHandler=()=>{
        this.setState({
            purchasing:true
        })
    }
    purchaseCancelHandler=()=>{
        this.setState({
            purchasing:false
        })  
    }

    purchaseContinueHandler=()=>{
        // alert('you continue!') ;
        // this.setState({
        //     loading:true
        // })
        // const order={
        //     ingredients:this.state.ingredients,
        //     price:this.state.totalPrice,
        //     customer:{
        //         name: 'Masoud',
        //         email: 'test@test.com',
        //         address:{
        //             street:'testStreet',
        //             contoury:'iran'
        //         }
        //     }
        // };
        // axios.post('/orders.json',order).then(
        //     response=>{
        //         this.setState({
        //             purchasing:false,
        //             loading:false
        //         })  
        //         console.log(response)}
        // ).catch(
        //     error=>{
        //         console.log(error);
        //         this.setState({
        //             purchasing:false,
        //             loading:false
        //         })
        //     }
        // )
        // const queryParams = [];
        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });
        this.props.history.push('/checkout');
    }

    render(){

        let orderSummary=null;
          
        const disabledInfo={
            ...this.props.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0;
        }

        let order=this.props.error?<p>somthing went wrong!</p>:<Spinner/>;

        if (this.props.ingredients){
            order =
                <Aux1>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls 
                        disabled={disabledInfo}
                        addIngredient={this.props.onIngredientAdded}
                        removeIngredient={this.props.onIngredientRemoved}
                        price={this.props.totalPrice}
                        ordered={this.purchaseHandler}
                        purchasable={this.updatePurchase()}
                        />
                </Aux1>;
            orderSummary=<OrderSummary ingredients={this.props.ingredients}
            modalDisabled={this.purchaseCancelHandler} 
            purchseContinues={this.purchaseContinueHandler}
            price={this.props.totalPrice}
            />
        }
        if(this.state.loading){
            orderSummary=<Spinner/>
        }  
        return (
            <Aux1>
                <Modal show={this.state.purchasing} modalDisabled={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {order}
            </Aux1>
        );
    };
}

const mapStateToProps=state=>{
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        error: state.error
    };
}

const mapDispatchToProps=dispatch=>{
    return {
        onIngredientAdded: (ingName) => dispatch(addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(removeIngredient(ingName)),
        onInitIngredients: ()=>dispatch(initIngredients())
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));