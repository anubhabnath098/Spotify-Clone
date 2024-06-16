import React, { useEffect } from 'react';
import "./CurrentTrack.css";
import { useStateProvider } from '../../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../../utils/Constants';
import PlayerControls from '../PlayerControls/PlayerControls';
export default function CurrentTrack() {
    const [{ token, currentTrack }, dispatch] = useStateProvider();

    useEffect(() => {
        const getCurrentTrack = async () => {
            try {
                console.log("component ", currentTrack)
                const response = await axios.get("https://api.spotify.com/v1/me/player/currently-playing", {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                });

                if (response.data !== "") {
                    const { item } = response.data;
                    const currentTrack = {
                        id: item.id,
                        images: item.album.images[0].url,
                        name: item.name,
                        artists: item.artists.map(artist => artist.name), // Extract artist names
                        progress: response.data.progress_ms / 1000,
                        duration: item.duration_ms / 1000
                    };
                    console.log(currentTrack);
                    dispatch({ type: reducerCases.SET_CURRENTTRACK, currentTrack });
                }
            } catch (error) {
                console.error("Error fetching Track:", error);
            }
        };

        getCurrentTrack();

        return () => {
            console.log("Track Cleared");
        };
    }, [token, dispatch, currentTrack]);



    return (
        <div>
            {currentTrack && (
                <footer className="playing">
                    <div className="track">
                        <img src={currentTrack.images} alt="" className="trackImg" />
                        <div className="trackInfo">
                            <span className="songName">{currentTrack.name}</span>
                            <div className="artistsContainer">
                                {currentTrack.artists.map((artist, index) => (
                                    <span key={index} className="artistName">{artist+", "}</span>
                                ))}
                            </div>
                        </div>
                        
                    </div>
                    <PlayerControls/>
                    
                </footer>
            )}
        </div>
    );
}
