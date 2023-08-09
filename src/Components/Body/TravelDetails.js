import axios from 'axios';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import MySpinner from './MySpinner';


function TravelDetails() {

    const [savingMessage, setSavingMessage] = useState(true)
    const [spinner, setSpinner] = useState(false)



    useEffect(() => {
        setSpinner(true)
        let arr = []
        axios.get(process.env.REACT_APP_DATABASE_API + 'Route.json').then(data => {
            for (let i in data.data) {
                arr.push(data.data[i])
            }

            setRoutes(arr)
            setSpinner(false)
        })

    }, [])


    const [routes, setRoutes] = useState([])


    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371e3; // Earth's radius in meters

        const toRadians = (degrees) => degrees * Math.PI / 180;
        const deltaLat = toRadians(lat2 - lat1);
        const deltaLon = toRadians(lon2 - lon1);

        const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = R * c;
        return distance / 1000;
    }


    const savingMessageFun = () => {
        setSavingMessage(false)
    }
    return (
        <div className="m-auto px-2">
            <Formik

                initialValues={{
                    boardingPointIndex: localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'travel_details') === null ? '' : JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'travel_details')).boardingPointIndex,

                    destinationPointIndex: localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'travel_details') === null ? '' : JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'travel_details')).destinationPointIndex,

                    date: localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'travel_details') === null ? '' : JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'travel_details')).date,
                }}

                onSubmit={val => {
                    let distance = calculateDistance(routes[val.boardingPointIndex].latitude, routes[val.boardingPointIndex].longitude, routes[val.destinationPointIndex].latitude, routes[val.destinationPointIndex].longitude)

                    console.log(distance)
                    localStorage.setItem(process.env.REACT_APP_LOCAL_STORAGE + 'travel_details', JSON.stringify({
                        ...val, distance: distance,
                        boardingPoint: routes[val.boardingPointIndex].routeName,
                        destinationPoint: routes[val.destinationPointIndex].routeName
                    }))

                }}


            >

                {({ values, handleChange, handleSubmit }) => (

                    <div>

                        <form className="form-control bg-light shadow py-4" onSubmit={handleSubmit} action="">

                            <h3 className='text-center mb-4'>TRAVEL DETAILS</h3>


                            <div className="mt-0">
                                <label htmlFor="boarding">Boarding Point:</label> <br />
                                <select required onChange={handleChange} name='boardingPointIndex' className="form-control" id="boarding" value={values.boardingPointIndex} >
                                    <option value=''>Select</option>

                                    {
                                        routes.map((item, index) => {
                                            return <option key={Math.random()} value={index}>{item.routeName}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="mt-4">
                                <label htmlFor="destination">Destination Point:</label> <br />
                                <select required className="form-control" id="destination" value={values.destinationPointIndex} name='destinationPointIndex' onChange={handleChange} >
                                    <option value=''>Select</option>
                                    {
                                        routes.map((item, index) => {
                                            return <option key={Math.random()} value={index}>{item.routeName}</option>
                                        })
                                    }
                                </select>
                            </div>

                            <div className="mt-4">
                                <label htmlFor="date">Departure time</label> <br />
                                <input required className="form-control" type="date" name="date" value={values.date} onChange={handleChange} id="date" />
                            </div>

                            <button onClick={savingMessageFun} className='btn btn-primary mt-4' type="submit">Save</button>


                            {
                                savingMessage ? <Alert className='mt-4' severity='warning'>Save before continuing.</Alert> : ''
                            }

                        </form>
                    </div>
                )}
            </Formik>

            {spinner ? <MySpinner /> : ''}

        </div>
    );
}

export default TravelDetails;
