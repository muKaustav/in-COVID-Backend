import React from 'react'
import image from '../images/logowtext.png'

function Header () {
  return (
    <header>
      <a href='https://www.yourwebsite.com/'>
        <img src={image} alt='description' className='responsive2' />
      </a>
    </header>
  )
}

export default Header
