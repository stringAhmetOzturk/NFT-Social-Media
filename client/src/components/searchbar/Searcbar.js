import React, { useState } from "react";
import "../navbar/navbar.css"
import { Link } from 'react-router-dom'

function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.username.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  return (
    <div className="w-100 ">
      
        <input
        className="form-control me-3 w-100"
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        
 
      {filteredData.length !== 0 && (
        <div className="dataResult" >
          {filteredData.slice(0, 15).map((value, key) => {
                       return (
          <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"flex-start",marginTop:"5px"}}>
              <Link
                        to={"/profile/" + value.username}
                        style={{ textDecoration: "none" }}
                      >
              <div >
                      <img style={{width:"70px",height:"70px",borderRadius:"50px",marginRight:"10px"}}
                             src={
                               value.profilePicture
                                ? PF + value.profilePicture
                                : PF + "person/noAvatar.png"
                            }
                            alt=""
                        
                          />
                          <span className="rightbarFollowingName">{value.username}</span>
                    </div>
              </Link>
                    <div style={{display:"flex",flexDirection:"row",marginLeft:"30px"}}>
                          <span style={{display:"flex",marginRight:"10px",color:"green"}}>{value.followers.length} Takipçi</span>
                          <span style={{display:"flex",marginRight:"10px",color:"red"}}>{value.followings.length} Takip</span>
                    </div>
                    
                   
                  
          </div>    
             
            );
          })}
         
        </div>
      )}
    </div>
  );
}

export default SearchBar;