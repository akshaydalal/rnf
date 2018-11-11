import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Provider} from 'react-redux';

import './App.css';
import '../node_modules/bulma/css/bulma.css'
import Create from './components/create';
import Poll from './components/poll';
import Stats from './components/stats';
import SignUpIn from './components/signUpIn';
import NavBar from './components/navBar';
import store from './store';
class App extends Component {
 
  componentWillMount(){  
 
// let isLoggedIn= sessionStorage.getItem('isLoggedIn');
// if(isLoggedIn==null)
// {sessionStorage.setItem('isLoggedIn', 'false')
//  this.setState({isLoggedIn:false})
// }
// else{
//   if(isLoggedIn=='false'){
//     this.setState({isLoggedIn:false})
//   }
//   else{
//     this.setState({isLoggedIn:true})
//   }
// }
}
 
  render() {
    return (
      <Provider store={store}>
      <Router>
        <div>         
          <NavBar /> 
          <SignUpIn /> 
          
          <Route exact path="/" component={Create} />        
          <Route path="/poll" component={Poll} />
          <Route path="/stats" component={Stats} />

          
        </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
