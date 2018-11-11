import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import Create from './create';

class Poll extends Component {
  constructor(){
    super();
      this.state={
        pollsArr:[],
        pollsOriginalArr:[],
        isUpdating:false
      }
        
  }
  componentDidMount(){
    this.loadPolls()
  }
  loadPolls=()=>{
    let pollsArr=[]
     pollsArr= localStorage.getItem('pollsArr');
                if(pollsArr==null)
                  { pollsArr=[]
                    localStorage.setItem('pollsArr', JSON.stringify(pollsArr));
                  }
                  else{
                    this.setState({pollsOriginalArr:JSON.parse(pollsArr)})
                    pollsArr=JSON.parse(pollsArr) 
                    console.log(pollsArr);                   
                    pollsArr.map(item=>{
                      item.isVotedByUser=false
                      item.options.map(option=>{
                        option.isVotedByUser=false;
                      let isVotedByUser=option.votedBy.filter(user=>{
                        return user.email==this.props.loggedInUser.email
                      })
                      if(isVotedByUser.length>0){
                        option.isVotedByUser=true;
                        item.isVotedByUser=true
                      }

                      })
                    })              

                   this.setState({pollsArr})
                  }
  }

  voteFor=(item,subIndex,index)=>{
    let dataO=this.state.pollsOriginalArr[index]
    
    if(!this.props.isLoggedIn){
         alert('Please login first')
       }
     let data=this.state.pollsArr[index];
      if(!data.isVotedByUser){
        data.isVotedByUser=true;
        data.totalVote=data.totalVote+1
        data.options[subIndex].isVotedByUser=true;
        data.options[subIndex].voteCount=data.options[subIndex].voteCount+1;
        data.options[subIndex].votedBy.push(this.props.loggedInUser)

        dataO.totalVote=dataO.totalVote+1;
        dataO.options[subIndex].voteCount=dataO.options[subIndex].voteCount+1;
        dataO.options[subIndex].votedBy.push(this.props.loggedInUser)

      

      }
      else{
        if(data.options[subIndex].isVotedByUser){
          return
        }
        else{
          data.options.map((option,i)=>{
            if(option.isVotedByUser){
              option.isVotedByUser=false;
              let removeIndex=option.votedBy.findIndex(user=>{
                return user.email==this.props.loggedInUser
              })
              option.votedBy.splice(removeIndex,1)
              option.voteCount=option.voteCount-1
             
              dataO.options[i].voteCount=dataO.options[i].voteCount-1;
              dataO.options[i].votedBy.splice(removeIndex,1)




            }
          })
        data.options[subIndex].isVotedByUser=true;
        data.options[subIndex].voteCount=data.options[subIndex].voteCount+1;
        data.options[subIndex].votedBy.push(this.props.loggedInUser)

        dataO.options[subIndex].voteCount=dataO.options[subIndex].voteCount+1;
        dataO.options[subIndex].votedBy.push(this.props.loggedInUser)
        
        }      
        
      }
      this.setState({pollsArr:[data]})
      this.setState({pollsOriginalArr:[dataO]},()=>{        
        let updateArr=[dataO];      
        localStorage.setItem('pollsArr',JSON.stringify(updateArr))
      })
  }

  closeEditor=()=>{
      this.loadPolls();
      this.setState({isUpdating:false})
  }

  deletePoll=()=>{
    let pollsArr=[]
    localStorage.setItem('pollsArr',JSON.stringify(pollsArr))
    this.loadPolls();
  }
  render() {
    return (
      <div>
        <div className={this.state.isUpdating ? 'modal is-active' :'modal'}>
          <div  className="modal-background"></div> 
          <div className="container">             
          {this.state.isUpdating && <Create closeEditor={this.closeEditor} isUpdating={this.state.isUpdating} />   }   
          </div> 
          <button onClick={e=>this.setState({isUpdating:false})} className="modal-close is-large" aria-label="close"></button>
          </div> 
      <div className="columns">
      <div className="column is-half is-offset-one-quarter"> 
        
        {this.state.pollsArr.map((item,index)=>{
           return <div className="card" key={index}>  
           <div className="card-content">
           
           <div className="media">
                <div className="media-left">
                <p data-author={item.author.name.charAt(0)}>{item.author.name} </p>
                </div>    
                <span onClick={e=>this.setState({isUpdating:true})} className="icon is-small editpoll">
                              <i className="fa fa-pencil"></i>
                </span>
                <span onClick={e=>this.deletePoll()} className="icon is-small deletepoll">
                              <i className="fa fa-trash"></i>
                </span>        
            </div>
            <div className="content">
             <strong style={{marginBottom:10}} > {item.pollQuestion}  </strong>
                                <div>                               
                                {
                                  item.options.map((pollItem,pollKey)=>{
                                    return  <div key={pollKey} style={{marginBottom:10}}>                                             
                                            <a className={pollItem.isVotedByUser ? 'button is-small is-primary is-fullwidth' :'button is-small is-fullwidth'} onClick={e=>this.voteFor(pollItem,pollKey,index)}>{pollItem.option}</a>                                      
                                            </div>
                                   })
                                 }                              
                                </div>             



             <br/>         
            </div>

           </div>
         </div> 
         })}
      </div>
      </div>
      </div>
    )
  }
}

const mapStateToProps=state=>({
  loggedInUser:state.addUser.loggedInUser,
  isLoggedIn:state.addUser.isLoggedIn
})

Poll.propTypes={
isLoggedIn:PropTypes.bool.isRequired,
loggedInUser:PropTypes.object.isRequired,
}
export default connect(mapStateToProps,{})(Poll) ;
