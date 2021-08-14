import React, { useRef , useState} from 'react'
import { auth } from '../firebase'
import './SignUpScreen.css'

const SignUpScreen = () => {

    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const nameRef = useRef(null)
    const [signup, setSignUp] = useState(false)

   const enableSignUp = ()=>{
        if(signup){
            setSignUp(false)
        } else {
            setSignUp(true)
        }
   }

    const register = (e) => {
        e.preventDefault();
        
        auth.createUserWithEmailAndPassword(
            emailRef.current.value, passwordRef.current.value
        ).then((authUser) => {
            console.log(authUser.displayName)
            authUser.user.updateProfile({
                displayName : nameRef.current.value
            })

        }).catch((error) => {
            alert(error.message);
        })
    }

    const signIn = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
            .then((authUser) => {
                console.log(authUser);
                authUser.user.updateProfile({
                    displayName : nameRef.current.value
                })
            }).catch((error) => {
                alert(error.message)
            })
    }

    return (
        <div className="signup">
            <form>
                <h1>sign in</h1>
               { signup? <input type="text" ref={nameRef} placeholder="Please enter your name" className="signup-input" required /> : null}
                <input type="email" ref={emailRef} placeholder="Email Address" className="signup-input" required/>
                <input type="password" ref={passwordRef} placeholder="Password" className="signup-input" />
                {signup ?  <button type="submit" className="signup-input-button" onClick={register}>Sign up</button>  : <button type="submit" className="signup-input-button" onClick={signIn}>Sign in</button> }
               {signup? <h4><span className="signup-bottom-gray">Already have an account ?</span><span className="signup-bottom-link" onClick={enableSignUp}>Sign in now.</span></h4> : <h4><span className="signup-bottom-gray">New to netflix?</span><span className="signup-bottom-link" onClick={enableSignUp}>Sign up now.</span></h4>}
            </form>
        </div>
    )
}

export default SignUpScreen
