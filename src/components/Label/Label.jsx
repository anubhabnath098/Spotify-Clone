import React, { useEffect } from 'react';
import "./Label.css";
import Songlabel from '../Songlabel/Songlabel';
import { useStateProvider } from '../../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../../utils/Constants';
import {useNavigate} from 'react-router-dom'
export default function Label() {
  const [{ token, playlists, topItems }, dispatch] = useStateProvider();
  let navigate = useNavigate();
  useEffect(() => {
    const getPlaylistData = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/playlists",
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        const { items } = response.data;
        const playlists = items.map(({ name, id, images, owner }) => ({
          name,
          id,
          owner: owner.display_name,
          images,
        }));
        dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };
    getPlaylistData();
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
        }));
        dispatch({ type: reducerCases.SET_TOPITEMS, topItems });
      } catch (error) {
        console.error("Error fetching top artists:", error);
      }
    };
    getTopItems();
  }, [token, dispatch]);

  const goToPLaylist=(PlaylistId)=>{
    navigate(`/playlist/${PlaylistId}`);
    dispatch({ type: reducerCases.SET_PLAYLIST_ID,  PlaylistId });
  }

  const goToArtist=(artistId)=>{
    navigate(`/artist/${artistId}`);
  }

  return (
    <div className="label">
      {playlists&&(playlists.slice(0, Math.min(playlists.length, 3)).map(p => (
        <Songlabel key={p.id} id={p.id} artist={p} onClick = {()=>goToPLaylist(p.id)}/>
      )))}
      {topItems&&(topItems.slice(0, playlists.length <= 3 ? 8 - playlists.length : 5).map(artist => (
        <Songlabel key={artist.id} id={artist.id} artist={artist} onClick = {()=>goToArtist(artist.id)}/>
      )))}
    </div>
  );
}
