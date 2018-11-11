import React from 'react';
import {connect} from 'react-redux';
import {addUser,getUsers,logIn} from '../actions/userActions'; 
import PropTypes from 'prop-types'


 class SignUpIn extends React.Component {
   constructor(){
     super();
     this.state={
       email:'',
       name:'',
       password:'',
       isLoggedIn:false,
       activeTab:1,
       modalTitle:'Sign Up'
     }
   }
   componentWillMount(){
     this.props.getUsers()
  }

   changeValue=(e)=>{
     this.setState({[e.target.name]:e.target.value})
   }
  

  addUser=(e)=>{
    e.preventDefault();
    
    let userData={
      name:this.state.name,
      email:this.state.email,
      password:this.state.password
    }
    if(this.state.activeTab==2){
      this.signIn(userData);
      return
    }
    if(this.props.users.length>0){
      let existingUser=this.props.users.filter(user=>{
        return user.email==userData.email
      })
     if(existingUser.length>0){
       alert('Looks you are already registered')
     }
     else{
      this.props.addUser(userData)
     }

    }
    else
   { this.props.addUser(userData)}

  }

  signIn=(userData)=>{
    if(this.props.users.length>0){
      let existingUser=this.props.users.filter(user=>{
        return user.email==userData.email && user.password==userData.password
      })
     if(existingUser.length>0){
       this.props.logIn(existingUser[0])
     }
     else{
      alert('Email or Password is wrong')
     }

    }
    else
   { 
     alert('Please register first')
   }
  }
  render() {
    return (
      <div className={!this.props.isLoggedIn ? 'modal is-active' :'modal'}>
          <div className="modal-background"></div>
          <div className="modal-content">
          <div className="box">
          <header className="modal-head">
            <p className="modal-card-title">{this.state.modalTitle}</p>
          </header>
      <form onSubmit={this.addUser}>
       {this.state.activeTab === 1 && <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input className="input" name="name" required value={this.state.name} onChange={e=>this.changeValue(e)} type="text" placeholder="Name" />
            <span className="icon is-small is-left">
              <i className="fa fa-user"></i>
            </span>
            
          </p>
        </div>}
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input className="input" name="email" required value={this.state.email} onChange={e=>this.changeValue(e)} type="email" placeholder="Email" />
            <span className="icon is-small is-left">
              <i className="fa fa-envelope"></i>
            </span>            
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <input className="input" name="password" required value={this.state.password} onChange={e=>this.changeValue(e)} type="password" placeholder="Password" />
            <span className="icon is-small is-left">
              <i className="fa fa-lock"></i>
            </span>
          </p>
        </div>
        
        {this.state.activeTab==1 && <button type="submit" className="button is-success">Sign Up</button>}
        {this.state.activeTab==1 && <a onClick={e=>this.setState({activeTab:2,modalTitle:'Sign In'})} style={{marginLeft:10}}>Sign In</a> }
        {this.state.activeTab==2 && <button type="submit" className="button is-success">Sign In</button>}
        {this.state.activeTab==2 && <a onClick={e=>this.setState({activeTab:1,modalTitle:'Sign Up'})} style={{marginLeft:10}}>Sign Up</a> }
      </form>
      </div>
          </div>          
        </div> 
    );
  }
}

const mapStateToProps=state=>({
     users:state.addUser.users,
     isLoggedIn:state.addUser.isLoggedIn
})

SignUpIn.propTypes={
  addUser:PropTypes.func.isRequired,
  logIn:PropTypes.func.isRequired,
  getUsers:PropTypes.func.isRequired,  
  users:PropTypes.array.isRequired,
  isLoggedIn:PropTypes.bool.isRequired
}


export default connect(mapStateToProps,{addUser,getUsers,logIn})(SignUpIn) ;