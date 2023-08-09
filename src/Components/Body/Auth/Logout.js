import React, { useEffect } from 'react'
import { deleteLocalStorage } from '../../Function/StorageFunction'

export default function Logout() {

    useEffect(() => { deleteLocalStorage() }, [])

    return window.location.replace('/signin')



}
