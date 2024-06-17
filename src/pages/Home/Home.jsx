import React from 'react'
import "./Home.css"
import Podcasts from '../Podcasts/Podcasts'
import Music from '../Music/Music'
import Topbar from '../../components/Topbar/Topbar';
import Sidebar from "../../components/Sidebar/Sidebar"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CurrentTrack from '../../components/CurrentTrack/CurrentTrack';
import PlaylistPage from '../PlaylistPage/PlaylistPage';
import Search from '../Search/Search';
export default function Home() {
  return (
    <>

    <Router>
        <div className="pages">
            <Sidebar className="sidebar"/>
            <div className="frontPage">
              
              <Routes className="route">
                <Route path="/" element={<><Topbar className="topbar topbar1"/><div className="homePage"><Music/><Podcasts/></div></>}/>
                <Route path="/api/music" element={<><Topbar className="topbar"/><Music /></>} />
                <Route path="/api/podcasts" element={<><Topbar className="topbar"/><Podcasts /></>} />
                <Route path="/playlist/:playlistId" element ={<PlaylistPage/>}/>
                <Route path="/artist/:artistId" element ={<PlaylistPage/>}/>
                <Route path="/album/:albumId" element = {<PlaylistPage/>}/>
                <Route path="/search" element = {<Search/>}/>
              </Routes>
          </div>
          
        </div>
        <div className="TrackElement">
            <CurrentTrack/>
            
        </div>
        
        
        
      </Router>

      
    </>
    
  )
}

