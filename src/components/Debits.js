import React, {Component} from 'react';
import {Link} from 'react-router-dom';

const Debits = (props) => {
    let showDebits = () => {
        const { debits } = props;

        return debits.map((debit) => {
            let date = debit.date.slice(0,10);
            return <li key = {debit.id}>{debit.amount} {debit.description} {date}</li>
        })
    }
    return (
        <div>
            <h1>Debits</h1>
            {showDebits()}

            <Link to="/userProfile">User Profile</Link>
            <Link to="./Login"> Log In</Link>
            <Link to="/">Home</Link>
        </div>

    )
}
export default Debits