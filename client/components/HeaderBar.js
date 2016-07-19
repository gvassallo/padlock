import React from 'react' 
import { connect } from 'react-redux' 
import { Link, browserHistory } from 'react-router'
import { If, Then} from 'react-if' 
import { Navbar, Nav, NavItem, Dropdown, NavDropdown, MenuItem, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import CreateMenu from './CreateMenu' 
import GroupList from './GroupList' 
import UserMenu from './UserMenu'
import * as AuthActions from '../actions/AuthActions' 
import * as LoginsActions from '../actions/LoginsActions'
import * as OptionsActions from '../actions/OptionsActions'
import * as GroupsActions from '../actions/GroupsActions'
import '../scss/components/HeaderBar.scss'

class HeaderBar extends React.Component {
  constructor(){
    super(); 
    this.state = {
      groupsOpen: false, 
      groupsLoaded: false, 
      dropdown_user_open: false, 
      usermenu_open: false
    }; 
  }

  componentDidMount(){
    if(!this.state.groupsLoaded){
      this.props.dispatch(GroupsActions.downloadGroups())
        .then(()=>{
          this.state.groupsLoaded = true; 
          this.setState(this.state); 
        });
    }
  }

  logout(event) {
    event.preventDefault();
    const { dispatch } = this.props; 
    dispatch(AuthActions.logout()); 
    dispatch(LoginsActions.resetLoginsList()); 
  }

  toggleDropdown(){
    const {dispatch} = this.props; 
    if(!this.props.dropdown_open){
      dispatch(OptionsActions.loginCardClose()); 
      dispatch(OptionsActions.dropdownOpen()); 
    }else{
      this.props.dispatch(OptionsActions.dropdownClose()); 
    }
  }

  toggleDropdownUser(isOpen){
    this.state.dropdown_user_open = !this.state.dropdown_user_open;
    this.setState(this.state);
  }

  openGroupsList(event){
    event.preventDefault(); 
    this.setState({
      groupsOpen: !this.state.groupsOpen
    }); 
  }

  render() {
    return (
    <div>
      <nav className="header">
        <div className="container-fluid">
          <div className="header-left">
            <div className="header-groups-button">        
              <Button onClick={this.openGroupsList.bind(this)} disabled={!this.state.groupsLoaded}> 
                Groups
              </Button> 
            </div> 
            <div className='header-logo'> 
              <Link to='/'>
                <img src='/img/padlock.png'/>  
              </Link>
            </div> 
          </div>
          <div className="header-right">
            <ul className="header-right-group">
              <li id='create-dropdown'>
                <Button onClick={this.toggleDropdown.bind(this)}>
                  <span className="fa fa-plus header-plus"/>
                </Button>
              </li>
              <li id='user-button'>
                <Button onClick={()=>this.setState({usermenu_open:!this.state.usermenu_open})}>
                  {this.props.user.username}
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <If condition={this.state.groupsOpen}> 
        <Then><GroupList/></Then> 
      </If> 
      <If condition={this.props.dropdown_open}> 
        <Then><CreateMenu/></Then> 
      </If> 
      <If condition={this.state.usermenu_open}>
        <Then><UserMenu/></Then>
      </If>
    </div>
    ); 
  }
}; 

const mapStateToProps = (state) => ({
  user : state.auth.user,
  token: state.auth.token, 
  groups: state.groups.list,
  dropdown_open: state.options.dropdown_open, 
  current_view: state.options.current_view
});

export default connect(mapStateToProps)(HeaderBar); 
// vim: set ft=javascript.jsx: 

