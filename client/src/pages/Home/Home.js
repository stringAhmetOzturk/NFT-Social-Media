import React from 'react'
import './home.css'
import Feed from '../../components/feed/Feed'
import LeftBar from '../../components/leftbar/LeftBar'
import RightBar from '../../components/rightbar/RightBar'
import Navbar from '../../components/navbar/Navbar'

function Home() {
  return (
    <div>
      <Navbar/>
        <div className='home-container'>
        <LeftBar/>
        <Feed/>
        <RightBar/>
        </div>
    </div>
  )
}

export default Home;