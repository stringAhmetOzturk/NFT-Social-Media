

import "./leftbar.css"
import axios from 'axios';
import dotenv from "dotenv";
import { useState,useEffect } from 'react';
import Coin from '../../components/coin/Coin';

function LeftBar() {
  const [coins,setCoins] = useState([])
  const [search,setSearch] = useState('')

  dotenv.config();

  useEffect(()=>{
    axios.get(process.env.COIN_API,)
    .then(res =>{
      setCoins(res.data)
    }).catch(err =>{
      console.log(err.message)
    })
  },[])

  const handleChange = e =>{
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase()) || coin.symbol.toLowerCase().includes(search.toLowerCase())
    )

  return (
   
    <div className="sidebar">
       <div style={{ padding:"10px"}}>
      <div className='coin-search'>
        <h1 className='coin-text'>Search a currency</h1>
      
        <form>
        <input class="form-control me-2 w-75 coin-input" type="text" placeholder="Search" onChange={handleChange}></input>
        </form>
      </div>
      
      {filteredCoins.map(coin =>{
        return (<Coin key={coin.id} image={coin.image} name={coin.name} symbol={coin.symbol} price={coin.current_price}/>)
      })}
      </div>
    </div>
  );
}

export default LeftBar;