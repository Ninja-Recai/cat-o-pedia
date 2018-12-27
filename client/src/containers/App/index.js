import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from 'containers/Home';
import NotFound from 'containers/NotFound';
import AppHeader from 'components/AppHeader';
import CatsListPage from '../Cats';

class App extends PureComponent {
  render() {
    return (
      <div>
        <AppHeader />
        <Router>
          <Switch>
            <Route exact path="form" component={HomePage} />
            <Route exact path="/" component={CatsListPage} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
