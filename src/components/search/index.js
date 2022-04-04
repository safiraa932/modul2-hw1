// import { render } from "@testing-library/react";
import { Component, useState, useEffect } from "react";
import Album from "../Album";
import CreatePlaylist from "../createPlaylist";

const SearchBar = () => {
  // state = {
  //   accessToken: window.location.hash
  //     .substring(1, window.location.hash.length - 1)
  //     .split("&")[0]
  //     .split("=")[1],
  //   search: "",
  //   data: [],
  // };
  const [accessToken, setAccessToken] = useState("");
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const hash = window.location.hash
      .substring(1, window.location.hash.length - 1)
      .split("&")[0]
      .split("=")[1];
    setAccessToken(hash);
  }, []);

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
        <form className="search" onSubmit={(e)=>{
        e.preventDefault()
        }}>
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
      </div>
      
      <div className="card" >
        {data.map((song) => (
          <div key={song.id} className="cardContent">
            <Album data={song} selected={selected} setSelected={setSelected} />
          </div>
        ))}
      </div>

      <CreatePlaylist accessToken={accessToken} selected={selected}/>
    </div>
  );
};

export default SearchBar;