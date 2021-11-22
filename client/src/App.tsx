import React, { useEffect, useReducer, createContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as dotenv from 'dotenv';
import MainPage from './pages/MainPage';
import MakePage from './pages/MakePage';
import SearchPage from './pages/SearchPage';
import ErrorPage from './pages/ErrorPage';
import WikiPage from './pages/WikiPage';
import UpdatePage from './pages/UpdatePage';
import LoginPage from './pages/LoginPage';
import GithubCallbackPage from './pages/GithubCallbackPage';
import JoinPage from './pages/JoinPage';
import CategoryPage from './pages/CategoryPage';
import { selectTgInitState, selectTgReducer } from './reducer/select-toggle-reducer';
import { selectTypeInitState, selectTypeReducer } from './reducer/select-type-reducer';
import { selectHandler } from './event-handler/select-handler';

dotenv.config();

const SelectTgContext = createContext(selectTgInitState);
const SelectTypeContext = createContext(selectTypeInitState);

const App = () => {
  const [SelectTgState, SelectTgDispatch] = useReducer(selectTgReducer, selectTgInitState);
  const [SelectTypeState, SelectTypeDispatch] = useReducer(selectTypeReducer, selectTypeInitState);
  const closeSelectALl = (event: any) => {
    SelectTgDispatch({ type: 'allOff' });
  };

  useEffect(() => {
    document.addEventListener('click', (event) => {
      selectHandler(event, SelectTgDispatch, SelectTypeDispatch);
    });

    document.addEventListener('wheel', closeSelectALl);
  }, []);

  return (
    <SelectTgContext.Provider value={SelectTgState}>
      <SelectTypeContext.Provider value={SelectTypeState}>
        <Router>
          <Switch>
            <Route path="/" exact component={MainPage} />
            <Route path="/makedocs" component={MakePage} />
            <Route path="/search" component={SearchPage} />
            <Route path="/error" component={ErrorPage} />
            <Route path="/w" component={WikiPage} />
            <Route path="/c" component={CategoryPage} />
            <Route path="/updatedocs" component={UpdatePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/join" component={JoinPage} />
            <Route path="/auth/github/callback" component={GithubCallbackPage} />
            <Route path="/" component={ErrorPage} />
          </Switch>
        </Router>
      </SelectTypeContext.Provider>
    </SelectTgContext.Provider>
  );
};

export default App;
export { SelectTgContext, SelectTypeContext };
