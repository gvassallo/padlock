import React from 'react' 

class GroupCell extends React.Component{
  constructor(){
    super(); 
  }

  handleClick(listValue){
    console.log(listValue);  
  }

  render(){
    return (
      <div className='group-list-cell'> 
        {this.props.name}
      </div> 
    ); 
  }
}

export default GroupCell; 
// vim: set ft=javascript.jsx: 
