import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { setAccessToken } from '../../redux/slices/tokenSlice';

function Login() {
  const history = useHistory();
  const accessToken = useSelector((state) => state.token.token);
  const dispatch = useDispatch();

  const AUTH_URL = 'https://accounts.spotify.com/authorize';
  const spotifyClientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const redirectUri = 'http://localhost:3000/';
  const scopes = 'user-read-private user-read-email playlist-modify-private user-library-read user-library-modify';
  const url = `${AUTH_URL}?client_id=${spotifyClientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token&show_dialog=true`;

  useEffect(() => {
    if (accessToken) {
      history.push('/create-playlist');
    }
  }, [accessToken, history]);

  const handleLogin = () => {
    window.location.replace(
      url,
    );
  };

  const accessTokenFromUrl = window.location.hash
    .substring(1, window.location.hash.length - 1)
    .split('&')[0]
    .split('=')[1];

  if (accessTokenFromUrl) {
    dispatch(setAccessToken({ accessToken: accessTokenFromUrl }));
    history.push({
      pathname: '/create-playlist',
    });
  }

  return (
    <div className="App">
      <div className="btn-wrapper">
        <h1>Click here..</h1>
        <button type="button" className="btn bg-secondary1" onClick={() => handleLogin()}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
