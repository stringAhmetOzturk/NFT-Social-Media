import React from 'react'
import './coin.css'

const Coin = ({image,name,symbol,price}) => {
  return (
    <div className='coin-container'>
    <div className='coin-row'>
        <div className='coin'>
            <img src={image} alt='crypto'/>
            <h1>{name}</h1>
            <p className='coin-symbol'><b>{symbol.toUpperCase()}</b></p>
        </div>
        <div className='coin-data'>
            <p className='coin-price'>{price<1 ? (price.toFixed(3)):price} $</p>
        </div>
    </div>
    </div>
  )
}

export default Coin