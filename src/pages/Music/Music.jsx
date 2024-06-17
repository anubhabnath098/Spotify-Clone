import React from 'react'
import "./Music.css"
import Label from '../../components/Label/Label'

import Avatar from '../../components/Avatar/Avatar'
import Card from '../../components/Card/Card'
import { useEffect } from 'react'
import { useStateProvider } from '../../utils/StateProvider'
import axios from 'axios'
import { reducerCases } from '../../utils/Constants'
import { useNavigate } from 'react-router-dom'

export default function Music() {

  const [{ token, playlists, topItems,albums, followedItems }, dispatch] = useStateProvider();

  let navigate = useNavigate();

  useEffect(() => {
    const getPlaylistData = async () => {
      try {
        const response = await axios.get("https://api.spotify.com/v1/me/playlists", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });
        const { items } = response.data;
        const playlists = items.map(({ name, id, images, owner }) => ({
          name,
          id,
          images,
          owner: owner.display_name,
        }));
        
        dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };
    getPlaylistData();
    return () => {
      console.log("Playlist Cleared");
    };
  }, [token, dispatch]);

  useEffect(() => {
    const getTopItems = async () => {
      try {
        const { data } = await axios.get("https://api.spotify.com/v1/me/top/artists", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });

        const topItems = data.items.map(({ id, images, name }) => ({
          id,
          images,
          name,
          owner: name,
        }));
        dispatch({ type: reducerCases.SET_TOPITEMS, topItems });
      } catch (error) {
        console.error("Error fetching top artists:", error);
      }
    };
    getTopItems();
    return () => {
      console.log("Artist Cleared");
    };
  }, [token, dispatch]);

  useEffect(() => {
    const getFollowedItems = async () => {
      try {
        const response = await axios.get('https://api.spotify.com/v1/me/following?type=artist', {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });
        const followedItems = response.data.artists.items.map(({ id, images, name }) => ({
          id,
          images,
          name,
          owner: name,
        }));
        console.log(followedItems);
        dispatch({ type: reducerCases.SET_FOLLOWED_ARTISTS, followedItems });
      } catch (error) {
        console.error("Error fetching followed artists:", error);
      }
    };
    getFollowedItems();
    return () => {
      console.log("Followed Artist Cleared");
    };
  }, [token, dispatch]);


  useEffect(()=>{
    const getAlbums = async()=>{
      try{
        const {data} = await axios.get("https://api.spotify.com/v1/me/albums",
          {
            headers:{
              authorization: "Bearer "+token,
              "Content-Type":"application/json"
            }
          }
        )
        const album = [];
        for(let i=0;i<data.items.length;i++){
          album[i] = data.items[i].album;
        }
        const albums = album.map(({id, images, name, artists})=>({
          id,
          images, 
          name,
          owner:artists[0].name
        }))
        
        dispatch({ type: reducerCases.SET_ALBUMS, albums });
      }
      
      catch(err){
        console.log("Error", err.response ? err.response.data : err.message);
      }
    }
    getAlbums();

    return ()=>{console.log("Album cleared")}
    
  },[token, dispatch]);
  
  const goToPLaylist=(playlistId)=>{
    navigate(`/playlist/${playlistId}`)
  }
  const goToArtist= (artistId)=>{
    navigate(`/artist/${artistId}`);
  }
  const goToAlbum = (albumId)=>{
    navigate(`/album/${albumId}`);
  }

  return (
    <div className="musicContainer">
      <div className="labelContainer">
          <Label/>
      </div>
      {playlists.length>0 &&(<div className="PlaylistContainer">
          <span className="heading">Your Playlists</span>
          <div className="Playlist">
            {playlists.slice(0,playlists.length<=5?playlists.length:5).map(p=>(
              <Card id={p.id} play={p} onClick={()=>goToPLaylist(p.id)}/>
            ))}
          </div>
        </div>)}
        {followedItems.length>0&&(<div className="PlaylistContainer">
          <span className="heading">Your Followed Artists</span>
          <div className="Playlist">
            {followedItems.slice(0,followedItems.length<=5?followedItems.length:5).map(a=>(
              <Avatar id={a.id} play={a} onClick={()=>goToArtist(a.id)}/>
            ))}
          </div>
        </div>)}
        {albums.length>0&&(<div className="AlbumContainer PlaylistContainer">
          <span className="heading">Your Favourite Albums</span>
          <div className="Playlist">
            {albums.slice(0,albums.length<=5?albums.length:5).map(a=>(
              <Card id={a.id} play={a} onClick={()=>goToAlbum(a.id)}/>
            ))}
          </div>

        </div>)}
        {topItems.length>0&&(<div className="PlaylistContainer">
          <span className="heading">Your Top Artists</span>
          <div className="Playlist">
            {topItems.slice(0,topItems.length<=5?topItems.length:5).map(a=>(
              <Avatar id={a.id} play={a} onClick={()=>goToArtist(a.id)}/>
            ))}
          </div>
        </div>)}
    </div>
  )
}
