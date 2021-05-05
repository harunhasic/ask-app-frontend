import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './App.scss';
import Header from './components/header/Header'
import Routes from './components/routing/Routes';

const App = () => {

  const [loggedInState, setLoggedInState] = useState(null);

  function changeLoggedInState() {
    if (loggedInState === null) {
      setLoggedInState(false);
      return;
    }
    setLoggedInState(!loggedInState);
  }

  return (
    
  <div className="app-container">
    <Router>
         <Header  loggedInState={loggedInState}/>
           <div className="route-container">
            <Routes changeLoggedInState={changeLoggedInState} />
           </div>
    </Router>
</div>
  );
}
export default App;
