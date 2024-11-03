import React, { useState } from 'react';
import * as logFunc from './loginFunctions.js';
import './logOrsign.css';
import { FaFacebookF, FaTwitterSquare } from "react-icons/fa";
import yourGif from './largesignup.gif'; // Import your GIF here

export default function LogOrsign({ history }) {
    let [userData, setUserData] = useState({});

    const getToSignUp = e => {
        e.preventDefault(); 
        history.push('/register');
    };

    const handleChangeEvent = (e, title) => {
        let value = e.target.value;
        setUserData({ ...userData, [title]: value });
    };

    const submitData = e => {
        e.preventDefault();
        logFunc.logUserIn(userData)
            .then(response => response.data)
            .then(data => {
                let { token } = data;
                sessionStorage.setItem('authToken', token);
                history.push('/routes');
            });
    };

    const styles = {
        gif: {
            width: '100%', // Set width to fit container
            maxWidth: '500px', // Set a maximum width
            height: 'auto', // Maintain aspect ratio
            marginBottom: '20px', // Space below the GIF
            display: 'block', // Ensure it is block-level for centering
            marginLeft: 'auto', // Centering in flex container
            marginRight: 'auto', // Centering in flex container
        },
    };

    return (
        <div className="container">
            <section className="myform-area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="form-area login-form">
                                <div className="form-content">
                                    {/* <h2>Login</h2>
                                    <p>You chose the right option</p>
                                    <ul>
                                        <li><a href="/#" className="facebook"><FaFacebookF /></a></li>
                                    </ul>
                                    <ul>
                                        <li><a href="/#" className="twitter"><FaTwitterSquare /></a></li>
                                    </ul> */}
                                     <img src={yourGif} alt="Animated GIF" style={styles.gif} /> {/* Display the GIF */}
                                </div>
                                <div className="form-input">
                                    <h2>Enter Credentials</h2>
                                   
                                    <form onSubmit={(e) => { submitData(e) }}>
                                        <div className="form-group">
                                            <input className="loginInfo" type="email" name="name" required onChange={e => handleChangeEvent(e, 'email')} />
                                            <label>Email-Id</label>
                                        </div>
                                        <div className="form-group">
                                            <input className="loginInfo" type="password" name="password" required onChange={e => handleChangeEvent(e, 'password')} />
                                            <label>Password</label>
                                        </div>
                                        <div className="myform-button">
                                            <button type="submit" className="myform-btn">Login</button>
                                        </div>
                                        <div>
                                            <small className="form-text text-muted signup-text">Already a\ User?</small>
                                            <span className="signUPtext"><a href="/#" onClick={(e) => getToSignUp(e)}>Sign-Up</a></span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
