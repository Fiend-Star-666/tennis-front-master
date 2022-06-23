import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListPlayersComponents from './components/ListPlayersComponents';

import AutoGridTable from './components/AutoGridTable';
import CustomPage from './components/CustomPage';
//TODO manual Search
import CustomSearch from './components/CustomSearch';

//redux
import counter from './components/Counter';
import ReduxSearch from './components/ReduxSearch';

class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <div className="container">
            <Switch>
              <Route exact path="/view" component={ListPlayersComponents} />
              <Route exact path="/grid" component={AutoGridTable} />
              <Route exact path="/customview" component={CustomPage} />
              <Route exact path="/customsearch" component={CustomSearch} />
              <Route exact path="/counter" component={counter}/>
              <Route exact path={'/iredux'} component={ReduxSearch} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
