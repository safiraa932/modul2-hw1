import React from 'react';

function Album({ data, selected, setSelected }) {
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

  return (
    <div className="card-suggested">
      <table>
        <tbody>
          <tr>
            <td>
              <div id="img-album">
                <img src={data.album.images[0].url} alt={data.title} />
              </div>
            </td>
            <td width="100%">
              <div id="album-detail card-content">
                <h2 id="album-title">{data.name}</h2>
                <div id="artist-info">
                  <p>
                    <span id="artist-name">{data.artists[0].name}</span>
                  </p>
                </div>
              </div>
            </td>
            <td>
              {selected.includes(data.uri) ? (
                <button
                  type="button"
                  className="btn bg-secondary"
                  onClick={() => setSelected(selected.filter((uri) => uri !== data.uri))}
                >
                  Deselect
                </button>
              ) : (
                <button
                  type="button"
                  className="btn bg-secondary"
                  onClick={() => setSelected([...selected, data.uri])}
                >
                  Select
                </button>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Album;
