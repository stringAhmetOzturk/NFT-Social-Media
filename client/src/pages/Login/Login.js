
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import "./login.css"
import {loginCall } from '../../apiCalls'
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from '@mui/material';
export default function Login() {
    const email = useRef();
    const password = useRef();
    const {user,isFetching,dispatch} = useContext(AuthContext)
    const handleClick = (e)=>{
     e.preventDefault()
     loginCall({email:email.current.value,password:password.current.value},dispatch)
    }
    console.log(user)
return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">NFTer</h3>
          <span className="loginDesc">
          Share your nft and follow the NFT world.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
         
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
          
            <button className="loginButton" type="submit">
             {isFetching ? <CircularProgress/> : "Log in" } 
            </button>
            <button className="loginRegisterButton"><Link to='/register' style={{textDecoration:"none",color:"white"}}> Sign up</Link> </button> 
          </form>
          
        </div>
      </div>
    </div>
  );
}
