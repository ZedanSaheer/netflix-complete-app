import React from 'react'
import './SignUpScreen.css'

const SignUpScreen = () => {
    return (
        <div className="signup">
        <form>
            <h1>sign in</h1>
            <input type="email" placeholder="Email Address" className="signup-input"/>
            <input type="password" placeholder="Password" className="signup-input"/>
            <button type="submit" className="signup-input-button">Sign in</button>
            <h4><span className="signup-bottom-gray">New to netflix?</span><span className="signup-bottom-link">Sign up now.</span></h4>
            </form>
        </div>
    )
}

export default SignUpScreen
