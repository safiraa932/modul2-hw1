// import { render } from "@testing-library/react";
import { Component } from "react";
import Album from "../Album";

const access_token =
  "BQAYo_mFHjzxFciqDF0OJSDVlmPO0aSdz_12m7Cgv5KFO_vwnBE9O9uA-IfJA8Rot1-dlH-Cf7szt-TV7cpCM9-OmHVXn0NGcoD5HggDBJK3677VXNxBHTNh4o40Q1987HZedmsbn_HQ43HGARlrHujuzzb1mP8BPE2P8UV9qOkLiaG02EZzygVjTJWZk470dqxdyuJycQGoxryh";

class SearchBar extends Component {
  state = {
    accessToken: window.location.hash
    .substring(1, window.location.hash.length - 1)
    .split("&")[0]
    .split("=")[1],
    search: "",
    data: [],
  };

  getSpotify = () => {
    fetch(
      "https://api.spotify.com/v1/search?q=" +
        this.state.search +
        "&type=track&limit=10&access_token=" +
        this.state.accessToken
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          data: data.tracks.items,
        });
      });
  };

  handleChange = (event) => {
    this.setState({
      search: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.getSpotify();
  };

  render() {
    return (
      <div className='box'>
        <form nameName='search'>
          <input
            type="text"
            className='input'
            name="txt"
            value={this.state.search}
            onChange={this.handleChange}
          ></input>
          <button
            className='button'
            type="submit"
            onClick={this.handleSubmit}
          >
            Search
          </button>
        </form>
        <div className='card'>
          {this.state.data.map((song, index) => (
            <div className='cardContent'>
              <Album key={song.id} data={song} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default SearchBar;