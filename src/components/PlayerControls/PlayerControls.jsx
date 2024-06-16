import React from 'react'
import "./PlayerControls.css"
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import PauseCircleFilledRoundedIcon from '@mui/icons-material/PauseCircleFilledRounded';
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import RepeatRoundedIcon from '@mui/icons-material/RepeatRounded';
import { useStateProvider } from '../../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../../utils/Constants';
export default function PlayerControls() {
    const [{token, playerState},dispatch] = useStateProvider();


    const changeTrack = async(type) =>{
        try{await axios.post(`https://api.spotify.com/v1/me/player/${type}`,{}, {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
        });

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
        else
            dispatch({ type: reducerCases.SET_CURRENTTRACK, currentTrack:null });}
        catch(err){
            alert("Only works with spotify premium accounts")
        }

    }


    const changeState = async ()=>{
        try{const state = playerState ? "pause":"play";
        const response = await axios.put(`https://api.spotify.com/v1/me/player/${state}`,{}, {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
        });

            dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState:!playerState });
        }
        catch(err){
            alert("Works only with a premium account")
            console.log(err);
        }
    }
        
    



  return (
    <div className="player">
      <div className="shuffle">
            <ShuffleRoundedIcon className="svg"/>
      </div>
      <div className="previous">
            <SkipPreviousRoundedIcon className="svg" onClick={()=>changeTrack("previous")}/>
      </div>
      <div className="state">
        {playerState? <PauseCircleFilledRoundedIcon className="svg" onClick={changeState}/>:<PlayCircleFilledRoundedIcon className="svg" onClick={changeState}/>}
      </div>
      <div className="next">
        <SkipNextRoundedIcon className="svg" onClick={()=> changeTrack("next")}/>
      </div>
      <div className="repeat">
        <RepeatRoundedIcon className="svg"/>
      </div>
    </div>
  )
}
