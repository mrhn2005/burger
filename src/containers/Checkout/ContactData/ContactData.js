import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';

import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state={
        name:'',
        email:'',
        address:{
            street:'',
            potsalCode:''
        },
        loading:false,
        totalPrice:4.5,
    };

    orderHandler=()=>{
        this.setState({
                loading:true
            })
            const order={
                ingredients:this.props.ingredients,
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
                    console.log(response);
                    this.props.history.push('/');
                }
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
        let form=(<form>
            <input className={classes.Input} type='text' name='name' placeholder='Your Name:' />
            <input className={classes.Input} type='email' name='email' placeholder='Your Email:' />
            <input className={classes.Input} type='text' name='street' placeholder='Your Street:' />
            <input className={classes.Input} type='text' name='postalCode' placeholder='Your PostalCode:' />
            <Button btnType="Success"clicked={this.orderHandler}>Order</Button>
        </form>);
        if (this.state.loading){
            form=<Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4 >Enter your Contact Information</h4>
                {form}
            </div>
        )
    };
}

export default ContactData;