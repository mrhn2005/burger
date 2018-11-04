import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component {
    state={
        name:'',
        email:'',
        address:{
            street:'',
            potsalCode:''
        }
    };

    render(){

        return (
            <div className={classes.ContactData}>
                <h4 >Enter your Contact Information</h4>
                <form>
                    <input className={classes.Input} type='text' name='name' placeholder='Your Name:' />
                    <input className={classes.Input} type='email' name='email' placeholder='Your Email:' />
                    <input className={classes.Input} type='text' name='street' placeholder='Your Street:' />
                    <input className={classes.Input} type='text' name='postalCode' placeholder='Your PostalCode:' />
                    <Button btnType="Success">Submit</Button>
                </form>
            </div>
        )
    };
}

export default ContactData;