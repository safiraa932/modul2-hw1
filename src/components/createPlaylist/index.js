import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";

const CreatePlaylist = ({ selected }) => {
  const [playlist, setPlaylist] = useState({
    namePlaylist: "",
    descriptionPlaylist: "",
  });
  const [hasError, setErrors] = useState(false);
  const [playlistData, setPlaylistData] = useState([]);
  const [playlist_id, setPlaylist_id] = useState("");

  const accessToken = useSelector((state) => state.token.token);

  const getPlaylist = () => {
    axios
      .get(`https://api.spotify.com/v1/me/playlists`, {
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
  const addSong = () => {
    console.log(selected);
    let allTracks = "";
    selected.forEach((it) => {
      allTracks += it + ",";
    });
    axios
      // `playlists/${playlist.id}/tracks?access_token=${accessToken}&uris=${allTracks}`
      .post(
        `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?access_token=${accessToken}&uris=${allTracks}`
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
        "https://api.spotify.com/v1/users/fn8964dqui1zdjck785valjnk/playlists",
        {
          name: playlist.namePlaylist,
          description: playlist.descriptionPlaylist,
          public: false,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setPlaylist_id(res.data.id);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // useEffect(() => {
  //   console.log("selected ", selected);
  // }, [selected]);

  // useEffect(()=>{
  //   console.log("panggil")
  //  getPlaylist()
  // },[])

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const errors = { ...playlist };
    if (errors.namePlaylist.length <= 10) {
      setErrors({
        ...errors,
        namePlaylist: "Minimum 10 characters",
      });
    } else {
      setErrors({
        ...errors,
        namePlaylist: "",
      });
    }
    postData();
    setPlaylist({
      namePlaylist: "",
      descriptionPlaylist: "",
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
        namePlaylist: "Minimum 10 characters",
      });
    } else {
      setErrors({
        ...errors,
        namePlaylist: "",
      });
    }
  };

  return (
    <>
      <div className="container">
        <div className="card-playlist">
          <div className="title"></div>
          <Button variant="primary" onClick={addSong}>
            Add to playlist
          </Button>
          <Button variant="primary" onClick={getPlaylist}>
            Playlist Data
          </Button>
        </div>
        {playlistData.map((item, index) => (
          <div key={index}>
            <div className="playlist-data">
              <div>
                <h5>{item.name}</h5>
                <p>{item.description}</p>
                <p>{item.tracks.total}</p>
                <Button variant="primary" onClick={addSong}>
                  Add song
                </Button>
              </div>
            </div>
          </div>
        ))}

        <div className="playlist">
          <div className="title">
            <h1>Create playlist</h1>
          </div>
          <div className="form">
            <form onSubmit={handleFormSubmit}>
              <div className="playlistName">
                <label>Name</label>
                <input
                  required
                  name="namePlaylist"
                  type="text"
                  placeholder="Name playlist"
                  value={playlist.namePlaylist}
                  onChange={handleFormChange}
                />
                {hasError.namePlaylist && (
                  <p className="error">{hasError.namePlaylist}</p>
                )}
              </div>
              <div className="playlistDescription">
                <label>Description</label>
                <input
                  name="descriptionPlaylist"
                  type="text"
                  placeholder="Description"
                  value={playlist.descriptionPlaylist}
                  onChange={handleFormChange}
                />
              </div>
              <Button variant="primary" type="submit">
                Submit
              </Button>{" "}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePlaylist;