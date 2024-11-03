import React, { useState } from 'react';
import { FaAngleDoubleDown } from "react-icons/fa";
import './customerservice.css';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            message: '',
            rating: ''
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    moveToCusPage = async (e) => {
        e.preventDefault();

        // Construct the form data
        const formData = {
            name: this.state.name,
            email: this.state.email,
            message: this.state.message,
            rating: this.state.rating
        };

        // Send the data to the json-server
        try {
            const response = await fetch('http://localhost:3031/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("Feedback submitted successfully!");
                window.location.href = '/';
            } else {
                alert("Failed to submit feedback.");
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
        }
    }

    render() {
        return (
            <div className="row">
                <div className="column3">
                    <div className="seatInfo">
                        <p className="new">Boomerang</p>
                        <center>
                            <div className="cen">
                                <form onSubmit={this.moveToCusPage}>
                                    <br />
                                    <label className='t'>Name: &nbsp;&nbsp;&nbsp;</label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        value={this.state.name} 
                                        onChange={this.handleInputChange} 
                                        required 
                                    />
                                    <br />
                                    <label className='t'>Email-Id : &nbsp;&nbsp;&nbsp;</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        value={this.state.email} 
                                        onChange={this.handleInputChange} 
                                        required 
                                    />
                                    <br /><br />
                                    <label className='bo'>FEEDBACK</label>
                                    <br />
                                    <textarea 
                                        name="message" 
                                        value={this.state.message} 
                                        onChange={this.handleInputChange}
                                    ></textarea>
                                    <br /><br />
                                    <p className='ne'>RATING</p>
                                    <center>
                                        <div className="form-check form-check-inline">
                                            <input 
                                                className="form-check-input" 
                                                type="radio" 
                                                name="rating" 
                                                value="1" 
                                                checked={this.state.rating === "1"} 
                                                onChange={this.handleInputChange} 
                                            />
                                            <label className="form-check-label">1</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input 
                                                className="form-check-input" 
                                                type="radio" 
                                                name="rating" 
                                                value="2" 
                                                checked={this.state.rating === "2"} 
                                                onChange={this.handleInputChange} 
                                            />
                                            <label className="form-check-label">2</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input 
                                                className="form-check-input" 
                                                type="radio" 
                                                name="rating" 
                                                value="3" 
                                                checked={this.state.rating === "3"} 
                                                onChange={this.handleInputChange} 
                                            />
                                            <label className="form-check-label">3</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input 
                                                className="form-check-input" 
                                                type="radio" 
                                                name="rating" 
                                                value="4" 
                                                checked={this.state.rating === "4"} 
                                                onChange={this.handleInputChange} 
                                            />
                                            <label className="form-check-label">4</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input 
                                                className="form-check-input" 
                                                type="radio" 
                                                name="rating" 
                                                value="5" 
                                                checked={this.state.rating === "5"} 
                                                onChange={this.handleInputChange} 
                                            />
                                            <label className="form-check-label">5</label>
                                        </div>
                                    </center>
                                    <br /><br />
                                    <button type="submit" className="bt">
                                        <center>Submit</center>
                                    </button> &nbsp;&nbsp;
                                    <button type="reset" className="bt1" value="clear">
                                        <center>Clear</center>
                                    </button>
                                </form>
                            </div>
                            <br /><br />
                            <center>
                                <p className="te">EMAIL: sanskarwakchaure7@gmail.com</p>
                                <p className="te">CONTACT NUMBER: 9819219560</p>
                                <p className="te">ADDRESS: Mahajan Road, Matunga</p>
                            </center>
                        </center>
                    </div>
                </div>
            </div>
        );
    }
}
