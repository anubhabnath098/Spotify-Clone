import React, { useEffect } from 'react';
import "./Sidebar.css";
import Playlist from '../Playlist/Playlist';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AddIcon from '@mui/icons-material/Add';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { reducerCases } from '../../utils/Constants';
import { useStateProvider } from '../../utils/StateProvider';
import { useNavigate } from 'react-router-dom';


export default function Sidebar() {
  const [{ token, playlists, topItems, albums }, dispatch] = useStateProvider();
  const navigate = useNavigate()
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


  const changeCurrentPlaylist = (selectedPlaylistId)=>{
    dispatch({ type: reducerCases.SET_PLAYLIST_ID, payload: selectedPlaylistId });
    navigate(`/playlist/${selectedPlaylistId}`);
    
  }
  const changeCurrentArtist = (selectedArtistId)=>{
    dispatch({ type: reducerCases.SET_ARTIST_ID, payload: selectedArtistId });
    navigate(`/artist/${selectedArtistId}`);
  }

  const changeCurrentAlbum = (selectedAlbumId)=>{
    dispatch({ type: reducerCases.SET_ALBUM_ID, payload: selectedAlbumId });
    navigate(`/album/${selectedAlbumId}`);
  }

  const playlistRoute = ()=>{
    navigate(`/playlist/2K5JtuXb5hZGzKvMZFsdXf`)
  }
  const ArtistRoute = ()=>{
    navigate(`/artist/7Ln80lUS6He07XvHI8qqHH`)
  }
  const AlbumRoute = ()=>{
    navigate(`/album/78bpIziExqiI9qztvNFlQu`)
  }

  //"2K5JtuXb5hZGzKvMZFsdXf"
//"7Ln80lUS6He07XvHI8qqHH"
//"78bpIziExqiI9qztvNFlQu"

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarTop">
          <div className="sidebarToplabel">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'btn1 activated' : 'btn1')}>
              <HomeIcon className="icon" /><span className="home">Home</span>
            </NavLink>
          </div>
          <div className="sidebarToplabel">
            <NavLink to="/search" className={({ isActive }) => (isActive ? 'btn1 activated' : 'btn1')}>
              <SearchIcon className="icon" /><span className="search">Search</span>
            </NavLink>
          </div>
        </div>
        <div className="sidebarCenter">
          <div className="sidebarCenterWrapper">
            <div className="library">
              <NavLink to="/" className={({ isActive }) => (isActive ? 'btn1 activated' : 'btn1')}>
                <LibraryMusicIcon className="icon" />Your Library
              </NavLink>
            </div>
            <div className="directions">
              <span className="add action"><AddIcon /></span>
              <span className="arrow action"><ArrowForwardIcon /></span>
            </div>
          </div>
          <div className="buttons">
          <button className="btn" onClick={()=>playlistRoute()}>{"Playlist"}</button>
            <button className="btn" onClick={()=>ArtistRoute()}>{"Artist"}</button>
            <button className="btn" onClick={()=>AlbumRoute()}>{"Albums"}</button>
            
          </div>
        </div>
        <div className="sidebarBottom">
          {playlists&&(playlists.map(p => (
            <Playlist key={p.id} playlist={p} onClick={()=>changeCurrentPlaylist(p.id)}/>
          )))}
          {topItems&&(topItems.map(p => (
            <Playlist key={p.id} playlist={p} onClick={()=>changeCurrentArtist(p.id)}/>
          )))}
          {albums&&(albums.map(p => (
            <Playlist key={p.id} playlist={p} onClick ={()=>changeCurrentAlbum(p.id)} />
          )))}
        </div>
      </div>
    </div>
  );
}
