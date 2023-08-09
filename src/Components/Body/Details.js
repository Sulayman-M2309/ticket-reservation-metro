import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Table, Alert } from 'reactstrap'

export default function Details() {

  const [discountedPrice, setDiscountedPrice] = useState(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'payment') === null ? '0' : JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'payment')).discountedPayment)

  useEffect(() => {

    if (!classInfo || !travelInfo) {
      setDiscountedPrice(0)
      if (paymentInfo) {
        localStorage.setItem(process.env.REACT_APP_LOCAL_STORAGE + 'payment', JSON.stringify({
          ...paymentInfo,
          discountedPayment: discountedPrice
        }))
      }
      else {
        localStorage.setItem(process.env.REACT_APP_LOCAL_STORAGE + 'payment', JSON.stringify({
          discountedPayment: discountedPrice
        }))
      }

    }
    else {

      if (!paymentInfo) {
        setDiscountedPrice(0)
        localStorage.setItem(process.env.REACT_APP_LOCAL_STORAGE + 'payment', JSON.stringify({
          discountedPayment: discountedPrice
        }))
      }
      else {
        setDiscountedPrice(applyDiscount(isNaN(Math.ceil(classInfo.fare * parseFloat(travelInfo.distance).toFixed(2) * classInfo.passengerNumber)) ? '0' : Math.ceil(classInfo.fare * parseFloat(travelInfo.distance).toFixed(2) * classInfo.passengerNumber), paymentInfo.passengerType.discount))

        localStorage.setItem(process.env.REACT_APP_LOCAL_STORAGE + 'payment', JSON.stringify({
          ...paymentInfo,
          discountedPayment: discountedPrice
        }))


      }
    }

  }, [])


  let travelInfo = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'travel_details') === null ? false : JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'travel_details'))

  let passengerInfo = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'pi') === null ? false : JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'pi'))

  let classInfo = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'class') === null ? false : JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'class'))

  let paymentInfo = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'payment') === null ? false : JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'payment'))

  let userInfo = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'user') === null ? false : JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'user'))


  const applyDiscount = (mainPrice, discountPercentage) => {
    const discountAmount = (mainPrice * discountPercentage) / 100;
    const discountedPrice = mainPrice - discountAmount;
    return discountedPrice;
  }


  return (
    <div className='py-4'>

      <h3 className='text-center mb-3'>CHECK OUT</h3>
      <h6 className='text-center mb-4 fst-italic fw-bold text-primary'>Online Ticket Reservation System</h6>

      {
        isNaN(Math.ceil(classInfo.fare * parseFloat(travelInfo.distance).toFixed(2) * classInfo.passengerNumber)) || !paymentInfo || !passengerInfo || travelInfo.distance === 0 ? <Alert color='danger'><strong> <FontAwesomeIcon icon={faCircleExclamation} /> {travelInfo.distance === 0 ? 'Boarding point and destination point must be different' : 'You have skipped or unsaved mandatory field'}</strong></Alert> : ''
      }

      <div className='border rounded shadow mb-4'>
        <div style={{ backgroundColor: '#c6e9d2' }} className='p-2 h5'>DEPARTURE</div>

        <div className='px-2'>


          <h5 className='my-4'>{!travelInfo ? '' : travelInfo.boardingPoint} - {!travelInfo ? '' : travelInfo.destinationPoint}</h5>

          <Table className='border' hover borderless>
            <tbody>

              <tr>
                <td><span className='fw-bold'>Coach Type:</span></td>
                <td>{!classInfo ? '' : classInfo.name}</td>
              </tr>
              <tr>
                <td><span className='fw-bold'>Journey Date:</span></td>
                <td>{!travelInfo ? '' : travelInfo.date}</td>
              </tr>



            </tbody>
          </Table>
        </div>
      </div>


      <div className='border rounded shadow mb-4'>
        <div style={{ backgroundColor: '#84E497' }} className='p-2 h5'>PASSENGER</div>

        <div className='px-2'>

          <Table className='border rounded' hover borderless>
            <tbody>
              <tr>
                <td><span className='fw-bold'>Issued By:</span></td>
                <td>{!userInfo ? '' : userInfo.name}</td>
              </tr>
              <tr>
                <td><span className='fw-bold'>Email:</span></td>
                <td>{!userInfo ? '' : userInfo.email}</td>
              </tr>
              <tr>
                <td><span className='fw-bold'>NID:</span></td>
                <td>{!passengerInfo ? '' : passengerInfo.nid}</td>
              </tr>

              <tr>
                <td><span className='fw-bold'>Mobile:</span></td>
                <td>+88 {!userInfo ? '' : userInfo.mobile}</td>
              </tr>

              <tr>
                <td><span className='fw-bold'>Gender:</span></td>
                <td>{!passengerInfo ? '' : String(passengerInfo.gender).slice(0, 1).toUpperCase() + String(passengerInfo.gender).slice(1,)}</td>
              </tr>
              <tr>
                <td><span className='fw-bold'>Age:</span></td>
                <td>{!passengerInfo ? '' : passengerInfo.age}</td>
              </tr>
              <tr>
                <td><span className='fw-bold'>Address:</span></td>
                <td>{!passengerInfo ? '' : passengerInfo.address}</td>
              </tr>



            </tbody>
          </Table>
        </div>
      </div>


      <div className='border rounded shadow mb-4'>
        <div style={{ backgroundColor: 'RGB(189 234 233)' }} className='p-2 h5'>PAYMENT</div>

        <div className='px-2'>

          <Table className='border rounded' hover borderless>
            <tbody>
              <tr>
                <td><span className='fw-bold'>Class Fare <span className='small'>(per km)</span>:</span></td>
                <td>{!classInfo ? '' : classInfo.fare} Taka</td>
              </tr>
              <tr>
                <td><span className='fw-bold'>Distance:</span></td>
                <td>{!travelInfo ? '' : parseFloat(travelInfo.distance).toFixed(2)} Km</td>
              </tr>
              <tr className=''>
                <td><span className='fw-bold'>Total Passenger:</span></td>
                <td>{!classInfo ? '' : classInfo.passengerNumber}</td>
              </tr>

              <tr className=''>
                <td className=''><span className='fw-bold'>Total:</span></td>
                <td>{Math.ceil(classInfo.fare * parseFloat(travelInfo.distance).toFixed(2) * classInfo.passengerNumber)} Taka</td>
              </tr>

              <tr className=''>
                <td className=''><span className='fw-bold'>Discount:</span></td>
                <td>{!paymentInfo ? '' : paymentInfo.passengerType.discount} %</td>
              </tr>

              <tr className=''>
                <td className=''><span className='fw-bold'>Payable Amount:</span></td>
                <td>{discountedPrice} Taka</td>
              </tr>

            </tbody>
          </Table>
        </div>
      </div>




    </div>
  )
}
