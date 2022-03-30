import {Component} from 'react'


const AUTH_URL ='https://accounts.spotify.com/authorize'
const client_id = '7c0b4572c18e4e11ab7c884aea528def'
const redirect_uri = 'http://localhost:3000/'
const scopes = 'user-read-private user-read-email playlist-modify-private'
const url = `${AUTH_URL}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes}&response_type=token&show_dialog=true`
// const client_secret ='7fdcd1e2fc264a3e966b4ef80d7a5e4b'


class login extends Component {
state={
    access_token: '',
    refresh_token: '',
    token_type: '',
    expires_in: '',
}
    render(){
    return(
        <div>
            <h1>Login</h1>
            <form>              
                <a href={url}>Login</a>
            </form>
        </div>
    )
    }
}

export default login;