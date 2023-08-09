import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { checkUserAuth, createUser } from '../../Function/UserFunction'
import { Link } from 'react-router-dom'
import { storeLocalStorage } from '../../Function/StorageFunction'
import MySpinner from '../MySpinner'


export default function Signin() {

  const [message, setMessage] = useState('')
  const [spinner, setSpinner] = useState(false)


  return (
    <div>
      <Formik

        initialValues={{
          password: '',
          email: '',
        }}

        onSubmit={val => {
          setSpinner(true)
          checkUserAuth(val, 'signin').then(data => {
            setMessage(data.message)
            setSpinner(false)
            if (data.auth) {
              storeLocalStorage(data.data)
              window.location.replace('/')
            }

          })
        }}

      >

        {({ handleChange, handleSubmit, values }) => (

          <div className='w-75 m-auto p-3 my-5'>
            <form className='form-control shadow-sm' onSubmit={handleSubmit} action="">

              <h4 className='my-3 text-center'>Please register first to reserve ticket</h4>

              <div className='mt-3'>
                <label htmlFor="email">Email</label> <br />
                <input className='form-control' value={values.email} onChange={handleChange} name='email' type="text" id='email' />
              </div>

              <div className='mt-3'>
                <label htmlFor="password">Password</label> <br />
                <input className='form-control' value={values.password} onChange={handleChange} name='password' type="text" id='password' />
              </div>

              <div className='py-2'>
                Not have account?<Link to={'/signup'}> Register now</Link>
              </div>

              <button className='mt-3 btn btn-success' type="submit">Submit</button>

              <div className='text-center text-danger py-2'>{message}</div>
            </form>
          </div>

        )}

      </Formik>

      {spinner ? <MySpinner /> : ''}
    </div>
  )
}
