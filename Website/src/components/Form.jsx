import React, { useState } from 'react'

const Form = () => {
  const [status, setStatus] = useState('SUBMIT')

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('Sending...')
    const { mail } = e.target.elements
    let details = {
      email: mail.value
    }
    let response = await fetch('https://www.yourwebsite.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(details)
    })

    setStatus('SUBMIT')
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          className='submitForm'
          type='email'
          placeholder='Enter email address'
          id='email'
          name='mail'
          required
				/>
        <button type='submit' className='formSubmit'>
          {status}
        </button>
      </div>
    </form>
  )
}

export default Form
