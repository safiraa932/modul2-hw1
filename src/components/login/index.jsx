// import {Component} from 'react'

// const client_secret ='7fdcd1e2fc264a3e966b4ef80d7a5e4b'

// class login extends Component {
// state={
//     access_token: '',
//     refresh_token: '',
//     token_type: '',
//     expires_in: '',
// }
//     render(){
//     return(
//         <div>
//             <h1>Login</h1>
//             <form>
//                 <a href={url}>Login</a>
//             </form>
//         </div>
//     )
//     }
// }

// export default login;

const AUTH_URL = "https://accounts.spotify.com/authorize";
const client_id = "7c0b4572c18e4e11ab7c884aea528def";
const redirect_uri = "http://localhost:3000/";
const scopes =
  "user-read-private user-read-email playlist-modify-private playlist-read-private playlist-modify-public playlist-read-collaborative user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-recently-played user-top-read user-follow-read user-follow-modify user-library-read user-library-modify";
const url = `${AUTH_URL}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes}&response_type=token&show_dialog=true`;

const Login = () => {
  const handleLogin = () => {
    window.open(
      `${AUTH_URL}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes}&response_type=token&show_dialog=true`
    );
  };

  return (
    <div className="App">
      <div className="btn-wrapper">
        <h1>Click here..</h1>
        <button className="btn bg-secondary1" onClick={() => handleLogin()}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;