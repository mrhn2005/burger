import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
class Orders extends Component {
    state={
        orders:[],
        loading:true
    }

    componentWillMount(){
        axios.get('/orders.json')
        .then(response=>{
            let fetchedOrders=[];
            for(let key in response.data){
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                });
            }
            this.setState({loading:false,orders:fetchedOrders});
        }).catch(error=>{
            this.setState({loading:false});
        });
    }
    // orders=this.state.orders.map
    render(){

        return (
            <div>
            {this.state.orders.map(order=><Order price={+order.price} ingredients={order.ingredients}/>)}
            </div>
        )
    }
}
export default withErrorHandler(Orders,axios);