import React, {useState, useRef, useEffect, setCourse, course} from 'react';
import UserApi from '../API/UserApi'
import { toast } from 'react-toastify'

// useRef => react hook method

function Create(props) {
    const [emailErr, setEmailErr] = useState(false);
    const [mobileErr, setMobileErr] = useState(false);

    const name = useRef();
    const email = useRef();
    const mobile = useRef();
    const address = useRef(); 

    const submitHandler = async (e) => {
        e.preventDefault();  // avoid page refresh on submit / it will not submit the data 
        const data = {
            name: name.current.value,  // current.value => keyword
            email: email.current.value,
            mobile: mobile.current.value,
            address: address.current.value
        };
    
        /* to read value from an input */
         const readValue = (event) => {
           // console.log('event=', event.target)
            const {name, value} = event.target;
            setCourse({...course, [name]: value});
         }

          /* email validation - username@domain.ext */
          let regEmail = /^\S+@\S+\.\S+$/;
          let regMobile = /^[6-9]\d{9}$/;  
            
          // console.log('data=', data);
          let users = await UserApi.getAll();
          console.log('all users =', users.data);   

          let extEmail = await users.data.find((item) => item.email === data.email);
          let extMobile = await users.data.find((item) => item.mobile === data.mobile);

           if (extEmail) {
               toast.warning("Email already exists");
           } else if (extMobile){
               toast.warning("Mobile number already exists");
           } else if (regEmail.test(data.email) === false) {
                toast.error("Invalid Email Format");
               } else if (regMobile.test(data.mobile) === false) {
                toast.error("Invalid Indian Mobile Number");
           } else {
               UserApi.create(data).then(res => {
               toast.success('user created successfully');
                window.location.href = "/";
         }).catch(err => toast.error(err.message));
      }
    }

    return ( 
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
            <h1 className="display-3 text-success">Create</h1>
         </div>
     </div>

     <div className="row">
        <div className="col-md-6 offset-md-3">
            <form autoComplete='off' onSubmit={submitHandler}>
                <div className="form-group mt-2">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" ref={name} className="form-control" required />
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="name" id="email" ref={email} className="form-control" required/>
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="mobile">Mobile</label>
                        <input type="text" name="mobile" id="mobile" ref={mobile} className="form-control" required/>
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="address">Address</label>
                        <textarea name="address" id="address" ref={address} cols="30" rows="10"
                         className="form-control" required></textarea>
                    </div>
                    <div className="form-group mt-2">
                        <input type="submit" value="Create" className="btn btn-success"/>
                    </div>
                </form>    
             </div>
          </div>
       </div>
      )
 }

export default Create