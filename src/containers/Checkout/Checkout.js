import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    render() {
        state={
            ingredients: {
                salad: 1,
                meat : 1,
                cheese: 1,
                bacon: 1
            }
        }
        return(

            <div>
                <CheckoutSummary ingredients={this.props.ingredients}/>
            </div>
        )
    }

}

export default Checkout;