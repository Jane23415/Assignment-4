import React, {Component} from 'react';
import {Link} from 'react-router-dom';

const Credits = (props) => {
    let showCredits = () => {
        const { credits } = props;

        return credits.map((credit) => {
            let date =  credit.date.slice(0,10);
            return <li key = {credit.id}>{credit.amount} {credit.description} {date}</li>
        })
    }
    return (
        <div>
            <h1>Credits</h1>
            {showCredits()}

            <Link to="/userProfile">User Profile</Link>
            <Link to="./Login"> Log In</Link>
            <Link to="/">Home</Link>
            <Link to="./Debits"> Debits</Link>
        </div>

    )
}
export default Credits