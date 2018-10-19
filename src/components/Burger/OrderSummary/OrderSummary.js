import React from 'react';
import Aux1 from '../../../hoc/Aux1';
const orderSummary=(props)=>{
    const ingredients=Object.keys(props.ingredients).map(item=>{
        return <li> <span>{item}</span>: {props.ingredients[item]} </li>
    })
    return (
        <Aux1>
            <h3>Your Order </h3>
            <p> A delicious burger with following ingredients:</p>
            <ul>
                {ingredients}
            </ul>
            <p>Continue to checkout? </p>
        </Aux1>
    )
}

export default orderSummary;