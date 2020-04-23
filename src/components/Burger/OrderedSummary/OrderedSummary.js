import React from 'react';
import Button from '../../UI/Button/Button';
import Aux from '../../../hoc/Auxiliary';

const orderSummary =(props) => {
 const ingredientSummary = Object.keys(props.ingredients)
 .map(igkey => {
     return(
          <li key={igkey} >
              <span style={{textTransform: 'capitalize'}} >{igkey}</span>: {props.ingredients[igkey]}
          </li>
          )


 })
    return (
        <Aux>
            <h3>Your Order</h3>
            <p> A delicious burger with following ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total Price : ${props.price}</p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked ={props.purchaseCanceled} >CANCEL</Button>
            <Button btnType="Success" clicked ={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    )
};

export default orderSummary;