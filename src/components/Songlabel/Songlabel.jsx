import React from 'react'
import "./Songlabel.css"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
export default function Songlabel({artist, onClick}) {
  return (
    <div className="song-label" onClick={onClick}>
      <div className="picture">
        <img src={artist.images[0].url} alt="" className="image" />
      </div>
      <div className="text">
        <span className="title">{artist.name}</span>
        <div className="play"><PlayArrowIcon className='play-button'/></div>
      </div>
      </div>
  )
}
