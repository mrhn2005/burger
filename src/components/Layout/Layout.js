import React,{Component} from 'react';
import Aux1 from '../../hoc/Aux1';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
class Layout extends Component{
    state={
        sidebarVisible:false,
    }
    backDropCloseHandler=()=>{
        this.setState({
            sidebarVisible:false,
        })
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return {sidebarVisible: !prevState.sidebarVisible };
        } );
    }


    render() {
        return (
         <Aux1>
             <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
             <SideDrawer open={this.state.sidebarVisible} closed={this.backDropCloseHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux1>
        )
    }

}

export default Layout;