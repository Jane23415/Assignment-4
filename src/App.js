// src/App.js

import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import './App.css';
import Debits from './components/Debits'
import Credits from './components/Credits'


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
  
  addDebit = (e) => {
    //to be implemented
  }

  addCredit = (e) => {
    //send to debits view via props
    //updates state based off user input
    e.preventDefault();
    const description = e.target[0].value;
    const amount = Number(e.target[1].value);
    
    // get date 
    const curr_date = new Date();
    let date = curr_date.getFullYear() + "-" + curr_date.getMonth() + "-" + curr_date.getDate();

    const credit_obj = {'description':description, 'amount':amount, 'date':date};
    console.log(description, amount);

    this.setState({
      credits: [...this.state.credits, credit_obj]
    })

    console.log(this.state.credits)
  }

  render() {
    const { debits } = this.state
    //const { credits } = this.state
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent = () => (
        <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  />
    );
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />);
    
    const DebitsComponent = () => (<Debits addDebit = {this.addDebit} debits = {debits} />)
    const CreditsComponent = () => (<Credits addCredit = {this.addCredit} credits = {this.state.credits} />)
    return (
        <Router>
          <div>
            <Route exact path="/" render={HomeComponent}/>
            <Route exact path="/userProfile" render={UserProfileComponent}/>
            <Route exact path="/login" render={LogInComponent}/>
            <Route exact path="/debits" render={DebitsComponent}/>
            <Route exact path="/credits" render={CreditsComponent}/>
          </div>
        </Router>
    );
  }
}

export default App;