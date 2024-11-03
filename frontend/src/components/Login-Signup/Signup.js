import React, { useState } from "react";
import * as signupFunc from "./SignupFunctions";
import { FaFacebookF, FaTwitterSquare } from "react-icons/fa";
// import signupLottie from './signUpLottie'
import yourGif from './largesignup.gif'
import "./signup.css";
export default function Signup({ history }) {
    let [newUser, setnewUser] = useState({});
    const handleChangeEvent = (e, field) => {
        let fieldValue = e.target.value;
        setnewUser({ ...newUser, [field]: fieldValue });
        // if (field === 'email') {
        //     var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        //     if (fieldValue.match(mailformat)) {
        //         setnewUser({ ...newUser, [field]: fieldValue })
        //         return true
        //     } else {
        //         alert("You have entered an invalid email address!");
        //         return false
        //     }
        // } else if (field === 'password') {
        //     var passwordFormat = /^[A-Za-z]\w{7,14}$/;
        //     if (fieldValue.match(passwordFormat)) {
        //         setnewUser({ ...newUser, [field]: fieldValue })
        //         return true
        //     }else{
        //         alert("Input Password and Submit [7 to 15 characters which contain only characters, numeric digits, underscore and first character must be a letter]")
        //     }
    };

    // sign in
    const getToSignIn = (e) => {
        e.preventDefault();
        history.push("/login");
    };

    // submiting data to backend
    const submitData = (e) => {
        e.preventDefault();
        signupFunc.registerUser(newUser).then((response) => response.data);
        console.log(newUser);
        history.push("/login");
    };
    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f8f9fa',
        },
        formContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '95%', // Increased width
            maxWidth: '700px', // Increased max width
            padding: '50px', // Increased padding
            borderRadius: '10px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)', // Enhanced shadow
            backgroundColor: 'white',
        },
        formGroup: {
            marginBottom: '20px',
            width: '100%',
        },
        formControl: {
            width: '100%',
            padding: '14px', // Increased padding
            borderRadius: '5px',
            border: '1px solid #ced4da',
            fontSize: '18px', // Increased font size
        },
        btnPrimary: {
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '14px', // Increased padding
            borderRadius: '5px',
            cursor: 'pointer',
            width: '100%',
            fontSize: '18px', // Increased font size
        },
        signupText: {
            display: 'block',
            textAlign: 'center',
            marginTop: '10px',
            fontSize: '16px',
        },
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
    
    return (<div className="container" >
        
        <div className="flex-container" >
            <div className="row full" >
                <div className="col-md-12" >
                    <div className="form-container" >
                    <div className="form-container-in" style={{ marginLeft: '16px' }}>
    {/* Your content goes here */}
</div>
                        <div className="row sgnUp " >
                            <div className="col-md-6 right-divider pdding" >
                                <h3 className="lead-text mn-txt" > Join Us with Social </h3>
                                {/* <div className="icon-soc-fb" >
                                    <FaFacebookF />
                                </div>
                                <div className="icon-soc-tw" >
                                    <FaTwitterSquare />
                                </div> */}
                                <img
                    src={yourGif} // Use the imported GIF
                    alt="Animated GIF"
                    style={styles.gif}
                />
                            </div>
                            <div className="left-divider" >
                                <div className="col-md-6" >
                                    <form onSubmit={
                                        (e) => submitData(e)} >
                                        <div className="form-group2" >
                                            <label htmlFor="name" > Name: </label>
                                            <input id="name"
                                                type="text"
                                                className="form-control sgnUp"
                                                onChange={
                                                    (e) => handleChangeEvent(e, "name")}
                                            />
                                        </div>
                                        <div class="form-group2" >
                                            <label htmlFor="email" > Email - ID: </label>
                                            <input required id="email"
                                                type="email"
                                                className="form-control sgnUp"
                                                onChange={
                                                    (e) => handleChangeEvent(e, "email")}
                                            />
                                        </div>
                                        <div class="form-group2" >
                                            <label htmlFor="mob-number" > Mobile - No.: </label>
                                            <input required id="mob-number"
                                                type="text"
                                                className="form-control sgnUp"
                                                onChange={
                                                    (e) => handleChangeEvent(e, "mobile")}
                                            />
                                        </div>
                                        <div class="form-check form-check-inline rd" >
                                            <input required class="form-check-input"
                                                type="radio"
                                                id="Male"
                                                name="gender"
                                                value="Male"
                                                onChange={
                                                    (e) => handleChangeEvent(e, "gender")}
                                            />
                                            <label class="form-check-label"
                                                htmlFor="Male" >
                                                Male </label>
                                        </div>
                                        <div class="form-check form-check-inline rd" >
                                            <input required class="form-check-input"
                                                type="radio"
                                                id="Female"
                                                name="gender"
                                                value="Female"
                                                onChange={
                                                    (e) => handleChangeEvent(e, "gender")}
                                            />
                                            <label class="form-check-label"
                                                htmlFor="Female" >
                                                Female </label>
                                        </div>
                                        <div class="form-group2" >
                                            <label htmlFor="password" > Password: </label>
                                            <input required id="password"
                                                type="password"
                                                className="form-control sgnUp"
                                                onChange={
                                                    (e) => handleChangeEvent(e, "password")}
                                            />
                                        </div>
                                        <div class="form-group2" >
                                        <input 
    required 
    type="submit" 
    value="submit" 
    className="btn-primary btnn form-submit sub-btn sgnUp" 
    style={{ marginBottom: '30px' }} 
/>

                                        </div>
                                        <div>
                                            <small className="form-text text-muted link-text" >
                                                Already a User ?
                                            </small>
                                            <span className="signuptext" >
                                                <a href="/#"
                                                    onClick={
                                                        (e) => getToSignIn(e)} >
                                                    Sign - In
                                                </a>
                                            </span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    );
}