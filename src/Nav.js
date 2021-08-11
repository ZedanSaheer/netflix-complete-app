import React , {useState , useEffect} from 'react'
import './Nav.css'

const Nav = () => {

    const [show, handleShow] = useState(false)
  
    useEffect(() => {
        window.addEventListener('scroll',()=>{
            window.scrollY>100? handleShow(true):handleShow(false);
        });
        return ()=> {
            window.removeEventListener('scroll');
        }
    }, [])

    return (
        <div className={`nav ${show && "nav-black" }`}>
                <img className="nav-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png" alt="logo"/>
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="profile" className="nav-avatar" />
        </div>
    )
}

export default Nav
