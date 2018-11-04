import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Aux1 from '../../hoc/Aux1';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component{
    state={
        ingredients:null,
        totalPrice:4,
        purchasable:false,
        purchasing:false,
        loading:false,
        error:false,
    }
    componentDidMount(){
        axios.get('/ingredients.json')
        .then(response=>{
            this.setState({ingredients:response.data});
        }).catch(error=>{
            this.setState({error:true});
        });
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
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render(){

        let orderSummary=null;
          
        const disabledInfo={
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0;
        }

        let order=this.state.error?<p>somthing went wrong!</p>:<Spinner/>;

        if (this.state.ingredients){
            order =
                <Aux1>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                        disabled={disabledInfo}
                        addIngredient={this.addIngredientHandler}
                        removeIngredient={this.removeIngredientHandler}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler}
                        purchasable={this.state.purchasable}
                        />
                </Aux1>;
            orderSummary=<OrderSummary ingredients={this.state.ingredients}
            modalDisabled={this.purchaseCancelHandler} 
            purchseContinues={this.purchaseContinueHandler}
            price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder,axios);