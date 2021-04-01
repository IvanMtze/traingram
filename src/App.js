import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/home/Home';
import FacebookLoginComponent from './components/login/FacebookLoginComponent';
import GuardedRoute from './services/GuardedRoute';
import Header from "./components/header/Header";

export const AuthContext = React.createContext(); // added this
const initialState = {
  isAuthenticated: false,
  user: null,
};


const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", state);

      return {
        ...state,
        isAuthenticated: true,
        user: state
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};
function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  console.log(state.isAuthenticated)
  return (

    <AuthContext.Provider value={{
      state,
      dispatch
    }}>
      <Router>
        <Switch>
          <GuardedRoute exact path='/' component={Home} auth={state.isAuthenticated} />
          <Route path='/login' component={FacebookLoginComponent} />
        </Switch>
      </Router>
    </AuthContext.Provider>

  );
}

export default App;
