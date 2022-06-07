import "./profile.css";
import Sidebar from "../../components/leftbar/LeftBar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/RightBar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext"
import ModeEditIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { Cancel } from "@mui/icons-material";

export default function Profile() {
  const {user} = useContext(AuthContext)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [profileUser, setUser] = useState({});
  const username = useParams().username;
  const [posts, setPosts] = useState(0);
  const [img, setImg] = useState(null);
  const [coverImg, setCoverImg] = useState(null);

  const submitImg = async (e) =>{
    e.preventDefault()
    const newPost = {
      userId: user._id,
    };
   if(img){
    const data = new FormData();
    const imgName = Date.now() + img.name;
    data.append("name", imgName);
    data.append("file", img);
    newPost.profilePicture = imgName;
    try {
      await axios.post("/upload", data);
    } catch (err) {}
  }

  try {
    axios.put("/users/" + user._id , newPost);
       window.location.reload();
       
  } catch (error) {
    console.log(error)
  }}

  const submitCoverImg = async (e) =>{
    e.preventDefault()
    const newPost = {
      userId: user._id,
    };
   if(coverImg){
    const data2 = new FormData();
    const coverImgName = Date.now() + coverImg.name;
    data2.append("name", coverImgName);
    data2.append("file", coverImg);
    newPost.coverPicture = coverImgName;
    try {
      await axios.post("/upload", data2);
    } catch (err) {}
  }

  try {
    axios.put("/users/" + user._id , newPost);
       window.location.reload();
       
  } catch (error) {
    console.log(error)
  }}
  

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts/profile/" + username)
      
      setPosts(res.data.length);
    };
    fetchPosts();
  }, [username]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Navbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
            <div style={{position:"relative"}}>
            {user.username === profileUser.username && (<form onSubmit={submitCoverImg}>
                <label htmlFor="file" className="shareOption1">
                <ModeEditIcon style={{color:"white",position:"absolute" , right:"90px", top:"190px",zIndex:"2",border:"none",borderRadius:"20%",backgroundColor:"green",alignItems:"center",justifyContent:"center"}}/>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setCoverImg(e.target.files[0])}
              />
            </label>
            {coverImg && (
          <div className="shareImgContainer3">
            <img className="shareImg3" src={URL.createObjectURL(coverImg)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setCoverImg(null)} />
            <button className="shareButton" type="submit">
            Düzenle
          </button>
          </div>
        )}
            
              </form>)}
              <img 
                className="profileCoverImg"
                src={
                  profileUser.coverPicture
                    ? PF + profileUser.coverPicture
                    : PF + "person/noCover.png"
                }
                alt=""
              />
            </div>
              <div style={{position:"relative"}}>
              {user.username === profileUser.username && (<form onSubmit={submitImg}>
                <label htmlFor="file2" className="shareOption2">
                <ModeEditIcon style={{color:"white",position:"absolute" , right:"550px", top:"40px",zIndex:"2",border:"none",borderRadius:"20%",backgroundColor:"green",alignItems:"center",justifyContent:"center"}}/>
              
              <input
                style={{ display: "none" }}
                type="file"
                id="file2"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setImg(e.target.files[0])}
              />
            </label>
            {img && (
          <div className="shareImgContainer2">
            <img className="shareImg2" src={URL.createObjectURL(img)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setImg(null)} />
            <button className="shareButton" type="submit">
            Paylaş
          </button>
          </div>
        )}
            
              </form>)}
              <img style={{position:"absolute",top:"-80px",zIndex:1 }}
                className="profileUserImg"
                src={
                  profileUser.profilePicture
                    ? PF + profileUser.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
              </div>
          
             
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{profileUser.username}</h4>
              <span className="profileInfoDesc">{profileUser.desc}</span>
              <div className='followInfo'>
<h4 className='profileFollowers'>{profileUser.followers?.length} Takipçi</h4>
 <h4 className='profileFollowings'>{profileUser.followings?.length} Takip</h4>
     <h4 className='profileFollowings'>{posts} Post</h4>
       </div>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={profileUser} />
          </div>
        </div>
      </div>
    </>
  );
}