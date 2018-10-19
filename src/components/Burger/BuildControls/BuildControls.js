import React from 'react';
import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.css';

const burgerControls=(props)=>{
    const controls=[
        {label:'Salad', type:'salad'},
        {label:'Meat', type:'meat'},
        {label:'Cheese', type:'cheese'},
        {label:'Bacon', type:'bacon'},
    ]
    return(
        <div className={classes.BuildControls}>
            <p>Total price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map((item)=>{
                return <BuildControl key={item.label} label={item.label}
                                     disabled={props.disabled[item.type]} 
                                     added={()=>props.addIngredient(item.type)}
                                     removed={()=>props.removeIngredient(item.type)}
                                     />
            })}
            <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>ORDER NOW</button>
        </div>
        
    )
}

export default burgerControls;