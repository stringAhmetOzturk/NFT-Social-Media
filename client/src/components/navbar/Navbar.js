import React, { useContext, useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { Link } from "react-router-dom"
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import './navbar.css'
import { AuthContext } from '../../context/AuthContext'
import { logoutCall } from '../../apiCalls';
import axios from 'axios';
import SearchBar from '../searchbar/Searcbar';



export default function Navbar() {
  const [searchUser, setSearchUser] = useState([]);
  const {user,dispatch} = useContext(AuthContext)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const logout = () => {
    logoutCall(dispatch)
    
  };


  

useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axios.get("/users/all");
      setSearchUser(res.data)
    } catch (error) {
      console.log(error)
    }
  };
  fetchUser();
}, []);



  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light topbarContainer">
  <div class="container-fluid justify-content-end">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
     <Link to="/" style={{textDecoration:"none"}}>
     <span class="navbar-brand font-weight-bold">NFTer</span>
     </Link>



      <form class="d-flex align-items-center w-50" style={{marginLeft:"17%"}} >
      <SearchBar placeholder="Search friends.." data={searchUser} />
        <SearchIcon />
       {/* <Link  to={`/search/${search}`} class="nav-link active" aria-current="page"> <button class="btn btn-outline-success" type="submit">Search</button></Link> */}
        
      </form>




        <ul class="navbar-nav ms-auto ">
          <li class="nav-item">
          <Link to="/" class="nav-link active" aria-current="page">Anasayfa</Link>  
          </li>
          <li class="nav-item">
          <Link to={`/profile/${user.username}`} class="nav-link" href="#">{user.username} </Link>
          </li>
          <li class="nav-item">
          <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
          </li>
          <li class="nav-item">
            <Link to={`/profile/${user.username}`} class="nav-link" href="#"><AccountBalanceWalletIcon/></Link>
          </li>
          <li class="nav-item">
          <button class="nav-link" onClick={logout} style={{border:"none"}}><LogoutOutlinedIcon/></button>
          </li>
      
      </ul>
    </div>
  </div>
</nav>
  )
}

