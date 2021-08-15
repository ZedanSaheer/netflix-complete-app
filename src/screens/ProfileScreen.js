import React , {useState} from 'react'
import './ProfileScreen.css'
import Nav from '../Nav'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/counter/userSlice'
import { auth } from '../firebase'
import ProfileScreenPlans from './ProfileScreenPlans'

const ProfileScreen = ({newuser}) => {

    const user = useSelector(selectUser);
    const [subscribedUser, setSubUser] = useState(false);

    console.log(newuser);

    return (
        <div className="profilescreen">
            <Nav subscribedUser={subscribedUser}/>
            {newuser !== "" && <div className="popup-container"><div className="welcome-user slide-right "><span className="welcome-user-text">Hello<span className="welcome-user-name"> {newuser}!</span>Welcome to zedan's app</span></div></div>}
            <div className="profilescreen-body">
                <div className="profilescreen-box">
                    <h1>Edit profile</h1>
                    <div className="profilescreen-box-container">
                        <div className="profilescreen-box-icon">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="profile" className="profilescreen-avatar" />
                        </div>
                        <div className="profilescreen-box-content">
                            <div className="profilescreen-box-content-email"><span className="profilescreen-box-content-email-text">{user.email}</span></div>
                            <ProfileScreenPlans  setUser = {setSubUser}/>
                        </div>
                    </div>
                    <div className="profilescreen-box-content-button">
                        <button onClick = {()=>{
                            auth.signOut();
                        }} 
                        className="profilescreen-signout">sign out</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen
