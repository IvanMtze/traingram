import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/home/Home';
import FacebookLoginComponent from './components/login/FacebookLoginComponent';
import GuardedRoute from './services/GuardedRoute';
import { auth } from './firebase'
import ImageUpload from "./components/imageUpload/ImageUpload";
import Profile from "./components/profile/Profile";

export const AuthContext = React.createContext(); // added this

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", state);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    case "LOGOUT":
      localStorage.clear();
      auth.signOut();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
      case "HEROKU-TOKEN":
        localStorage.setItem("mongodbtoken", state);
        return {
          ...state,
          mongodbtoken:action.payload
        };
    default:
      return state;
  }
};
function App() {
  const initialState = {
    isAuthenticated: false,
    user: null,
    mongodbtoken:null
  };
  const [state, dispatch] = React.useReducer(reducer, initialState);


  return (
    <AuthContext.Provider  value={{
      state,
      dispatch
    }}>
      <Router>
          <Switch>
            <GuardedRoute exact path='/' component={Home} auth={auth.currentUser!=null}/>
            <GuardedRoute exact path='/profile' component={Profile} auth={auth.currentUser!=null}  />
            <GuardedRoute exact path='/upload' component={ImageUpload} auth={auth.currentUser!=null}/>
            <Route path='/login' component={FacebookLoginComponent} />
          </Switch>
        
      </Router>
      </AuthContext.Provider>
  );
}

export default App;
