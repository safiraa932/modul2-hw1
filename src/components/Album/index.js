import React, { useEffect } from "react";

const Album = ({ data }) => {
  // useEffect(() => {
  //   try {
  //     console.log(data);

  //     const imgAlbum = document.getElementById("img-album");
  //     const albumTitle = document.getElementById("album-title");
  //     const artistName = document.getElementById("artist-name");
  //     const releaseDate = document.getElementById("release-date");
  //     const totalTracks = document.getElementById("total-tracks");

  //     imgAlbum.src = data.album.images[1].url;
  //     albumTitle.innerText = data.album.name;
  //     artistName.innerText = data.artists[0].name;
  //     releaseDate.innerText = data.album.release_date;
  //     totalTracks.innerText = data.album.total_tracks;
  //   } catch (err) {
  //     alert(err.message);
  //   }
  // }, []);
console.log(data.album);
  return (
    <div className="card-suggested">
      <div id="img-album">
        {/* <img src="https://i.scdn.co/image/ab67616d0000b273e8b066f70c206551210d902b" /> */}
        <img src={data.album.images[0].url} alt={data.title}/>
      </div>
      <div id="album-detail card-content">
        <h1 id="album-title">{data.album.name}</h1>
        <div id="artist-info">
          <p>
            Artist : <span id="artist-name">{data.artists[0].name}</span>
          </p>
          <p>
            Release Date : <span id="release-date">{data.album.release_date}</span>
          </p>
          <p>
            Total Tracks : <span id="total-tracks">{data.album.total_tracks}</span>
          </p>
          <button className="btn bg-secondary">Select</button>
        </div>
      </div>
    </div>
  );
};

export default Album;