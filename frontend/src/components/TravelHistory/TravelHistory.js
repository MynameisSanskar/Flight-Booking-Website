import React from 'react';
import './travelhistory.css';
import jwt_decode from 'jwt-decode';
import KommunicateChat from '../Chat';

export default class App extends React.Component {
    state = {
        number: '',
        name: '',
        expiry: '',
        cvc: '',
        issuer: '',
        focused: '',
        formData: '',
        token: ''
    };

    componentDidMount() {
        const tok = sessionStorage.getItem('authToken');
        if (tok) {
            const decoded = jwt_decode(tok);
            this.setState({ token: decoded.user });
        }
    }

    handleCallback = ({ issuer }, isValid) => {
        if (isValid) {
            this.setState({ issuer });
        }
    }

    handleInputFocus = ({ target }) => {
        this.setState({
            focused: target.name
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        const formData = [...e.target.elements]
            .filter(d => d.name)
            .reduce((acc, d) => {
                acc[d.name] = d.value;
                return acc;
            }, {});

        this.setState({ formData });
        this.form.reset();
    }

    moveToPage = (page) => e => {
        e.preventDefault();
        localStorage.setItem('paymentData', JSON.stringify(this.state.token));
        window.location.href = `/${page}`;
    }

    renderNamesOfPassenger = () => {
        const passArray = localStorage.getItem('nameData');
        if (passArray) {
            const nameArray = JSON.parse(passArray);
            return nameArray.map((name, idx) => <p key={idx}>{name}</p>);
        }
        return null;
    }

    renderSeatNumbers = () => {
        const seatArray = localStorage.getItem('reservedSeats');
        if (seatArray) {
            const seaArr = JSON.parse(seatArray);
            return seaArr.map((seat, idx) => <p key={idx}>{seat}</p>);
        }
        return null;
    }

    getSumTotal = () => {
        let count = 0;
        const tax = 150;
        const seatArray = localStorage.getItem('reservedSeats');
        if (seatArray) {
            const seaArr = JSON.parse(seatArray);
            count = seaArr.length; // Count the number of reserved seats
        }
        const total = 1000 * count + tax;
        return (
            <div>
                <hr className='hr3' />
                <p>{1000 * count}</p>
                <p>+ {tax}</p>
                <p>{total}</p>
            </div>
        );
    }

    render() {
        return (
            <div className='cancup'>
                <div className='row'>
                    <div className='columnThree'>
                        <h3>SWADESHI AIRLINES</h3>
                        <p>TRAVEL HISTORY DETAILS</p>
                        <div className='row'>
                            <button
                                style={{ marginRight: 162 }}
                                onClick={this.moveToPage('upcomingPage')}
                                className='btn btn-light btCustoms'
                            >
                                Upcoming Flights
                            </button>
                            <button
                                style={{ marginRight: 162 }}
                                onClick={this.moveToPage('completedPage')}
                                className='btn btn-light btCustoms'
                            >
                                Completed Trips
                            </button>
                            <button
                                style={{ marginRight: 162 }}
                                onClick={this.moveToPage('cancelledPage')}
                                className='btn btn-light btCustoms'
                            >
                                Cancelled Flights
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
