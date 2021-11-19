// src/components/Home.js

import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';

class Home extends Component {
  render() {
    return (
        <div>
          <img src="https://thefinanser.com/wp-content/uploads/2021/09/bank.jpeg" alt="bank"/>
          <h1>Bank of React</h1>

          <Link to="/userProfile">User Profile</Link>
          <Link to="./Login"> Log In</Link>
          <Link to="./Debits"> Debits</Link>
          <Link to="./Credits"> Credits</Link>

          <AccountBalance accountBalance={this.props.accountBalance}/>
        </div>
    );
  }
}

export default Home;