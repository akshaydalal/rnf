import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types'

 class NavBar extends Component {
    constructor(){
        super();
        this.state={
          activeTab:'/', }
        }
        componentDidMount(){
            this.setState({activeTab:window.location.pathname})
    }
    logout=()=>{
     let loggedInUser={}      
      sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
      sessionStorage.setItem('isLoggedIn','false');
      window.location.reload();

          }    
  render() {
    return (
        <div className="header">
         { !this.props.isLoggedIn &&<Link to="/" className="logo" >rnf</Link> }
       { this.props.isLoggedIn && <Link to="/" className="logo" >{this.props.loggedInUser.name}</Link>}
        
          <div className="header-right">
            <Link to="/" onClick={e=>this.setState({activeTab:'/'})} className={this.state.activeTab=='/' ? 'active' :''} >Create</Link>
            <Link to="/poll" onClick={e=>this.setState({activeTab:'/poll'})} className={this.state.activeTab=='/poll' ? 'active' :''} >Poll</Link>            
            <Link to="/stats" onClick={e=>this.setState({activeTab:'/stats'})} className={this.state.activeTab=='/stats' ? 'active' :''} >Stats</Link>            
           { this.props.isLoggedIn && <a onClick={e=>this.logout()}>Logout</a>  }          
             
          </div>
        </div> 
    )
  }
}
const mapStateToProps=state=>({
    loggedInUser:state.addUser.loggedInUser,
    isLoggedIn:state.addUser.isLoggedIn
})
NavBar.propTypes={   
    loggedInUser:PropTypes.object.isRequired,   
    isLoggedIn:PropTypes.bool.isRequired
  }
export default connect(mapStateToProps,{})(NavBar);
