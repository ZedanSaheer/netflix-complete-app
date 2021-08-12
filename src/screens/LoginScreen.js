import React , { useState } from 'react'
import './LoginScreen.css'
import { BsChevronRight } from "react-icons/bs";
import SignUpScreen from './SignUpScreen'

const LoginScreen = () => {

    const [signin, setSignIn] = useState(false);

    return (
   
        <div className="LoginScreen">
       
            <div className="LoginScreen-nav">
                <img className="nav-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png" alt="logo" />
                <button onClick={() => {
                    setSignIn(true)
                }}
                    className="LoginScreen-nav-button">
                    sign in
                </button>
            </div>
            
            <div className="loginscreen-content"> 
             {signin ? <SignUpScreen /> : (<> <h1>Unlimited movies , TV shows and more.</h1>
                <h2>Watch anywhere. Cancel anytime.</h2>
                <h2>Ready to watch? Enter your email to create or restart your membership.</h2>
                <div className="loginscreen-input">
                    <input type="email" name="email" placeholder="Email Address" className="loginscreen-input-email" autoComplete="off" />
                    <button onClick={() => {
                        setSignIn(true)
                    }}
                        className="loginscreen-input-button">Get started <BsChevronRight className="loginscreen-input-button-icon" /> </button>
                </div> </>)}
            </div>
            <div className="LoginScreen-fade "></div>
        </div>
    )
}

export default LoginScreen
