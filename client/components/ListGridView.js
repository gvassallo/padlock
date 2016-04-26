import React from 'react' 
import {Row, Col} from 'react-bootstrap' 
import ListGridItem from './ListGridItem' 

class ListGridView extends React.Component{
  constructor(){
    super(); 
  }
  
  render(){
    return (
      <div> 
        {this.props.groups.map(listValue => {
        return <ListGridItem 
                  name={listValue.name} 
                  key={listValue.uuid} 
                />; 
          })}
     </div> 
    ); 
  }
}

export default ListGridView; 
// vim: set ft=javascript.jsx: 
