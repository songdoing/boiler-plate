import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';
function App() {
  return (
    <Router>
      <div>

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
          
          auth.js안에 보면 function 인자로 specificComponent, option, adminRoute 있다.
        */}
        <Switch>
          <Route exact path="/" component = {Auth( LandingPage, null )} />
          <Route exact path="/login" component = {Auth(LoginPage, false )} />
          <Route exact path="/register" component = {Auth(RegisterPage, false )}>
            <RegisterPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
/*
function Home() {
  return (
    <div>
      <h2>Home Welcome</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About me</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}
*/
