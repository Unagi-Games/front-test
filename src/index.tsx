import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Collection from './pages/Collection';
import CreateCard from './pages/CreateCard';
import CreateCardForm from './CreateCardForm';

const App = () => (
  <Router>
    <nav>
      <ul>
        <li>
          <Link to="/collection">Collection</Link>
        </li>
        <li>
          <Link to="/create-card">Create Card</Link>
        </li>
      </ul>
    </nav>
    <Switch>
      <Route exact path="/collection" component={Collection} />
      <Route exact path="/create-card" component={CreateCardForm} />
    </Switch>
  </Router>
);

render(<App />, document.getElementById('root'));
