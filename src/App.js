import React from "react"
import './App.css';
import {arr1} from "./prasanje"



class Quiz extends React.Component{
constructor(props){
  super(props)
  this.state={
flip:true,
counter:0,
additionalcounter:0  //counter da brojam kolku pati se rendira
  }
  this.CallBack=this.CallBack.bind(this)
}

CallBack(data){
  console.log("Before "+this.state.flip)
  

  setTimeout(()=>{
  this.setState({
   counter:data,
    flip:false,
    
  })
  console.log("After "+this.state.flip)
},1500)
  
}

render(){

  return(
  <div className="main">
    {(this.state.flip ? <Questions parentCallback={this.CallBack} />:"" )}
    {(this.state.flip==false ? <Result prop3={this.state.counter} /> : "")}  
    
  </div>
  )
}
}

class Questions extends React.Component{
  constructor(props){
    super(props)
    this.state={
    arr1:arr1,
    counter:0,
    counter1:0,
    }
    this.handleClick=this.handleClick.bind(this)
    
  }
  handleClick(e,index){
    
    if(e==arr1[index]["correct"]) {
      this.setState({
        counter:this.state.counter+1 //broi tocni odgovori
      })
    }
    this.setState({
      counter1:this.state.counter1+1  //broi odgovoreni prasanja
    })
   arr1[index]["answers"].splice(0,arr1[index]["answers"].length)
  }

  

  
  render(){
    if(this.state.counter1==arr1.length){
      //setTimeout(()=>{this.props.parentCallback(this.state.counter)},1500)
      this.props.parentCallback(this.state.counter)
      console.log("shees")
      }
    
    return(
    <div>
     {arr1.map((elem,index) =>
     (
       <div className="question" >
       <h1>{elem.question}</h1>
       <div>{elem.answers.map((e) => (
       
       <button className="button" onClick={()=>this.handleClick(e,index)}>{e}</button>
       
       ))}</div>
       
       </div>
     )
     )
     }
     
     
     </div>
    )
  }
  }

  class Result extends React.Component{
    constructor(props){
      super(props);
      this.refreshPage=this.refreshPage.bind(this)
      
    }
    refreshPage() {
      window.location.reload(false);
    }
    
    
  render(){
    console.log("Result")
return(
  <div>
    
    You have answered <span style={{fontWeight: 'bold'}}>{this.props.prop3}</span> out of <span style={{fontWeight: 'bold'}}>{arr1.length}</span> correct answers!
    <br/>
    <button onClick={this.refreshPage}>Start again!</button>
    
    </div>
)
}
  }

export default Quiz;
