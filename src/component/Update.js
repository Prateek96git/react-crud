import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import UserApi from '../API/UserApi';
import {toast} from 'react-toastify';

function Update(props) {
    const param = useParams(); // used to read ref id from router path
    console.log('id =', param.id);

    const [user, setUser] = useState({
        name: "",
        email: "",
        mobile: "",
        address: "",
    });

    useEffect(() => {
        UserApi.getSingle(param.id).then(res => {
            console.log('single user =', res.data);
            setUser(res.data)
        }).catch(err => toast.error(err.message));
    }, []);

    const readValue = (e) => {
        // console.log('event target=',e.target.name + "-" + e.target.value);
        let {name, value} = e.target;
        setUser({...user, [name]:value })
    }

    const submitHandler = (e) => {
        e.preventDefault(); // avoid page refresh
        try {
            console.log('updated user data=', user);
            UserApi.update(user, param.id).then(res => {
                toast.success("user successfully updated");
                window.location.href = "/";
            }).catch(err => toast.error(err.message));
        } catch (err) {
            toast.error(err.message);
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
            <h3 className="display-3">Update</h3>
        </div>
     </div>
    
     <div className="row">
        <div className="col-md-6 offset-md-3">
            <div className="card">
                <div className="card-body">
                    <form onSubmit={submitHandler} autoComplete={'off'} >
                        <div className="form-group mt-2">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" value={user.name} onChange={readValue} id="name"
                            className="form-control" required/>
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" value={user.email} onChange={readValue} id="email"
                            className="form-control" required/>
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="mobile">Mobile</label>
                            <input type="number" name="mobile" value={user.mobile} onChange={readValue} id="mobile"
                            className="form-control" required/>
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="address">Address</label>
                            <textarea name="address" value={user.address} onChange={readValue} id="address" 
                            cols="30" rows="5" className="from-control" required></textarea>
                        </div>
                        <div className="form-group mt-2">
                            <input type="submit" value="Update" className="btn btn-success" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
     </div>
  </div> 
    )
}

export default Update