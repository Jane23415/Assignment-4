// src/App.js

import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/home';
import UserProfile from './components/UserProfile';
import LogIn from './Login';
import './App.css';


import axios from "axios";
class App extends Component {

  constructor() {
    super();

    this.state = {
      accountBalance: 0,
      currentUser: {
        userName: 'joe_shmo',
        memberSince: '07/23/96',
      },
      debits: [],
      credits: []
    }
  }

  async componentDidMount() {
    //get data from endpoints
    let debits = await axios.get("https://moj-api.herokuapp.com/debits")
    let credits = await axios.get("https://moj-api.herokuapp.com/credits")

    debits = debits.data
    credits = credits.data


    //use data to calculate account balance
    let debSum = 0, credSum = 0;

    debits.forEach((debit) => {
      debSum += debit.amount
    })
    credits.forEach((credit) => {
    credSum += credit.amount
    })
      
    //make sure account balance only has 2 decimal places to represent cents
    let accountBalance = parseFloat((credSum - debSum).toFixed(2))

    //update state
    this.setState({credits, debits, accountBalance})
  }

  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }
  
  render() {
    
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent = () => (
        <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  />
    );
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />);

    return (
        <Router>
          <div>
            <Route exact path="/" render={HomeComponent}/>
            <Route exact path="/userProfile" render={UserProfileComponent}/>
            <Route exact path="/login" render={LogInComponent}/>
          </div>
        </Router>
    );
  }
}

export default App;