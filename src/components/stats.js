import React, { Component } from 'react'

class Stats extends Component {
  constructor(){
    super();
    this.state={
      pollsArr:[]
    }
  }
  componentDidMount(){
    let pollsArr=[]
     pollsArr= localStorage.getItem('pollsArr');
                if(pollsArr==null)
                  { pollsArr=[]
                    localStorage.setItem('pollsArr', JSON.stringify(pollsArr));
                  }
                  else{                   
                    pollsArr=JSON.parse(pollsArr)                               
                    pollsArr.map(item=>{                     
                      item.options.map(option=>{
                      if(item.totalVote>0)
                      option.percentage=(option.voteCount/item.totalVote )*100
                      else
                      option.percentage=0
                      })
                    })              

                   this.setState({pollsArr})
                  }
  }
  render() {
    return (
      <div className="columns">
      <div className="column is-half is-offset-one-quarter"> 
        
        {this.state.pollsArr.map((item,index)=>{
           return <div className="card" key={index}>  
           <div className="card-content">
           
           <div className="media">
                <div className="media-left">
                <p data-author={item.author.name.charAt(0)}>{item.author.name} </p>
                </div>           
            </div>
            <div className="content">
             <strong style={{marginBottom:10}} > {item.pollQuestion}  </strong>
                                <div>                               
                                {
                                  item.options.map((pollItem,pollKey)=>{
                                    return  <div key={pollKey} style={{marginBottom:10}}>                                           
                                            <div className="meter"> 
                                                <p>{pollItem.option} {pollItem.percentage}%</p>
                                                <span style={{width: ''+pollItem.percentage+'%'}}></span> 
                                            </div>                                    
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
    )
  }
}

export default Stats;
