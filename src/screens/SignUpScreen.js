import React, { useRef } from 'react'
import { auth } from '../firebase'
import './SignUpScreen.css'

const SignUpScreen = () => {

    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const register = (e) => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(
            emailRef.current.value, passwordRef.current.value
        ).then((authUser) => {
            console.log(authUser);

        }).catch((error) => {
            alert(error.message);
        })
    }
    const signIn = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
            .then((authUser) => {
                console.log(authUser);
            }).catch((error) => {
                alert(error.message)
            })
    }

    return (
        <div className="signup">
            <form>
                <h1>sign in</h1>
                <input type="email" ref={emailRef} placeholder="Email Address" className="signup-input" />
                <input type="password" ref={passwordRef} placeholder="Password" className="signup-input" />
                <button type="submit" className="signup-input-button" onClick={signIn}>Sign in</button>
                <h4><span className="signup-bottom-gray">New to netflix?</span><span className="signup-bottom-link" onClick={register}>Sign up now.</span></h4>
            </form>
        </div>
    )
}

export default SignUpScreen
