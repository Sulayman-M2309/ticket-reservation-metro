import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Table } from 'reactstrap'
import { Alert } from '@mui/material';

export default function Payment() {

  const [savingMessage, setSavingMessage] = useState(true)

  let passengerType = [
    { type: 'General', discount: 0 },
    { type: 'Student', discount: 50 },
    { type: 'Police', discount: 30 },
    { type: 'Freedom Fighter', discount: 50 },
    { type: 'Special', discount: 30 },
  ]


  let travelInfo = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'travel_details') === null ? false : JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'travel_details'))

  let classInfo = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'class') === null ? false : JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'class'))

  const applyDiscount = (mainPrice, discountPercentage) => {
    const discountAmount = (mainPrice * discountPercentage) / 100;
    const discountedPrice = mainPrice - discountAmount;
    return discountedPrice;
  }



  const savingMessageFun = () => {
    setSavingMessage(false)
  }

  return (
    <div className="px-2">
      <Formik

        initialValues={{
          passengerIndex: localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'payment') === null ? '' : JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'payment')).passengerIndex,

          amount: ''


        }}

        validateOnChange={(val) => {
          console.log(val)
        }}

        onSubmit={val => {

          localStorage.setItem(process.env.REACT_APP_LOCAL_STORAGE + 'payment', JSON.stringify({
            passengerIndex: val.passengerIndex,
            passengerType: passengerType[val.passengerIndex],
            discountedPayment: applyDiscount(isNaN(Math.ceil(classInfo.fare * parseFloat(travelInfo.distance).toFixed(2) * classInfo.passengerNumber)) ? '0' : Math.ceil(classInfo.fare * parseFloat(travelInfo.distance).toFixed(2) * classInfo.passengerNumber), passengerType[val.passengerIndex].discount)
          }))


        }}

      >


        {({ values, handleChange, handleSubmit }) => (
          <div>

            <form className='form-control shadow py-4' onSubmit={handleSubmit} action="">

              <h3 className='text-center mb-3'>PAYMENT INFO</h3>

              <div className='mt-4'>
                <label htmlFor="passengerIndex">Passenger Type:</label> <br />
                <select required className='form-control' value={values.passengerIndex} onChange={handleChange} name="passengerIndex" id="passengerIndex">
                  <option value="">Select</option>
                  {
                    passengerType.map((item, index) => {
                      return <option value={index}>{item.type}</option>
                    })
                  }
                </select>
              </div>
              <h4 className='text-center mt-5'>Overview</h4>
              <div className='mt-4 border border-3 p-3 rounded'>

                <Table hover>
                  <tbody>
                    <tr>
                      <td><span className='fw-bold'>Boarding Point:</span></td>
                      <td>{!travelInfo ? '' : travelInfo.boardingPoint} </td>
                    </tr>
                    <tr>
                      <td><span className='fw-bold'>Destination Point:</span></td>
                      <td>{!travelInfo ? '' : travelInfo.destinationPoint}</td>
                    </tr>
                    <tr>
                      <td><span className='fw-bold'>Class Fare (per km):</span></td>
                      <td>{!classInfo ? '' : classInfo.fare}</td>
                    </tr>
                    <tr>
                      <td><span className='fw-bold'>Distance:</span></td>
                      <td>{!travelInfo ? '' : parseFloat(travelInfo.distance).toFixed(2)} Km </td>
                    </tr>

                    <tr>
                      <td><span className='fw-bold'>Total Passenger:</span></td>
                      <td>{!classInfo ? '' : classInfo.passengerNumber} </td>
                    </tr>

                    <tr>
                      <td><span className='fw-bold'>Payable Amount:</span></td>
                      <td>{isNaN(Math.ceil(classInfo.fare * parseFloat(travelInfo.distance).toFixed(2) * classInfo.passengerNumber)) ? '0' : Math.ceil(classInfo.fare * parseFloat(travelInfo.distance).toFixed(2) * classInfo.passengerNumber)} Taka</td>
                    </tr>

                  </tbody>
                </Table>
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
