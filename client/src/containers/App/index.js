import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from 'containers/Home';
import NotFound from 'containers/NotFound';
import AppHeader from 'components/AppHeader';
import CatsListPage from '../Cats';
import CatContainer from 'containers/Cat';

class App extends PureComponent {
  render() {
    return (
      <div>
        <Router>
          <div>
            <AppHeader />
            <Switch>
              <Route exact path="/" component={CatsListPage} />
              <Route exact path="/add" component={HomePage} />
              <Route path="/cat/:id" component={CatContainer} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
