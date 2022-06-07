import "./post.css";
import { MoreVert } from "@mui/icons-material";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {format} from 'timeago.js'


export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
 
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  const [commentIsClicked, setCityIsClicked] = useState(false);

  const addComment = () =>{
    setCityIsClicked(!commentIsClicked)
    commentIsClicked ? document.getElementById("commentForm").style.display = "block" : document.getElementById("commentForm").style.display = "none"
  }

  const comment = useRef();
  const submitComment =async () =>{

    try {
      axios.put("/posts/" + post._id +"/comment", {username: currentUser.username,comment: comment.current.value });
      // dispatch({ type: "CITY", payload: currentUser.city });
    } catch (err) {}
  }




  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const deleteHandler = () => {
    try {
      axios.delete(`/posts/${post._id}`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
        data: {
          userId: currentUser._id
        }});
        window.location.reload();
      //  axios.delete(`/posts/${post._id}`,);
    } catch (error) {
      console.log(error)
    }
   
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">

                    <div class="dropdown">
                    <MoreVert />
                    {user.username === currentUser.username && (<button className='dropdown-content btn btn-outline-danger' onClick={deleteHandler}>Delete</button>)}
            
          
          </div>

          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom" style={{display:"flex",flexDirection:"column"}}>
          <div className="postBottomLeft" style={{justifyContent:"space-between",width:"100%"}}>
            <div>
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
         
            <span className="postLikeCounter" >{like} people like it</span>
            </div>
            <span className="postCommentText" onClick={addComment}>{post.comment.length} comments</span>
          </div>
         
          <div className="postBottomRight" style={{width:"100%",marginTop:"10px"}}>
          
                {commentIsClicked && (<div style={{width:"100%",marginBottom:"10px",display:"flex",flexDirection:"column"}}>{post.comment.map((com)=>{
                  return <div style={{display:"flex"}}><Link style={{textDecoration:"none"}} to={`/profile/${com[1]}`}><b>{com[1]}</b></Link>&nbsp; adlı kullanıcı &nbsp; <b>{com[0]}</b> &nbsp;dedi.</div>
                })}
              
                
                </div>)}
           <form class="d-flex  w-100" id="commentForm"  onSubmit={submitComment}>
          <div style={{display:"flex",flexDirection:"row",width:"100%"}}>
          
            <input class="form-control me-2 w-100 " type="text"
              required 
              ref={comment} placeholder="Add comment"/> 
            <button className="btn btn-outline-success" type="submit">Paylaş</button>
          </div>
          
            
            </form> 
          </div>
             
        </div>
      </div>
    </div>
  );
}
