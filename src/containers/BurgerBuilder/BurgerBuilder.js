import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Aux1 from '../../hoc/Aux1';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component{
    state={
        ingredients:{
            salad:0,
            meat:0,
            cheese:0,
            bacon:0,
        },
        totalPrice:4,
        purchasable:false,
        purchasing:false,
        loading:false,
    }

    updatePutchaseState=(ingredients)=>{
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        this.setState( { purchasable: sum > 0 } );
    }
    addIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePutchaseState(updatedIngredients);
    }

    removeIngredientHandler=(type)=>{
        const oldCount = this.state.ingredients[type];
        if(oldCount>0){
            const updatedCount = oldCount - 1;
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount;
            const priceAddition = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceAddition;
            this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
            this.updatePutchaseState(updatedIngredients);
        }
        

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
        this.setState({
            loading:true
        })
        const order={
            ingredients:this.state.ingredients,
            price:this.state.totalPrice,
            customer:{
                name: 'Masoud',
                email: 'test@test.com',
                address:{
                    street:'testStreet',
                    contoury:'iran'
                }
            }
        };
        axios.post('/orders.json',order).then(
            response=>{
                this.setState({
                    purchasing:false,
                    loading:false
                })  
                console.log(response)}
        ).catch(
            error=>{
                console.log(error);
                this.setState({
                    purchasing:false,
                    loading:false
                })
            }
        )
    }

    render(){

        let orderSummary=<OrderSummary ingredients={this.state.ingredients}
                        modalDisabled={this.purchaseCancelHandler} 
                        purchseContinues={this.purchaseContinueHandler}
                        price={this.state.totalPrice}
                        />
        if(this.state.loading){
            orderSummary=<Spinner/>
        }    
        const disabledInfo={
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0;
        }
        return (
            <Aux1>
                <Modal show={this.state.purchasing} modalDisabled={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    disabled={disabledInfo}
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler}
                    purchasable={this.state.purchasable}
                    />
            </Aux1>
        );
    };
}

export default BurgerBuilder;