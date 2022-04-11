import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/login/index';
import Search from './components/search/index';
import PrivateRouter from './components/PrivateRouter';

function App() {
  // const accessToken = useSelector(state=> state.token.token)

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <PrivateRouter path="/create-playlist" component={Search} />
        </Switch>
      </Router>
      {/* {accessToken?<><Search/></>:<Login />} */}
    </div>
  );
}

export default App;
