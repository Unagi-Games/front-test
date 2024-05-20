import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Collection } from './pages/Collection';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/collection" component={Collection} />
    </Switch>
  </Router>
);

render(<App />, document.getElementById('root'));
