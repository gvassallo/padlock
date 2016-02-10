import React from 'react'; 
// import Menu from 'react-burger-menu' 
import BurgerMenu from 'react-burger-menu' 
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
let MenuWrap = React.createClass({

  getInitialState() {
    return { hidden : false };
  },

  componentWillReceiveProps(nextProps) {
    const sideChanged = this.props.children.props.right !== nextProps.children.props.right;

    if (sideChanged) {
      this.setState({ hidden : true });

      setTimeout(() => {
        this.show();
      }, this.props.wait);
    }
  },

  show() {
    this.setState({ hidden : false });
  },

  render() {
    let style;

    if (this.state.hidden) {
      style = { display: 'none' };
    }

    return (
      <div style={ style } className={ this.props.side }>
        { this.props.children }
      </div>
    );
  }
});

let SideBar = React.createClass({
    getMenu(){
        const Menu = BurgerMenu['push'];  
    let jsx = ( 
        <MenuWrap wait={ 20 }>
            <Menu  pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } customIcon={ 'img/burger.svg'} className="sidebar">
              <Link to="/"> 
                  <div className="menu-item">
                      <i className="glyphicon glyphicon-th"/>
                      <span>Services</span>
                  </div>
              </Link> 
              <Link  to="/profile" >
                <div className="menu-item profile">
                  <i className="glyphicon glyphicon-user"/>
                      <span>Profile</span>
                </div> 
              </Link> 
          </Menu>
        </MenuWrap>
        ); 
        return jsx;  
    }, 
    render() {
        return(
        <div id="outer-container" className="outer-container" style={ {height: '100%' } }>  
            {this.getMenu()} 
        </div> 
    );
    }
}); 

export default SideBar; 
