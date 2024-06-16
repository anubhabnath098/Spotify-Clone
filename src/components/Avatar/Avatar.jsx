import React from 'react'
import "../Card/Card.css"
import "./Avatar.css"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
export default function Avatar({play, onClick}) {
  return (
    <div className="card" onClick={onClick}>
      <div className="cardImage">
        <img src={play.images[0].url} alt="" className='img img1'/>
        <div className="play"><PlayArrowIcon className='play-button'/></div>
      </div>
      <div className="Cardtext">
        <span className="title1">{play.name}</span>
        <span className="author1">{play.author}</span>
      </div>
    </div>
  )
}
