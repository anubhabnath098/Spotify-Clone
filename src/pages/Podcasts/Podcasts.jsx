import React from 'react'
import "./Podcasts.css"
import Card from '../../components/Card/Card'
import { useEffect } from 'react'
import { useStateProvider } from '../../utils/StateProvider'
import axios from 'axios'
import { reducerCases } from '../../utils/Constants'
export default function Podcasts() {
  const [{token,podcasts}, dispatch] = useStateProvider();
  useEffect(()=>{
    
      const getPodcasts = async()=>{
        try{
      const response = await axios.get("https://api.spotify.com/v1/me/shows",
        {
          headers:{
            authorization: "Bearer "+token,
            "Content-Type":"application/json"
          }
        }
      )
      const podcast = [];
      for(let i=0;i<response.data.items.length;i++){
        podcast[i] = response.data.items[i].show;
      }

      const podcasts = podcast.map(({id, images, name, description})=>({
        id,
        images,
        name,
        owner:description
      }))
      dispatch({type:reducerCases.SET_PODCASTS, podcasts});
    }
    

  
  catch(err){
    console.log("error", err);
  }

  }
  getPodcasts();
  return ()=>{console.log("Podcast cleared")}
  },[token, dispatch])

  return (
      <div className="podcast">
      {podcasts.length > 0 &&(<div className="PlaylistContainer podcastContainer">
          <span className="heading">Your Favourite Podcasts</span>
          <div className="Playlist Playlist1">
            {podcasts.slice(0,podcasts.length<=5?podcasts.length: 5).map(p=>(
              <Card className="card1" id={p.id} play={p}/>
            ))}
          </div>
        </div>)}
        {podcasts.length>5&&(<div className="PlaylistContainer podcastContainer">
          <span className="heading">Top Podcast Picks for you</span>
          <div className="Playlist Playlist1">
            {podcasts.slice(6,podcasts.length<=5?podcasts.length:12).map(p=>(
              <Card className="card1" id={p.id} play={p}/>
            ))}
          </div>
        </div>)}
    </div>
  )
}
