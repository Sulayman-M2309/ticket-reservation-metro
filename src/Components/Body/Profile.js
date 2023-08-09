import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table } from 'reactstrap'
import MySpinner from './MySpinner'

export default function Profile() {

  const [pendingList, setPendingList] = useState([])
  const [approvedList, setApprovedList] = useState([])
  const [spinner, setSpinner] = useState(false)


  useEffect(() => {

    setSpinner(true)
    let pendingArr = []
    let approveArr = []

    let userInfo = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'user') === null ? false : JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'user'))

    axios.get(process.env.REACT_APP_DATABASE_API + 'PendingTicket.json').then(data => {



      for (let i in data.data) {
        if (userInfo && userInfo.email === data.data[i].userInfo.email) {
          pendingArr.push(data.data[i])
        }
      }
      setPendingList(pendingArr)
      setSpinner(false)
    })



    setSpinner(true)
    axios.get(process.env.REACT_APP_DATABASE_API + 'ApprovedTicket.json').then(data => {
      for (let i in data.data) {
        if (userInfo && userInfo.email === data.data[i].userInfo.email) {
          approveArr.push(data.data[i])
        }
      }
      setApprovedList(approveArr)
      setSpinner(false)

    })


  }, [])


  // Pending list

  let pendingCard
  if (pendingList.length === 0) { pendingCard = <div className='border rounded shadow mb-4 p-3'>No Pending</div> }
  else {
    pendingCard = pendingList.map((item, index) => {
      return (
        <div className='border rounded shadow mb-4'>
          <div style={{ backgroundColor: '#E39494' }} className='p-2 h5'>PENDING</div>

          <div className='px-2'>

            <h6 className='my-4'>{item.travelInfo.boardingPoint} - {item.travelInfo.destinationPoint}</h6>

            <Table className='border' hover borderless>
              <tbody>
                <tr>
                  <td><span className='fw-bold'>Journey Date:</span></td>
                  <td>{item.travelInfo.date}</td>
                </tr>
                <tr>
                  <td><span className='fw-bold'>Class Type:</span></td>
                  <td>{item.classInfo.name}</td>
                </tr>
                <tr>
                  <td><span className='fw-bold'>Passenger count:</span></td>
                  <td>{item.classInfo.passengerNumber}</td>
                </tr>
                <tr>
                  <td><span className='fw-bold'>Payment:</span></td>
                  <td>{item.paymentInfo.discountedPayment} Taka</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      )
    })
  }


  // Approved
  let approvedCard
  if (approvedList.length === 0) { approvedCard = <div className='border rounded shadow mb-4 p-3'>No approved</div> }
  else {
    approvedCard = approvedList.map((item, index) => {
      return (
        <div className='border rounded shadow mb-4'>
          <div style={{ backgroundColor: '#98E494' }} className='p-2 h5'>APPROVED</div>

          <div className='px-2'>

            <h6 className='my-4'>{item.travelInfo.boardingPoint} - {item.travelInfo.destinationPoint}</h6>

            <Table className='border' hover borderless>
              <tbody>
                <tr>
                  <td><span className='fw-bold'>Journey Date:</span></td>
                  <td>{item.travelInfo.date}</td>
                </tr>
                <tr>
                  <td><span className='fw-bold'>Class Type:</span></td>
                  <td>{item.classInfo.name}</td>
                </tr>
                <tr>
                  <td><span className='fw-bold'>Passenger count:</span></td>
                  <td>{item.classInfo.passengerNumber}</td>
                </tr>
                <tr>
                  <td><span className='fw-bold'>Payment:</span></td>
                  <td>{item.paymentInfo.discountedPayment} Taka</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      )
    })
  }





  return (
    <div className='container my-5'>
      <h5 className='text-center fst-italic fw-bold text-primary'>Online Ticket Reservation System</h5>

      <div className='text-center fst-italic mt-3 mb-5 text-success small'>
        <span className=' '> Issued by:  {localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'user') === null ? '' : JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'user')).name} </span> <br />

        <span className=''>{localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'user') === null ? '' : JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'user')).email} </span>
      </div>

      {pendingCard}

      {approvedCard}

      {spinner ? <MySpinner /> : ''}
    </div>
  )
}
