import React from 'react';
import classes from './Order.css';

const order=(props)=>{

    const ingredients=[];
    for (let igName in props.ingredients){
        ingredients.push({
            name:igName,
            amount:props.ingredients[igName]
        });

    }

    const igOutput=ingredients.map(ig=>(
        <span style={{
            textTransform:'capitalize',
            display:'inline-block',
            border: '1px solid #ccc',
            padding: '8px',
            margin: '0 6px'
        }}>{ig.name} ({ig.amount})</span>
    ));
    return (
        <div className={classes.Order}>
            <p >Ingredients: {igOutput}</p>
            <p>price: <strong>{props.price.toFixed(2)} $</strong></p>
        </div>

    )

}

export default order;