import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import moment from 'moment';

class Create extends Component {
  constructor(){
    super()
    this.state={
      pollOptions:2,
      polls:[],
      question:"",
      pollsArr:[],
      posted:false
    }
  }
  componentDidMount(){
    if(this.props.isUpdating){
       let pollData=JSON.parse(localStorage.getItem('pollsArr'))
       this.setState({question:pollData[0].pollQuestion})
       this.setState({pollOptions:pollData[0].options.length})
       let polls=[];
       pollData[0].options.map(option=>{
         polls.push(option.option)
       })
       this.setState({polls})
    }
  }
  removeInputFieldPolls=()=>{
    let polls = this.state.polls;    
    polls.pop();
    this.setState({
       pollOptions: this.state.pollOptions - 1,
       polls,
    })
 }

  createPoll=(e)=>{

   if(this.state.polls.length==0 || this.state.question.trim().length==0){
     alert("create a poll with options")
     return
   }
   let pollsArr=[];   
    let pollSchema={
      pollQuestion:this.state.question,
      options:[],
      totalVote:0,
      author:this.props.loggedInUser,
      createdAt:moment().toISOString()
    }

   if(this.state.polls.length>=this.state.pollOptions)
   {    
      this.state.polls.map((item,i)=>{
     if(item.trim().length!==0){
       
      let myObj= {option:item.trim(),
                  voteCount:0,
                  votedBy:[]};

        pollSchema.options.push(myObj);
                

     }
     else{
       alert('Please fill all the options');
       return
     }
    })
    pollsArr.push(pollSchema);
    localStorage.setItem('pollsArr', JSON.stringify(pollsArr));
     
     
    this.setState({pollOptions:2,
      polls:[],
      question:""})


    this.setState({posted:true})
    
    setTimeout(()=>{this.setState({posted:false})},3000)

    if(this.props.isUpdating!==undefined && this.props.isUpdating==true){
      this.props.closeEditor()
    }

  
    }
    else{
      alert('Please fill all the options');
      return
    }
    

    }
   createPollInputField=()=>{
    let pollsView= [];
    for(let i = 0; i < this.state.pollOptions; i++){
      pollsView.push(
              <div className="field" key={i}>                
                  <div className="control">
                    <input className="input is-small" type="text"placeholder={'Choice '+(i+1)} value={this.state.polls[i] || ''} onChange={e=>this.onChangeOptionValuePolls(e,i)} />
                  </div>                 
                </div>
                
           )
    }
    return pollsView || null;
 }

 onChangeOptionValuePolls=(e, i)=> {
  let polls = this.state.polls;
  polls[i] = e.target.value;
  this.setState({polls});
}

addMoreOption=()=>{  
  this.setState({pollOptions:this.state.pollOptions+1})
}




  render() {
    return (
      <div className="columns">
      <div className="column is-half is-offset-one-quarter">    
        <div className="card">  
          <div className="card-content">
          <div className="field">
            <div className="control">
              <textarea style={{marginBottom:10}} value={this.state.question} onChange={e=>this.setState({question:e.target.value})} className="textarea is-primary" rows="2" placeholder="Please write your question"></textarea>
              {this.createPollInputField()}
              { this.state.pollOptions < 3 &&
                  <div>
                  <span className="icon is-small pull-right" onClick={e=>this.addMoreOption()} >
                              <i className="fa fa-plus"></i>
                   </span>                   
                 </div>
               }
               { this.state.pollOptions == 3 &&
                  <div>
                  <span className="icon is-small pull-right" onClick={e=>this.removeInputFieldPolls(e)} >
                              <i className="fa fa-minus"></i>
                   </span>
                   </div>
              }

             {!this.props.isUpdating && <button onClick={e=>this.createPoll()} className="button is-primary is-small">Post</button> }
              {this.props.isUpdating && <button onClick={e=>this.createPoll()} className="button is-primary is-small">Update</button>}
              

            </div>
          </div>        
          
          </div>
        </div>
      </div>
      <div className={this.state.posted ? 'snackbar show' :'snackbar'}>Poll has been successfully created.</div> 
        </div>

    )
  }
}

const mapStateToProps=state=>({
  loggedInUser:state.addUser.loggedInUser,
  isLoggedIn:state.addUser.isLoggedIn
})

Create.propTypes={
isLoggedIn:PropTypes.bool.isRequired,
loggedInUser:PropTypes.object.isRequired,
isUpdating:PropTypes.bool,
closeEditor:PropTypes.func
}

export default connect(mapStateToProps,{})(Create);
