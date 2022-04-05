import "./App.css";
import Login from "./components/login/index";
import Search from "./components/search/index";
import { Component } from "react";
import {useSelector} from 'react-redux';

const App = ()=> {
  // state = {
  //   accessToken: window.location.hash
  //   .substring(1, window.location.hash.length - 1)
  //   .split("&")[0]
  //   .split("=")[1],
  // }

    const accessToken = useSelector(state=> state.token.token)

    return (
      <div className="App">
        {accessToken?<><Search/></>:<Login />}
      </div>
    );
}

export default App;