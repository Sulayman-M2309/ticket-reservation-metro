import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table } from 'reactstrap'
import PendingModal from './PendingModal'
import MySpinner from './MySpinner'

export default function Pending() {

    const [pendingList, setPendingList] = useState([])
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(null)
    const [spinner, setSpinner] = useState(false)



    useEffect(() => {

        setSpinner(true)

        let arr = []
        axios.get(process.env.REACT_APP_DATABASE_API + 'PendingTicket.json').then(data => {
            for (let i in data.data) {
                arr.push({
                    ...data.data[i],
                    id: i
                })
            }

            setPendingList(arr)
            setSpinner(false)

        })

    }, [open])



    const toggle = (e, item) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        setSelected(item)
        setOpen(!open)
    }


    const rejectTicket = (item) => {
        setSpinner(true)
        axios.delete(process.env.REACT_APP_DATABASE_API + 'PendingTicket/' + item.id + '.json').then(data => {
            if (data.status === 200) {
                setOpen(!open)
                setOpen(!open)
                // setSpinner(false)
            }
            else {
                setSpinner(false)
            }
        })
    }



    let allPending
    if (pendingList.length === 0) {
        allPending = <p className='my-5 text-center'>No Pending</p>
    }


    else {
        allPending = pendingList.map((item, index) => {
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
                    <td><button onClick={e => rejectTicket(item)} className='btn btn-danger'>Reject</button></td>
                    <td><button onClick={(e) => toggle(e, item)} className='btn btn-success'>Approve</button></td>
                </tr>
            )
        })
    }





    return (
        <div>
            <h3 className='text-center my-3'>Pending List</h3>
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
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {allPending}
                    </tbody>
                </Table>
            </div>


            <PendingModal open={open} selected={selected} toggle={toggle} />

            {spinner ? <MySpinner /> : ''}
        </div>
    )
}
