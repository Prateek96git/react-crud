import Axios from 'axios';// its an a library its for crud operation
const axiosIns = Axios.create({
    baseURL: 'http://localhost:5000' 
});

const UserApi = {
    getAll: () => {
        return axiosIns.request({  // axios => it is used to send https requests 
            method: 'GET',
            url: `/users` 
        })
    },
    getSingle: (id) => {
        return axiosIns.request({
            method:'GET',
            url:`/users/${id}`
        })
    },
    create: (user) => {
        return axiosIns.request({  // creating new data
            method: 'POST',
            url: `/users`,
            data: user
        })
    },
    update: (user, id) => {        // it will replace the data
        return axiosIns.request({
            method: 'PUT',
            url: `/users/${id}`,
            data: user
        })
    },
    delete: (id) => {             // it will delete the existing user id
        return axiosIns.request({
            method: 'DELETE',
            url: `/users/${id}`,
        })
    },
}

export default UserApi;