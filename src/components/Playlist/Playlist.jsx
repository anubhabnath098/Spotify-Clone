import "./Playlist.css"
export default function Playlist({playlist, onClick}) {

  return (
    
          
          <div className="playlist" onClick={onClick}>
              <div className="imageContainer"><img className="image" src={playlist.images[0].url} alt="" /></div>
              <div className="textContainer">
                  <span className="name">{playlist.name}</span>
                  <span className="author">By {playlist.owner}</span>
            </div>
          </div>

  )
}
