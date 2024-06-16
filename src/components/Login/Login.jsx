import React from 'react';
import './Login.css';
export default function Login() {
  function handleClick() {
    const clientID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const redirectUrl = process.env.REACT_APP_SPOTIFY_REDIRECT_URL;
    console.log(process.env.REACT_APP_SPOTIFY_CLIENT_ID)
    console.log(process.env.REACT_APP_SPOTIFY_REDIRECT_URL)
    const apiUrl = 'https://accounts.spotify.com/authorize';
    const scope = [
      'user-read-email',
      'user-read-private',
      'user-read-playback-state',
      'user-modify-playback-state',
      'user-read-currently-playing',
      'user-read-playback-position',
      'user-top-read',
      'user-read-recently-played',
      'user-library-modify',
      'user-library-read'
    ];
    
    const encodedScope = encodeURIComponent(scope.join(' '));
    window.location.href = `${apiUrl}?client_id=${encodeURIComponent(clientID)}&redirect_uri=${encodeURIComponent(redirectUrl)}&scope=${encodedScope}&response_type=token&show_dialog=true`;
  }

  return (
    <div className="loginContainer">
      <div className="logo">
        <img src="/assets/logo.png" alt="App logo" />
        <span className="nameOfLogo">usify</span>
      </div>
      <button onClick={handleClick} className="loginButton">Connect Musify</button>
    </div>
  );
}
