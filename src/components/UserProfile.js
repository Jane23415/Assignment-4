// src/components/UserProfile.js

import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';

class UserProfile extends Component {
  render() {
    return (
        <div>
          <h1>User Profile</h1>

          <Link to="/">Home</Link>
          {/* <Link to="/userProfile">User Profile</Link> */}
          <Link to="./Login"> Log In</Link>
          <Link to="./Debits"> Debits</Link>
          <Link to="./Credits"> Credits</Link>
          
          <div>Username: {this.props.userName}</div>
          <div>Member Since: {this.props.memberSince}</div>
          <AccountBalance accountBalance={this.props.accountBalance}/>
        </div>
    );
  }
}

export default UserProfile;