import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './pages/mainPage';
import MakePage from './pages/makePage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={MainPage} />
        <Route path='/makedocs' component={MakePage} />
      </Switch>
    </Router>
  );
}

export default App;
