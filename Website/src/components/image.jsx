import React from 'react'
import image from '../images/feature.jpg'

function Image () {
  return (
    <div className='image'>
      <img src={image} alt='description' className='responsive' />
    </div>
  )
}

export default Image
