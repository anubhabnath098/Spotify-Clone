import React from 'react'
import "./Card.css"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
export default function Card({play, onClick}) {
  return (
    <div className="card" onClick={onClick}>
      <div className="cardImage">
        <img src={play.images[0].url} alt="" className='img'/>
        <div className="play"><PlayArrowIcon className='play-button'/></div>
      </div>
      <div className="Cardtext">
        <span className="title1">{play.name}</span>
        <span className="author1">{play.owner}</span>
      </div>
    </div>
  )
}
