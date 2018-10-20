import React from 'react';
import Aux1 from '../../../hoc/Aux1';
import Button from '../../UI/Button/Button';
const orderSummary=(props)=>{
    const ingredients=Object.keys(props.ingredients).map(item=>{
        return <li key={item}> <span>{item}</span>: {props.ingredients[item]} </li>
    })
    return (
        <Aux1>
            <h3>Your Order </h3>
            <p> A delicious burger with following ingredients:</p>
            <ul>
                {ingredients}
            </ul>
            <p>Total Price: <strong>{props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout? </p>
            <Button btnType="Danger" clicked={props.modalDisabled}>
                Cancel
            </Button>
            <Button btnType="Success" clicked={props.purchseContinues}>
                Continue
            </Button>
        </Aux1>
    )
}

export default orderSummary;