import React from 'react' 

class Spinner extends React.Component {
    render(){
      return (
        <div className="spinner"> 
          <img className="glyphicon-spin" src="/img/spinner-img.png"/>
        </div> 
      ); 
    }

}

export default Spinner; 
