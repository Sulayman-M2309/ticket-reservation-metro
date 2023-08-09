import axios from "axios"


export const createUser = (obj) => {
    let data = axios.post(process.env.REACT_APP_DATABASE_API + 'User.json', obj).then(data => data.data)
    return data
}

export const getUsers = () => {
    let data = axios.get(process.env.REACT_APP_DATABASE_API + 'User.json').then(data => data.data)
    return data
}

export const checkUserAuth = (obj, mode) => {

    if (mode === 'signin') {

        console.log(obj)
        let data = getUsers().then(data => {
            let count = 0
            let user
            let message = 'Email not found'
            for (let i in data) {
                if (data[i].email === obj.email) {
                    console.log('email found', data[i])

                    if (String(data[i].password) === obj.password) {
                        console.log('pass found')
                        count++;
                        user = data[i]
                        message = 'Login successful'
                        break
                    }
                    else {
                        message = 'password not matched'
                        continue
                    }
                }
                else continue
            }


            if (count === 0) return { auth: false, message: message }
            else return { auth: true, data: user, message: message }
        })

        return data

    }
    else {

        let data = getUsers().then(data => {
            let count = 0
            let user
            let message = ''
            for (let i in data) {
                if (data[i].email === obj.email) {
                    count++;
                    break
                }
                else continue
            }


            if (count === 0) return { auth: false, message: 'Email not found' }
            else return { auth: true, data: user, message: 'Email already exist' }
        })

        return data

    }




}


export const getSingleUser = id => {
    let data = axios.get(process.env.REACT_APP_DATABASE_API + 'User/' + id + '.json').then(data => data.data)
    return data
}