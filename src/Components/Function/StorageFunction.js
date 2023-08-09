

export const storeLocalStorage = (obj) => {

    // let data = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'user')
    // if (data === null) {
    //     localStorage.setItem(process.env.REACT_APP_LOCAL_STORAGE + 'user', obj)
    // }
    // else localStorage.setItem(process.env.REACT_APP_LOCAL_STORAGE + 'user', obj)

    localStorage.setItem(process.env.REACT_APP_LOCAL_STORAGE + 'user', JSON.stringify(obj))

}



export const checkLocalStorageAuth = () => {
    let data = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE + 'user')

    if (data === null) return { auth: false }
    else return { auth: true, data: JSON.parse(data) }

}


export const deleteLocalStorage = () => {
    localStorage.removeItem(process.env.REACT_APP_LOCAL_STORAGE + 'user')
    localStorage.removeItem(process.env.REACT_APP_LOCAL_STORAGE + 'travel_details')
    localStorage.removeItem(process.env.REACT_APP_LOCAL_STORAGE + 'pi')
    localStorage.removeItem(process.env.REACT_APP_LOCAL_STORAGE + 'class')
    localStorage.removeItem(process.env.REACT_APP_LOCAL_STORAGE + 'payment')
    // if (user === null) { }
    // else {
    //     localStorage.removeItem(process.env.REACT_APP_LOCAL_STORAGE + 'user')
    // }

}

