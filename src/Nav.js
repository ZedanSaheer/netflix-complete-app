import React , {useState , useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import './Nav.css'

const Nav = () => {

    const [show, handleShow] = useState(false)
    const history = useHistory();
  
    useEffect(() => {
        window.addEventListener('scroll',()=>{
            window.scrollY>100? handleShow(true):handleShow(false);
        });
        return ()=> {
            window.removeEventListener('scroll' , ()=>{
                window.scrollY>100? handleShow(true):handleShow(false);
            });
        }
    }, [])

    return (
        <div className={`nav ${show && "nav-black" }`}>
                <img onClick = {()=>{
                    history.push("/")}}
                    className="nav-logo"
                     src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png" alt="logo"/>
                <img onClick = {()=>{
                    history.push("/profile")
                }}
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="profile" className="nav-avatar" />
        </div>
    )
}

export default Nav
