import "./App.css";
import Home from "./pages/home/index";
import Login from "./components/login/index";
import Search from "./components/search/index";
import { Component } from "react";
import CreatePlaylist from "./components/createPlaylist/index";

class App extends Component {
  state = {
    accessToken: window.location.hash
    .substring(1, window.location.hash.length - 1)
    .split("&")[0]
    .split("=")[1],
  }
  render() {
    return (
      <div className="App">
        {this.state.accessToken?<><Search accessToken={this.state.accessToken}/></>:<Login />}
      </div>
    );
  }
}

export default App;