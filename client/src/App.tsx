import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './pages/mainPage';
import MakePage from './pages/makePage';
import SearchPage from './pages/SearchPage';
import ErrorPage from './pages/ErrorPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/makedocs" component={MakePage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/error" component={ErrorPage} />
        <Route path="/" component={ErrorPage} />
      </Switch>
    </Router>
  );
};

export default App;
