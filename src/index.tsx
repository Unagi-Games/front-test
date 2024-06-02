import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import { Collection } from './pages/Collection';
import { CreateCard } from './pages/CreateCard';

import './index.css';

const Home = () => {
  return (
    <div className="home">
      <ul>
        <li>
          <Link to="/collection">Collection</Link>
        </li>
        <li>
          <Link to="/create-card">Create Card</Link>
        </li>
      </ul>
    </div>
  );
};

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/collection" component={Collection} />
      <Route exact path="/create-card" component={CreateCard} />
    </Switch>
  </Router>
);

render(<App />, document.getElementById('root'));
