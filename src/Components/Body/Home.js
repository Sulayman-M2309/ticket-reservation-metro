import React from 'react'
import './BodyStyles/Home.css'
import Typewriter from 'typewriter-effect';

export default function Home() {
  return (
    <div className='HomeTotal'>

      <div className='typeWriter'>
        <h2 className='text-danger fw-bold'>
          <Typewriter
            options={{
              strings: ['ONLINE TICKET RESERVATION SYSTEM'],
              autoStart: true,
              loop: true,
            }}
          />
        </h2>

        <h4 className='text-success'>
          <Typewriter
            options={{
              strings: ['Bangladesh Metro Rail'],
              autoStart: true,
              loop: true,
            }}
          />
        </h4>

        <div className='text-white mt-3 text-uppercase'>
          <h6 className=''>Welcome to Bangladesh</h6>
          <h6>Metro-Rail online ticket reservation system</h6>
        </div>


      </div>

    </div>
  )
}

