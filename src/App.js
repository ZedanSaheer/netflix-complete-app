import React , {useEffect , useState} from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login , logout, selectUser} from './features/counter/userSlice';
import ProfileScreen from './screens/ProfileScreen';


const App = () => {

  const user = useSelector(selectUser) ;
  const dispatch = useDispatch();
  const [newuser, setNewUser] = useState("")


  useEffect(() => {
    //login
    const unsubscribe = auth.onAuthStateChanged(
      (userAuth) => {
      if(userAuth){
         dispatch(login({
           uid : userAuth.uid,
           email : userAuth.email,
         }));
      } else{
        //log out
        dispatch(logout())
      }
    });

   return unsubscribe;

  }, [dispatch])

  return (
    <div className="app">
      <Router>
      {!user?
       (<LoginScreen setNewUser = {setNewUser}/>):
        (<Switch>
        <Route path= '/profile'>
           <ProfileScreen newuser = {newuser}/>
        </Route>
          <Route path="/">
           <HomeScreen />
          </Route>
        </Switch>)}
      </Router>
        
    </div>
  )
}

export default App

