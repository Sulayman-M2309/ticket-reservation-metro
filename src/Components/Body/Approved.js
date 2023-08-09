import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table } from 'reactstrap'
import ApprovedModal from './ApprovedModal'
import MySpinner from './MySpinner'


export default function Approved() {

  const [approvedList, setApprovedList] = useState([])
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [spinner, setSpinner] = useState(false)



  useEffect(() => {

    setSpinner(true)

    let arr = []
    axios.get(process.env.REACT_APP_DATABASE_API + 'ApprovedTicket.json').then(data => {
      for (let i in data.data) {
        arr.push({
          ...data.data[i],
          id: i
        })
      }

      setApprovedList(arr)
      setSpinner(false)

    })

  }, [open])


  const toggle = (e, item) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setSelected(item)
    setOpen(!open)
  }


  let allPending
  if (approvedList.length === 0) {
    allPending = <p className='my-5 text-center'>No Approved yet</p>
  }



  else {
    allPending = approvedList.map((item, index) => {
      return (
        <tr>
          <td>{item.userInfo.name}</td>
          <td>{item.userInfo.mobile}</td>
          <td>{item.travelInfo.boardingPoint}</td>
          <td>{item.travelInfo.destinationPoint}</td>
          <td>{item.travelInfo.date}</td>
          <td>{item.classInfo.passengerNumber}</td>
          <td>{item.paymentInfo.passengerType.type}</td>
          <td>{item.paymentInfo.discountedPayment}/=</td>
          <td><button onClick={(e) => toggle(e, item)} className='btn btn-success'>View</button></td>
        </tr>
      )
    })
  }



  return (
    <div>
      <h3 className='text-center my-3'>Approved List</h3>
      <div className='my-5 '>
        <Table hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Boarding</th>
              <th>Departure</th>
              <th>Date</th>
              <th>Person</th>
              <th>Category</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allPending}
          </tbody>
        </Table>
      </div>


      <ApprovedModal open={open} selected={selected} toggle={toggle} />

      {spinner ? <MySpinner /> : ''}

    </div>
  )
}
