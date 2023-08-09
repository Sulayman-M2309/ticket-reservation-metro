import React from 'react'
import { Route, Routes } from 'react-router'
import Contact from './Contact'
import Profile from './Profile'
import Ticket from './Ticket'
import Signin from './Auth/Signin'
import Signup from './Auth/Signup'
import Admin from './Admin'
import Home from './Home'
import Logout from './Auth/Logout'
import { checkLocalStorageAuth } from '../Function/StorageFunction'
import AddRoute from './AddRoute'
import Pending from './Pending'
import Approved from './Approved'
import Success from './Success'


export default function Body() {

  let auth = checkLocalStorageAuth().auth

  let admin
  if (auth) {
    if (checkLocalStorageAuth().data.role === 'admin') admin = true
    else admin = false
  }
  else admin = false

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/success' element={<Success />} />

        {auth ? <Route path='/ticket' element={<Ticket />} /> : ''}
        {admin ? <Route path='/add-route' element={<AddRoute />} /> : ''}
        {admin ? <Route path='/pending' element={<Pending />} /> : ''}
        {admin ? <Route path='/approved' element={<Approved />} /> : ''}

        <Route path='*' element={<h4 className=''>Page not found</h4>} />

      </Routes>
    </div>
  )
}
