import React from 'react';

const getAlbumCover = (track) => {
  const albumImages = track.album.images;
  return albumImages[albumImages.length - 1].url;
}

const getArtists = (track) => {
  let artists = '';
  track.artists.forEach((artist, index) => {
    artists += artist.name;
    if (index !== track.artists.length - 1) {
      artists += ', '
    }
  });
  return artists;
}

const convertDuration = (durationInMs) => {
  const totalSeconds = Math.floor(durationInMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  if (seconds < 10) seconds = '0' + seconds;
  return `${minutes}:${seconds}`;
}

const SearchResultRow = ({ track, togglePlay, isPlaying, favorites, toggleFavorite }) => {
  const isFavorite = favorites.indexOf(track.id) > -1;

  return (
    <div className="results-row">
      <div className="album-col" onClick={() => togglePlay(track.uri)}>
        {isPlaying ? <div><img src="client/assets/pause.png" /></div> : <div><img src="client/assets/play.png" /></div>}
        <img src={getAlbumCover(track)} className="album-art" />
      </div>
      <div className="track-col">
        <div>{track.name}</div>
        <div>by {getArtists(track)}</div>
      </div>
      <div className="duration-col">{convertDuration(track.duration_ms)}</div>
      <div
        className={`like-col ${isFavorite ? "favorite" : ""}`}
        onClick={(e) => { toggleFavorite(track.id, isFavorite) }}
      >
        <svg height="20" viewBox="0 0 48 48" width="20">
          <path></path>
        </svg>
      </div>
    </div>
  );
}

export default SearchResultRow;