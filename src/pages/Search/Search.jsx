import React, { useEffect, useState } from 'react';
import './Search.css';
import axios from 'axios';
import { useStateProvider } from '../../utils/StateProvider';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

export default function Search() {
    let navigate = useNavigate();
    const [{ token }] = useStateProvider();
    const [input, setInput] = useState('');
    const [searchRes, setSearchRes] = useState(null);

    useEffect(() => {
        const savedSearchTerm = localStorage.getItem('searchTerm');
        if (savedSearchTerm) {
            setInput(savedSearchTerm);
            searchSpotify(savedSearchTerm);
        }
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        setInput(document.querySelector('.inputBar').value)
        const searchTerm = document.querySelector('.inputBar').value;
        setInput(searchTerm);
        localStorage.setItem('searchTerm', searchTerm);
        searchSpotify(searchTerm);
    }

    const gotoPlaylist = (id) => {
        navigate(`/playlist/${id}`);
    };

    const gotoArtist = (id) => {
        navigate(`/artist/${id}`);
    };

    const gotoAlbum = (id) => {
        navigate(`/album/${id}`);
    };

    const searchSpotify = async (searchTerm) => {
        try {
            const response = await axios.get('https://api.spotify.com/v1/search', {
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
                params: {
                    q: searchTerm,
                    type: 'album,artist,playlist,track',
                    limit: 10,
                },
            });

            if (response.data.tracks.items.length * response.data.artists.items.length * response.data.albums.items.length * response.data.playlists.items.length === 0) {
                alert("Oops! Couldn't find anything related!");
                document.querySelector('.inputBar').value = '';
            } else {
                const result = response.data;
                const searchResult = {
                    albums: result.albums.items.map((album) => ({
                        id: album.id,
                        images: album.images[0],
                        name: album.name,
                    })),
                    artists: result.artists.items.map((artist) => ({
                        id: artist.id,
                        name: artist.name,
                        images: artist.images[0],
                    })),
                    playlists: result.playlists.items.map((playlist) => ({
                        id: playlist.id,
                        images: playlist.images[0],
                        name: playlist.name,
                    })),
                    tracks: result.tracks.items.map((track) => ({
                        id: track.id,
                        images: track.album.images[0],
                        name: track.name,
                        album: track.album.name,
                        duration: track.duration,
                    })),
                };
                setSearchRes(searchResult);
            }
        } catch (error) {
            console.error('Error searching Spotify:', error);
        }
    };

    return (
        <div className="searchPage">
            <div className="searchBar">
                <input type="text" value={input} onChange={handleSubmit} className="inputBar" placeholder="Search Artist, Album, Playlist" />
                <button onClick={handleSubmit} className="enterButton">
                    <SearchIcon className="searchIcon" />
                </button>
            </div>

            {searchRes && (
                <>
                    <div className="firstSegment">
                        <div className="searchArtist">
                            <div className="artistImage" onClick={() => gotoArtist(searchRes.artists[0].id)}>
                                <img src={searchRes.artists[0].images.url} alt="" />
                            </div>
                            <span className="artistName">{searchRes.artists[0].name}</span>
                        </div>
                        <div className="searchTracks">
                            {searchRes.tracks.slice(0, 4).map(({ id, images, name, album, duration }) => (
                                <div className="eachTrack" key={id} onClick={() => alert('Not yet supported')}>
                                    <img src={images ? images.url : '/assets/play1.jpg'} alt="" className="trackImg" />
                                    <span className="trackName">{name}</span>
                                    <span className="trackAlbum">from {album}</span>
                                    <span className="trackDuration">{duration}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <h1 className="searchHeading">Suggested Playlists</h1>
                    <div className="searchPlaylist">
                        {searchRes.playlists.slice(0, 5).map(({ id, images, name }) => (
                            <div className="eachPlaylist" key={id} onClick={() => gotoPlaylist(id)}>
                                <img src={images ? images.url : '/assets/play2.jpg'} alt="" className="playlistImg" />
                                <span className="playlistName">{name}</span>
                            </div>
                        ))}
                    </div>
                    <h1 className="searchHeading">Suggested Albums</h1>
                    <div className="searchAlbum">
                        {searchRes.albums.slice(0, 5).map(({ id, images, name }) => (
                            <div className="eachAlbum" key={id} onClick={() => gotoAlbum(id)}>
                                <img src={images ? images.url : '/assets/play4.jpg'} alt="" className="playlistImg" />
                                <span className="playlistName">{name}</span>
                            </div>
                        ))}
                    </div>
                    <h1 className="searchHeading">Suggested Artists</h1>
                    <div className="searchAlbum">
                        {searchRes.artists.slice(1, 6).map(({ id, images, name }) => (
                            <div className="eachAlbum eachArtist" key={id} onClick={() => gotoArtist(id)}>
                                <img src={images ? images.url : '/assets/play3.jpg'} alt="" className="playlistImg" />
                                <span className="playlistName">{name}</span>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
