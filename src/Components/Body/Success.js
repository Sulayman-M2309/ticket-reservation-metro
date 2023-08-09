import React from 'react'
import { Link } from 'react-router-dom'
import './BodyStyles/Success.css'

export default function Success() {
    return (
        <div className='text-center success'>
            <img className='img-fluid mt-4' src="https://cdni.iconscout.com/illustration/premium/thumb/successfully-completed-3833924-3241772.png" alt="" />

            <h4 className='mt-4 my-5'>Reservation process Successful. Please wait for approval. Go to <Link to={'/profile'}>Profile</Link></h4>
        </div>
    )
}
