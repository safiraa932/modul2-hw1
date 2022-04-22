import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Style from './playlist.module.css';

function Playlist() {
  const [playlistData, setPlaylistData] = useState([]);
  const accessToken = useSelector((state) => state.token.token);

  const getPlaylist = () => {
    axios
      .get('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setPlaylistData(res.data.items);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="container">
      <div className="card-playlist">
        <button type="button" variant="primary" onClick={getPlaylist} className={Style.btnPlaylistData}>
          Playlist Data
        </button>
      </div>
      <div className={Style.playlistData}>
        {playlistData.map((item) => (
          <div key={item.id} className={Style.playlistItem}>
            <h5>{item.name}</h5>
            <p>{item.description}</p>
            <p>{item.tracks.total}</p>
            <button type="button" className={Style.btnData}>
              Add song
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Playlist;
