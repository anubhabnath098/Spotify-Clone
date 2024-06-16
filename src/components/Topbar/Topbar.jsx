import React from 'react'
import "./Topbar.css"
import Button from '../Buttons/Button'
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
export default function Topbar() {
  return (
    <div className="topbar">
        <div className="topbarWrapper">
            <div className="buttonContainerLeft">
                <div className="backContainer">
                    <div className="back"><ArrowBackIosNewIcon className="icon"/></div>
                    <div className="forward"><ArrowForwardIosIcon className="icon"/></div>
                </div>
                <div className="button">
                    <Button url="/" text="All"/>
                    <Button url="/api/music" text="Music"/>
                    <Button url="/api/podcasts" text="Podcasts"/>
                </div>
                
            </div>
            <div className="buttonContainerRight">
                <Button url="https://www.spotify.com/in-en/premium/" text="Explore Premium"/>
                <Button url="https://www.spotify.com/de-en/download/other/" text="Install App"/>
                <div className="notification"><CircleNotificationsIcon/></div>
                <div className="profile"><img className="profilePicture" src="/assets/profile.png" alt="" /></div>
            </div>
        </div>
        
    </div>
    
  )
}
