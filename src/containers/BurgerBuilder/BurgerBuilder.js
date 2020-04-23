import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders';
import OrderSummary from '../../components/Burger/OrderedSummary/OrderedSummary';

const INGREDIENT_PRICES ={
    salad : 0.5,
    bacon : 0.7,
    cheese : 0.4,
    meat : 1.3
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice : 4,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
        .map(igkey=> {
            return ingredients[igkey];
        })
        .reduce((sum, el) => {
            return sum+ el;
        }, 0);
        this.setState({purchasable: sum > 0})
    }

    addIngredientHandler =(type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1 ;
        const updatedIngredients ={
            ...this.state.ingredients
        };
        updatedIngredients[type] =updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice : newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler=()=> {
        this.setState({purchasing: true})
    }
    
    purchaseCancelHandler= () =>{
        this.setState({purchasing: false})
    }

    purchaseContinueHandler =() =>{
       // alert('you continue!');
       this.setState({loading: true});   
       const order ={        
           ingredients : this.state.ingredients,
           price : this.state.price,
           customer :{
                name: 'ansari',
                address : {
                    street : 'New Bazar Street',
                    pincode : '628204',
                    country : 'india'
                },
                email : 'mdansariibrahim1@gmail.com',
            },
            deliveryMethod : 'fastest'
       }    
       axios.post('/order.json', order)
       .then(response =>{ 
        this.setState({loading: false, purchasing: false});
        })

       .catch(error => {
           this.setState({loading: false, purchasing: false});
       });
    }
    removeIngredientHandler =(type) =>{

        const oldCount = this.state.ingredients[type];
        if(oldCount<=0){
            return;
        }
        const updatedCount = oldCount - 1 ;
        const updatedIngredients ={
            ...this.state.ingredients
        };
        updatedIngredients[type] =updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice : newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    };

    render () {
        const disabledInfo ={
            ...this.state.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key]= disabledInfo[key]<=0 
        }    

        let orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler} />;
    if ( this.state.loading ) {
        orderSummary = <Spinner />;
    }


        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                     {orderSummary}
                </Modal>
                
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                ingredientAdded={this.addIngredientHandler} 
                ingredientRemoved= {this.removeIngredientHandler}   
                disabled= {disabledInfo}
                purchasable ={this.state.purchasable}
                ordered= {this.purchaseHandler}
                price={this.state.totalPrice} >
                </BuildControls>
            </Aux>
        );
    }
}

export default BurgerBuilder;