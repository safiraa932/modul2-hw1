import "./App.css";
import Login from "./components/login/index";
import Search from "./components/search/index";
import Home from "./pages/home/index";
import {useSelector} from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRouter from "./components/PrivateRouter"

const App = ()=> {
    // const accessToken = useSelector(state=> state.token.token)

    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <PrivateRouter path="/create-playlist" component={Search}></PrivateRouter>
          </Switch>
        </Router>
        {/* {accessToken?<><Search/></>:<Login />} */}
      </div>
    );
}

export default App;