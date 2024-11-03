import React from 'react';
import Card from 'react-credit-cards';
import './PaymentTab.css';
import jwt_decode from 'jwt-decode';

import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate
} from './utils';
import 'react-credit-cards/es/styles-compiled.css';

export default class App extends React.Component {
    state = {
        number: '',
        name: '',
        expiry: '',
        cvc: '',
        issuer: '',
        focused: '',
        formData: '',
        token: '',
        passengers: [],
        seats: [],
        price: 0,
        date: '',
        start: '',
        destination: '',
        companyName: ''
    };

    componentDidMount() {
        const tok = sessionStorage.getItem('authToken');
        const decoded = jwt_decode(tok);
        const passengers = JSON.parse(localStorage.getItem('nameData')) || [];
        const seats = JSON.parse(localStorage.getItem('reservedSeats')) || [];
        const price = localStorage.getItem('selectedBusPrice') || 0;
        const date = localStorage.getItem('date') || '';
        const start = localStorage.getItem('start') || '';
        const destination = localStorage.getItem('destination') || '';
        const companyName = localStorage.getItem('companyName') || '';

        this.setState({ 
            token: decoded.user, 
            passengers, 
            seats, 
            price: parseInt(price), 
            date, 
            start, 
            destination, 
            companyName 
        });
    }

    handleCallback = ({ issuer }, isValid) => {
        if (isValid) {
            this.setState({ issuer });
        }
    };

    handleInputFocus = ({ target }) => {
        this.setState({
            focused: target.name
        });
    };

    handleInputChange = ({ target }) => {
        if (target.name === 'number') {
            target.value = formatCreditCardNumber(target.value);
        } else if (target.name === 'expiry') {
            target.value = formatExpirationDate(target.value);
        } else if (target.name === 'cvc') {
            target.value = formatCVC(target.value);
        }

        this.setState({
            [target.name]: target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { issuer } = this.state;
        const formData = [...e.target.elements]
            .filter((d) => d.name)
            .reduce((acc, d) => {
                acc[d.name] = d.value;
                return acc;
            }, {});

        this.setState({ formData });
        this.form.reset();
    };

    moveToTicketPage = (e) => {
        e.preventDefault();
        localStorage.setItem('paymentData', JSON.stringify(this.state.token));
        window.location.href = '/getTicket';
    };

    renderNamesOfPassenger = () => {
        const { passengers } = this.state;
        return passengers.length > 0 ? (
            passengers.map((name, idx) => <p key={idx}>{name}</p>)
        ) : (
            <p>No passengers found.</p>
        );
    };

    renderSeatNumbers = () => {
        const { seats } = this.state;
        return seats.length > 0 ? (
            seats.map((seat, idx) => <p key={idx}>{seat}</p>)
        ) : (
            <p>No seats reserved.</p>
        );
    };

    getSumTotal = () => {
        const { price, seats } = this.state;
        const tax = 150; // Fixed tax value
        const seatCount = seats.length || 1; // Default to 1 seat if none found
        const totalSum = (price * seatCount) + tax; // Calculate total sum
        return (
            <div>
                <hr className='hr3' />
                <p>Price per Seat: {price}</p>
                <p>Number of Seats: {seatCount}</p>
                <p>Tax: +{tax}</p>
                <p>Total: {totalSum}</p>
            </div>
        );
    };

    render() {
        const {
            name,
            number,
            expiry,
            cvc,
            focused,
            issuer,
            date,
            start,
            destination,
            companyName
        } = this.state;

        return (
            <div className='paym'>
                <div className='row'>
                    <div key='Payment'>
                        <div className='App-payment cl-1'>
                            <p className='pPayment'>Enter Credit card details</p>
                            <Card
                                number={number}
                                name={name}
                                expiry={expiry}
                                cvc={cvc}
                                focused={focused}
                                callback={this.handleCallback}
                            />
                            <form
                                className='credit-form'
                                ref={(c) => (this.form = c)}
                                onSubmit={this.handleSubmit}
                            >
                                <div className='form-group'>
                                    <input
                                        type='tel'
                                        name='number'
                                        className='frm-ctrl'
                                        placeholder='Card Number'
                                        pattern='[\d| ]{16,22}'
                                        required
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                    />
                                </div>
                                <div className='form-group'>
                                    <input
                                        type='text'
                                        name='name'
                                        className='frm-ctrl'
                                        placeholder='Name'
                                        required
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                    />
                                </div>
                                <div className='form-group'>
                                    <input
                                        type='tel'
                                        name='expiry'
                                        className='frm-ctrl'
                                        placeholder='Valid Thru'
                                        pattern='\d\d/\d\d'
                                        required
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                    />
                                </div>
                                <div className='form-group'>
                                    <input
                                        type='tel'
                                        name='cvc'
                                        className='frm-ctrl cvc'
                                        placeholder='CVC'
                                        pattern='\d{3,4}'
                                        required
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                    />
                                </div>
                                <input type='hidden' name='issuer' value={issuer} />
                                <div>
                                    <button
                                        onClick={this.moveToTicketPage}
                                        className='btn btn-light btCustom'
                                    >
                                        PAY
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='columnTwo'>
                        <h3>{companyName}</h3>
                        <div>
                            <p>BOOKING DETAILS</p>
                            <div className='row'>
                                <div className='col-6 pt'>
                                    <p className='hdng'>Date</p>
                                    <p className='hdng'>From</p>
                                    <p className='hdng'>To</p>
                                    <hr className='hr3' />
                                    <p className='hdng'>Passengers</p>
                                    {this.renderNamesOfPassenger()}
                                    <hr className='hr3' />
                                    <p className='hdng'>Ticket price</p>
                                    <p className='hdng'>Tax</p>
                                    <p className='hdng'>Total Sum</p>
                                </div>
                                <div className='col-6'>
                                    <p className='usrName'>{date}</p>
                                    <p className='usrName'>{start}</p>
                                    <p className='usrName'>{destination}</p>
                                    <hr className='hr3' />
                                    <p className='hdng'>Seat No</p>
                                    {this.renderSeatNumbers()}
                                    {this.getSumTotal()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
