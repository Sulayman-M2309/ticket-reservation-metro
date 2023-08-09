import { Formik } from 'formik'
import React, { useState } from 'react'
import { Alert } from '@mui/material';


export default function PassengerInfo() {

  const [savingMessage, setSavingMessage] = useState(true)


  const savingMessageFun = () => {
    setSavingMessage(false)
  }


  return (
    <div className="px-2">
      <Formik

        initialValues={{
          bookedBy: JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'user')).name,
          mobile: JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'user')).mobile,
          email: JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'user')).email,

          address: localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'pi') === null ? '' : JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'pi')).address,

          gender: localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'pi') === null ? '' : JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'pi')).gender,

          age: localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'pi') === null ? '' : JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'pi')).age,

          nid: localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'pi') === null ? '' : JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'pi')).nid

        }}

        onSubmit={val => {

          localStorage.setItem(process.env.REACT_APP_LOCAL_STORAGE + 'pi', JSON.stringify(val))

        }}

      >


        {({ values, handleChange, handleSubmit }) => (
          <div>

            <form className='form-control bg-light shadow py-4' onSubmit={handleSubmit} action="">

              <h3 className='text-center mb-3'>PASSENGER INFO</h3>

              <div className="row">
                <div className="col-md-6">
                  <div className='mt-4'>
                    <label htmlFor="bookedBy">Booked By: </label> <br />
                    <input className='form-control' type="text" name='bookedBy' id='bookedBy' onChange={handleChange} value={JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'user')).name} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className='mt-4'>
                    <label htmlFor="email">Email: </label> <br />
                    <input className='form-control' type="text" name='email' id='email' onChange={handleChange} value={JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'user')).email} />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className='mt-4'>
                    <label htmlFor="mobile">Mobile: </label> <br />
                    <input className='form-control' type="text" name='mobile' id='mobile' onChange={handleChange} value={JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'user')).mobile} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className='mt-4'>
                    <label htmlFor="gender">Gender: </label> <br />
                    <select className='form-control' onChange={handleChange} value={values.gender} name='gender' id='gender'>
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="others">Others</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className='mt-4'>
                    <label htmlFor="age">Age: </label> <br />
                    <input className='form-control' type="number" name='age' id='age' onChange={handleChange} value={values.age} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className='mt-4'>
                    <label htmlFor="nid">NID *: </label> <br />
                    <input required className='form-control' type="text" name='nid' id='nid' onChange={handleChange} value={values.nid} />
                  </div>
                </div>
              </div>

              <div className='mt-4'>
                <label htmlFor="address">Address: </label> <br />
                <textarea className='form-control' type="text" name='address' id='address' onChange={handleChange} value={values.address} />
              </div>



              <button onClick={savingMessageFun} className='btn btn-primary mt-4' type="submit">Save</button>
              {
                savingMessage ? <Alert className='mt-4' severity='warning'>Save before continuing.</Alert> : ''
              }
            </form>

          </div>
        )}


      </Formik>
    </div>
  )
}
