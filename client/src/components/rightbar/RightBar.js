import "./rightbar.css";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";
import ModeEditIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import dotenv from "dotenv";
export default function Rightbar({ user }) {
  dotenv.config();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const [followers, setFollowers] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [profileUser, setUser] = useState({});
  const username = useParams().username;
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(profileUser._id)
  );



  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  const [cityIsClicked, setCityIsClicked] = useState(false);
  const cityName = useRef();
  const editCity = () =>{
    setCityIsClicked(!cityIsClicked)
    cityIsClicked ? document.getElementById("cityForm").style.display = "block" : document.getElementById("cityForm").style.display = "none"
  }

  const submitCity =async (e) =>{

    try {
      axios.put("/users/" + currentUser._id , {userId: currentUser._id,city: cityName.current.value });
      // dispatch({ type: "CITY", payload: currentUser.city });
    } catch (err) {}
  }



   const [NFTs, setNFTs] = useState([])


  useEffect(() => {
    const optionsNFT = {
      method: 'GET',
      url: 'https://top-nft-collections-and-sales.p.rapidapi.com/collections/30d',
      headers: {
        'X-RapidAPI-Host': 'top-nft-collections-and-sales.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.NFT_COL_RapidAPI_Key
      }
    };
    const getNfts = async () => {
      axios.request(optionsNFT).then(function (response) {
        setNFTs(response.data);
      }).catch(function (error) {
        console.error(error);
      });
    };
    getNfts();
  }, []);


  const [News, setNews] = useState([])



  useEffect(() => {
    const optionsNews = {
      method: 'GET',
      url: 'https://blockchain-news1.p.rapidapi.com/news/NDTV',
      headers: {
        'X-RapidAPI-Host': 'blockchain-news1.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.NEWS_RapidAPI_Key
      }
    };
    const getNews = async () => {
      axios.request(optionsNews).then(function (response) {
        setNews(response.data);
      }).catch(function (error) {
        console.error(error);
      });
    };
    getNews();
  }, []);
  
  


  
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + profileUser._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [profileUser]);

  useEffect(() => {
    const getFollowers = async () => {
      try {
        const followersList = await axios.get("/users/followers/" + profileUser._id);
        setFollowers(followersList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFollowers();
  }, [profileUser]);

  const handleClick = async () => {
    try {
      if (currentUser.followings.includes(profileUser._id)) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!currentUser.followings.includes(profileUser._id));
    } catch (err) {
    }
  };

  const HomeRightbar = () => {
    return (
      <>
      <div style={{fontWeight:"bold"}}>Popular NFTs</div>
      <hr></hr>
      <div className="nfts">
     
      {NFTs.map((nft) => (
            <a
              href={nft.collection_url}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing" style={{flexDirection:"row",justifyContent:"space-between"}}>
                <span className="rightbarFollowingName">{nft.collection_name}</span>
                <span>{nft.floor}</span>
              </div>
            </a>
          ))}
      </div>
       
           <hr></hr>
           <div style={{fontWeight:"bold"}}>Blockchain News</div>
           <div className="news">
           
           {News.map((news) => (
            
            <div style={{borderRadius:"10px",padding:"10px",boxShadow:"1px 2px 1px 1px #888888",marginBottom:"5px"}}>
            <a
              href={news.url}
              style={{ textDecoration: "none"}}
            >
              
              <div className="rightbarFollowing" style={{alignItems:"center" }}>
                <span className="rightbarFollowingName">{news.title}</span>
                <img src={news.img} style={{height:"200px",width:"300px",borderRadius:"10px"}}/>
              </div>
            </a>

            </div>
            
          ))}
           </div>
      
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {profileUser.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {currentUser.followings.includes(profileUser._id) ? "Unfollow" : "Follow"}
            {currentUser.followings.includes(profileUser._id) ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
         
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue" style={{marginRight:"70%"}}>{user.city}</span>
            {currentUser.username === profileUser.username && (<button onClick={editCity} style={{border:"none",borderRadius:"20%",backgroundColor:"green",alignItems:"center",justifyContent:"center"}}><ModeEditIcon style={{color:"white"}}/></button>)}
            {cityIsClicked ? <form class="d-flex align-items-left w-75" id="cityForm" style={{marginTop:"10px",marginLeft:"10px"}} onSubmit={submitCity}>
            <input class="form-control me-2 w-75 " type="text"
              required
              ref={cityName} placeholder="Your city"/> 
            <button className="btn btn-outline-success"  type="submit">Düzenle</button>
            </form> : <div></div>}

        </div>
        <h4 className="rightbarTitle">Takip Ettiklerim</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
        <h4 className="rightbarTitle">Takipçilerim</h4>
        <div className="rightbarFollowings">
          {followers.map((follower) => (
            <Link
              to={"/profile/" + follower.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    follower.profilePicture
                      ? PF + follower.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{follower.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}