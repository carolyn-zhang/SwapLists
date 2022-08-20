import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from './components/Home.js';
import List from './components/List.js';
import Login from './components/Login.js';
import WelcomePage from './components/WelcomePage';
import SignUp from './components/SignUp';

export default function App() {
  return (
    <BrowserRouter>
     <Switch>
       <Route exact path="/" component={WelcomePage} />
       <Route path="/home" component={Home} />
       <Route exact path="/list" component={List}/>
       <Route path="/login" component={Login}/>
       <Route path="/register" component={SignUp}/>
       {/* <Route path="/create-list" component={CreateList}/> */}
     </Switch>
   </BrowserRouter>
  );
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
