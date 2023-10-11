
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const SignIn = (props) => {
    const [credentials, setCredentials] = useState({ email: " ", password: "" })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/user");
        }
        else {
            alert("Invalid credentials");
        }
    }

    const onChange = (e) => {
        console.log(e.target.value)
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


        return (
            <div className="container text-center my-5 signin">
                <div className="row">
                    <div className="col-12">

                        <form onSubmit={handleSubmit} className="form-signin"  >
                            <img className="mb-4" src="./newsletter.jfif" alt="pic" width="72" height="72" />

                            <h1 className="h5 mb-3 font-weight-normal">Build your Career</h1>

                            <input type="email" name="email" className="form-control bottom" placeholder="Enter Email" value={credentials.email} onChange={onChange} nofill />

                            <input type="password" name="password" className="form-control bottom" placeholder="Enter Password" value={credentials.password} onChange={onChange}autoComplete="off" 
                            nofill
                             />
                            <br></br>

                            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign In</button>

                            <p className="mt-2">Not Registered? <a href='register'>Register Here</a></p>
                        </form>
                    </div>

                </div>
            </div>)
    };

export default SignIn;


/* import React from "react";

function SignIn() {
    
    return (
        <div className="container text-center signin">
            <div className="row">
                <div className="col-12">

                    <form onSubmit={handleSubmit} className="form-signin">
                        <img className="mb-4" src="./newsletter.jfif" alt="pic" width="72" height="72" />

                        <h1 className="h5 mb-3 font-weight-normal">Build your Career</h1>

                        <input type="email" name="email" className="form-control bottom" placeholder="Enter Email" value={credentials.email} onChange={onChange} />

                        <input type="password" name="password" className="form-control bottom" placeholder="Enter Password" value={credentials.password} onChange={onChange} />
                        <br></br>
                        
                        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign In</button>

                        <p className="mt-2">Not Registered? <a href='register'>Register Here</a></p>
                    </form>
                </div>

            </div>
        </div>)
};
export default SignIn; 
*/