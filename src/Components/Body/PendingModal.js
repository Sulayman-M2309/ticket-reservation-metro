import axios from 'axios'
import React, { useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap'
import MySpinner from './MySpinner'

export default function PendingModal(props) {

  const [message, setMessage] = useState('')
  const [spinner, setSpinner] = useState(false)


  if (props.selected === null || props.selected === undefined) return


  let travelInfo = props.selected.travelInfo
  let passengerInfo = props.selected.passengerInfo
  let classInfo = props.selected.classInfo
  let paymentInfo = props.selected.paymentInfo
  let userInfo = props.selected.userInfo


  const approve = (item) => {

    setSpinner(true)

    axios.post(process.env.REACT_APP_DATABASE_API + 'ApprovedTicket.json', item).then(data => {
      if (data.status === 200) {
        axios.delete(process.env.REACT_APP_DATABASE_API + 'PendingTicket/' + item.id + '.json').then(data => {
          setMessage('Approved Ticket.')
          setSpinner(false)
        })
      }
      else {
        setMessage('Something went wrong.')
        setSpinner(false)
      }
    })

  }

  return (
    <div>
      <Modal size='xl' isOpen={props.open} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>Details</ModalHeader>

        <ModalBody>
          <h6 className='text-center mb-4 fst-italic fw-bold text-primary'>Online Ticket Reservation System</h6>

          <div className='border rounded shadow mb-4'>
            <div style={{ backgroundColor: '#8499E0' }} className='p-2 h5'>DEPARTURE</div>

            <div className='px-2'>


              <h5 className='my-4'>{travelInfo.boardingPoint} - {travelInfo.destinationPoint}</h5>

              <Table className='border' hover borderless>
                <tbody>

                  <tr>
                    <td><span className='fw-bold'>Coach Type:</span></td>
                    <td>{classInfo.name}</td>
                  </tr>
                  <tr>
                    <td><span className='fw-bold'>Journey Date:</span></td>
                    <td>{travelInfo.date}</td>
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
                    <td>{userInfo.name}</td>
                  </tr>
                  <tr>
                    <td><span className='fw-bold'>Email:</span></td>
                    <td>{userInfo.email}</td>
                  </tr>
                  <tr>
                    <td><span className='fw-bold'>NID:</span></td>
                    <td>{passengerInfo.nid}</td>
                  </tr>

                  <tr>
                    <td><span className='fw-bold'>Mobile:</span></td>
                    <td>+88 {userInfo.mobile}</td>
                  </tr>

                  <tr>
                    <td><span className='fw-bold'>Gender:</span></td>
                    <td>{String(passengerInfo.gender).slice(0, 1).toUpperCase() + String(passengerInfo.gender).slice(1,)}</td>
                  </tr>
                  <tr>
                    <td><span className='fw-bold'>Age:</span></td>
                    <td>{passengerInfo.age}</td>
                  </tr>
                  <tr>
                    <td><span className='fw-bold'>Address:</span></td>
                    <td>{passengerInfo.address}</td>
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
                    <td>{classInfo.fare} Taka</td>
                  </tr>
                  <tr>
                    <td><span className='fw-bold'>Distance:</span></td>
                    <td>{parseFloat(travelInfo.distance).toFixed(2)} Km</td>
                  </tr>
                  <tr className=''>
                    <td><span className='fw-bold'>Total Passenger:</span></td>
                    <td>{classInfo.passengerNumber}</td>
                  </tr>

                  <tr className=''>
                    <td className=''><span className='fw-bold'>Total:</span></td>
                    <td>{Math.ceil(classInfo.fare * parseFloat(travelInfo.distance).toFixed(2) * classInfo.passengerNumber)} Taka</td>
                  </tr>

                  <tr className=''>
                    <td className=''><span className='fw-bold'>Discount:</span></td>
                    <td>{paymentInfo.passengerType.discount} %</td>
                  </tr>

                  <tr className=''>
                    <td className=''><span className='fw-bold'>Payable Amount:</span></td>
                    <td>{Math.ceil(paymentInfo.discountedPayment)} Taka</td>
                  </tr>

                </tbody>
              </Table>
            </div>
          </div>


          <div className='text-center d-block'>
            <span className='bg-warning'>{message}</span>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button color="secondary" onClick={props.toggle}>Cancel</Button>
          <Button color="primary" onClick={() => { approve(props.selected) }}> Approve</Button>
          {spinner ? <MySpinner /> : ''}

        </ModalFooter>

      </Modal>
    </div>
  )
}
