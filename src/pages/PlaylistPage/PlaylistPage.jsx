import React, { useEffect } from 'react';
import "./PlaylistPage.css";
import { useStateProvider } from '../../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../../utils/Constants';
import { useParams } from 'react-router-dom';

export default function PlaylistPage() {
    const { playlistId, artistId, albumId } = useParams();
    const [{ token, selectedPlaylist }, dispatch] = useStateProvider();
    useEffect(() => {
        const getInitialPlaylist = async () => {
            try {
                const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
                    headers: {
                        authorization: "Bearer " + token,
                        "Content-Type": "application/json"
                    }
                });
                const selectedPlaylist = {
                    id: response.data.id,
                    name: response.data.name,
                    description: response.data.description.startsWith("<a") ? "" : response.data.description,
                    image: response.data.images[0].url,
                    owner: response.data.owner.display_name,
                    tracks: response.data.tracks.items.map(({ track }) => ({
                        id: track.id,
                        name: track.name,
                        artists: track.artists.map(artist => artist.name).join(", "),
                        image: track.album.images[2].url,
                        duration: track.duration_ms,
                        album: track.album.name,
                        context_uri: track.album.uri,
                        track_number: track.track_number
                    }))
                };
                selectedPlaylist.type = "PLAYLIST";
                dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
            } catch (error) {
                console.error("Error fetching playlist:", error);
            }
        };

        if (playlistId) {
            dispatch({ type: reducerCases.SET_PLAYLIST_ID, payload: playlistId });
            getInitialPlaylist();
        }
    }, [token, dispatch, playlistId]);

    useEffect(() => {
        const getInitialArtist = async () => {
            try {
                const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`, {
                    headers: {
                        authorization: "Bearer " + token,
                        "Content-Type": "application/json"
                    }
                });

                const response1 = await axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
                    headers: {
                        authorization: "Bearer " + token,
                        "Content-Type": "application/json"
                    }
                });

                const selectedPlaylist = {
                    id: response1.data.id,
                    name: response1.data.name,
                    description: response1.data.followers.total + " Followers",
                    image: response1.data.images[0].url,
                    owner: response1.data.type,
                    tracks: response.data.tracks.map((track) => ({
                        id: track.id,
                        name: track.name,
                        artists: track.artists.map(artist => artist.name).join(", "),
                        image: track.album.images[2].url,
                        duration: track.duration_ms,
                        album: track.album.name,
                        context_uri: track.album.uri,
                        track_number: track.track_number
                    }))
                };
                selectedPlaylist.type = "ARTIST";
                dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
            } catch (error) {
                console.error("Error fetching artist:", error);
            }
        };

        if (artistId) {
            getInitialArtist();
        }
    }, [token, dispatch, artistId]);

    useEffect(() => {
        const getInitialAlbum = async () => {
            try {
                const response = await axios.get(`https://api.spotify.com/v1/albums/${albumId}`, {
                    headers: {
                        authorization: "Bearer " + token,
                        "Content-Type": "application/json"
                    }
                });


                const selectedPlaylist = {
                    id: response.data.id,
                    name: response.data.name,
                    description: response.data.album_type,
                    image: response.data.images[0].url,
                    owner: response.data.artists[0].name,
                    tracks: response.data.tracks.items.map((track) => ({
                        id: track.id,
                        name: track.name,
                        artists: track.artists.map(artist => artist.name).join(", "),
                        image: response.data.images[2].url,
                        duration: track.duration_ms,
                        album: response.data.name,
                        context_uri: track.uri,
                        track_number: track.track_number
                    }))
                };
                selectedPlaylist.type = "ALBUM";
                dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
            } catch (error) {
                console.error("Error fetching album:", error);
            }
        };

        if (albumId) {
            getInitialAlbum();
        }
    }, [token, dispatch, albumId]);

    const msToMinutesAndSeconds = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    console.log(selectedPlaylist);

    const playTrack = async (id, name, artists, image, context_uri, track_number) => {
        try {
            const response = await axios.put(`https://api.spotify.com/v1/me/player/play`, {
                context_uri,
                offset: {
                    position: track_number - 1
                },
                position_ms: 0,
            }, {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 204) {
                const currentTrack = {
                    id,
                    name,
                    artists,
                    image,
                };
                dispatch({ type: reducerCases.SET_CURRENTTRACK, payload: currentTrack });
                dispatch({ type: reducerCases.SET_PLAYER_STATE, payload: true });
            } else {
                dispatch({ type: reducerCases.SET_PLAYER_STATE, payload: false });
            }
        } catch (err) {
            alert("Works with premium only");
            console.log(err);
        }
    };

    return (
        <>
            {selectedPlaylist && (
                <div className="playlistPageContainer">
                    <div className="playlistPage">
                        <div className="image2">
                            <img src={selectedPlaylist.image} alt="" />
                        </div>
                        <div className="details">
                            <span className="type">{selectedPlaylist.type}</span>
                            <h1 className="title2">{selectedPlaylist.name}</h1>
                            <p className="description">{selectedPlaylist.description}</p>
                            <p className="ownerName">{selectedPlaylist.owner}, {selectedPlaylist.tracks.length} songs</p>
                        </div>
                    </div>
                    <div className="list">
                        <div className="header_row">
                            <div className="col">
                                <span>#</span>
                            </div>
                            <div className="col">
                                <span>TITLE</span>
                            </div>
                            <div className="col">
                                <span>ALBUM</span>
                            </div>
                            <div className="col">
                                <span>DURATION</span>
                            </div>
                        </div>
                    </div>
                    <div className="tracks">
                        {selectedPlaylist.tracks.map(({ id, name, artists, image, duration, album, context_uri, track_number }, index) => (
                            <div className="row" key={id} onClick={() => playTrack(id, name, artists, image, context_uri, track_number)}>
                                <div className="col">
                                    <span>{index + 1}</span>
                                </div>
                                <div className="col detail">
                                    <div className="image2">
                                        <img src={image} alt="" />
                                    </div>
                                    <div className="info">
                                        <span className="name">{name}</span>
                                        <span>{artists}</span>
                                    </div>
                                </div>
                                <div className="col">
                                    <span>{album}</span>
                                </div>
                                <div className="col">
                                    <span>{msToMinutesAndSeconds(duration)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
