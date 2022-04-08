// import { render } from "@testing-library/react";
import { Component, useState, useEffect, useDebugValue } from "react";
import Album from "../Album";
import CreatePlaylist from "../createPlaylist";
import { useDispatch, useSelector } from "react-redux";
import { removeAccessToken } from "../../redux/slices/tokenSlice";
const SearchBar = () => {

  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state.token.token);

  const getSpotify = () => {
    fetch(
      "https://api.spotify.com/v1/search?q=" +
        search +
        "&type=track&limit=10&access_token=" +
        accessToken
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data.tracks.items);
      });
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    getSpotify();
  };

  return (
    <div className="box">
      <div className="container">
        <form
          className="search"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            className="input"
            name="txt"
            placeholder="masukkan lagu yang ingin anda cari"
            value={search}
            onChange={handleChange}
          ></input>
          <button className="button" type="button" onClick={handleSubmit}>
            Search
          </button>
        </form>
        <button className="button" type="button" onClick={ () => dispatch(removeAccessToken())}>Logout</button>
      </div>

      <div className="card">
        {data.map((song) => (
          <div key={song.id} className="cardContent">
            <Album data={song} selected={selected} setSelected={setSelected} />
          </div>
        ))}
      </div>

      <CreatePlaylist accessToken={accessToken} selected={selected} />
    </div>
  );
};

export default SearchBar;