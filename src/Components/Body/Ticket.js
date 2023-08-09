import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import TravelDetails from './TravelDetails';
import PassengerInfo from './PassengerInfo';
import Payment from './Payment';
import Details from './Details';
import ClassInfo from './ClassInfo';
import axios from 'axios';
import MySpinner from './MySpinner';

let steps

if (window.innerWidth <= 500) {
  steps = ['', '', '', ''];
}
else steps = ['Travel', 'Class', 'Passenger', 'Payment'];




export default function Ticket() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [spinner, setSpinner] = useState(false)


  let classInfo = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'class') === null ? false : JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'class'))

  let travelInfo = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'travel_details') === null ? false : JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'travel_details'))

  let paymentInfo = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'payment') === null ? false : JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'payment'))

  let passengerInfo = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'pi') === null ? false : JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'pi'))

  let userInfo = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'user') === null ? false : JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'user'))


  const isStepSkipped = (step) => {
    return skipped.has(step)
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  const handleReset = () => {
    setActiveStep(0);
  };


  const proceed = () => {
    if (isNaN(Math.ceil(classInfo.fare * parseFloat(travelInfo.distance).toFixed(2) * classInfo.passengerNumber)) || !paymentInfo || !passengerInfo || travelInfo.distance === 0) {
      window.alert(travelInfo.distance === 0 ? 'Boarding point and destination point must be different' : 'You have skipped or unsaved mandatory field')
    }
    else {

      setSpinner(true)

      axios.post(process.env.REACT_APP_DATABASE_API + 'PendingTicket.json', {

        userInfo: userInfo,
        classInfo: classInfo,
        travelInfo: travelInfo,
        paymentInfo: paymentInfo,
        passengerInfo: passengerInfo

      }).then(data => {
        if (data.status === 200) {
          window.location.replace('/success')
          setSpinner(false)
        }
      })
    }
  }





  return (
    <div className='container py-5'>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {activeStep === steps.length ? (
          <React.Fragment>
            <div className='pt-5'>{<Details />}</div>

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button variant="outlined" onClick={handleReset}>Reset</Button>
              <Button onClick={proceed} variant="contained" className='ms-4'>Proceed</Button>
            </Box>


          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className='pt-5'>
              {activeStep + 1 === 1 ? <TravelDetails /> : ''}
              {activeStep + 1 === 2 ? <ClassInfo /> : ''}
              {activeStep + 1 === 3 ? <PassengerInfo /> : ''}
              {activeStep + 1 === 4 ? <Payment /> : ''}
            </div>

            <div className='pt-5'>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                  variant="outlined"
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />

                <Button variant="outlined" onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </div>
          </React.Fragment>
        )}
      </Box>

      {spinner ? <MySpinner /> : ''}
    </div>
  );
}
