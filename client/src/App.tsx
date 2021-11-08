import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './pages/MainPage';
import MakePage from './pages/MakePage';
import ErrorPage from './pages/ErrorPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/makedocs" component={MakePage} />
        <Route path="/error" component={ErrorPage} />
        <Route path="/" component={ErrorPage} />
      </Switch>
    </Router>
  );
};

export default App;
