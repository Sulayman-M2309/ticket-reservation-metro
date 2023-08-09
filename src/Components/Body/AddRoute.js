import axios from 'axios'
import { Formik } from 'formik'
import React, { useState } from 'react'

export default function AddRoute() {


  const [routeId, setRouteId] = useState('')

  return (
    <div>
      <Formik

        initialValues={{
          routeName: '',
          latitude: '',
          longitude: ''
        }}


        onSubmit={val => {
          axios.post(process.env.REACT_APP_DATABASE_API + 'Route.json', val).then(data => {
            setRouteId("Successful. ID - " + data.data.name)
          })
        }}

      >


        {({ values, handleChange, handleSubmit }) => (
          <div className='w-75 m-auto my-5'>
            <form onSubmit={handleSubmit} className='form-control p-4 shadow' action="">
              <div className=''>
                <label htmlFor="routeName">Route Name: </label><br />
                <input className='form-control' type="text" name='routeName' value={values.routeName} onChange={handleChange} id='routeNAme' />
              </div>

              <div className='mt-4'>
                <label htmlFor="latitude">Latitude: </label><br />
                <input className='form-control' type="number" name='latitude' value={values.latitude} onChange={handleChange} id='latitude' />
              </div>

              <div className='mt-4'>
                <label htmlFor="longitude">Longitude: </label><br />
                <input className='form-control' type="number" name='longitude' value={values.longitude} onChange={handleChange} id='longitude' />
              </div>

              <button className='btn btn-success mt-4' type="submit">Add Route</button>

              <div className='text-center text-success'>{routeId}</div>
            </form>
          </div>
        )}
      </Formik>
    </div>
  )
}
