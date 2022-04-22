/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Style from './CreatePlaylist.module.css';

function CreatePlaylist({ selected }) {
  const [playlist, setPlaylist] = useState({
    namePlaylist: '',
    descriptionPlaylist: '',
  });
  const [hasError, setErrors] = useState(false);
  const [playlistId, setplaylistId] = useState('');

  const accessToken = useSelector((state) => state.token.token);

  const addSong = () => {
    console.log(selected);
    let allTracks = '';
    selected.forEach((it) => {
      allTracks += `${it},`;
    });
    axios
      .post(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks?access_token=${accessToken}&uris=${allTracks}`,
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const postData = () => {
    axios
      .post(
        'https://api.spotify.com/v1/users/fn8964dqui1zdjck785valjnk/playlists',
        {
          name: playlist.namePlaylist,
          description: playlist.descriptionPlaylist,
          public: false,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then((res) => {
        console.log(res.data);
        setplaylistId(res.data.id);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const errors = { ...playlist };
    if (errors.namePlaylist.length <= 10) {
      setErrors({
        ...errors,
        namePlaylist: 'Minimum 10 characters',
      });
    } else {
      setErrors({
        ...errors,
        namePlaylist: '',
      });
    }
    postData();
    setPlaylist({
      namePlaylist: '',
      descriptionPlaylist: '',
    });
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setPlaylist({
      ...playlist,
      [name]: value,
    });
    const errors = { ...playlist };
    if (errors.namePlaylist.length <= 10) {
      setErrors({
        ...errors,
        namePlaylist: 'Minimum 10 characters',
      });
    } else {
      setErrors({
        ...errors,
        namePlaylist: '',
      });
    }
  };
  console.log(selected);
  return (
    <>
      <div className="card-playlist">
        <button type="button" className={Style.btnAddSong} onClick={addSong}>
          Add to playlist
        </button>
      </div>
      <Container>
        <div className="playlist">
          <div className="title">
            <h1>Create playlist</h1>
          </div>
          <div className="form">
            <form id="submit-playlist" onSubmit={handleFormSubmit}>
              <div className={Style.inputGroup}>
                <label id="namePlaylist">Name:</label>
                <input
                  id="namePlaylist"
                  required
                  name="namePlaylist"
                  type="text"
                  value={playlist.namePlaylist}
                  onChange={handleFormChange}
                />
                {hasError.namePlaylist && (
                <p className="error">{hasError.namePlaylist}</p>
                )}
              </div>
              <div className={Style.inputGroup}>
                <label id="descPlaylist">Description:</label>
                <input
                  id="descPlaylist"
                  rows="4"
                  name="descriptionPlaylist"
                  type="text"
                  value={playlist.descriptionPlaylist}
                  onChange={handleFormChange}
                />
              </div>
              <button
                className={Style.btnSubmit}
                variant="primary"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </Container>

    </>
  );
}

export default CreatePlaylist;
