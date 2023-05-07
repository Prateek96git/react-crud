import React, { useState, useEffect } from 'react';
import UserApi from '../API/UserApi'
import { toast } from 'react-toastify'
import { NavLink } from 'react-router-dom'

function Home(props) {
    const [users, setUsers] = useState([]);

    /* receive data on load from api */
    useEffect(() => {
        UserApi.getAll().then(res => {
            console.log('user data =', res.data);
            setUsers(res.data)
        }).catch(err => toast.error(err.message));
    }, [])

    // delete logic
    const delHandler = (id) => {
        if(window.confirm(`Are you sure to delete an user id =${id}`)) {
            UserApi.delete(id).then(res => {
                toast.success("User deleted successfully");
                window.location.href = "/";
            }).catch(err => toast.error(err.message));
        } else {
             toast.warning('delete terminated')
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
               <h3 className="display-3">Home</h3>
               </div>
           </div>
       
           <div className="row">
               {
                users.map((item,index) => {
                    return (
                        <div className="col-md-4 col-sm-12 mt-2 mb-2" key={index} >
                            <div className="card">
                                <div className="card-header text-center">
                                    <h6> {item.name} </h6>
                                </div>
                                <div className="card-body">
                                    <p>
                                        <strong>Email</strong>
                                        <span className="float-end"> {item.email} </span>
                                    </p>
                                    <p>
                                        <strong>Mobile</strong>
                                        <span className="float-end"> {item.mobile} </span>
                                    </p>
                                    <p>
                                        <strong>Address</strong>
                                        <span className="float-end"> {item.address} </span>
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <NavLink to={`/update/${item.id}`} className="btn btn-info">Edit</NavLink>
                                    <button onClick={() => delHandler(item.id)} className="btn btn-danger
                                    float-end">Delete</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
    )
}

export default Home