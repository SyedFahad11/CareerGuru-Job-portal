import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            console.log(json.type);
            if (json.type === "jobSeeker") navigate('/user');
            else navigate('/recruiter');
        }
        else {
            alert("Invalid credentials");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="container text-center my-5" style={styles.formSignIn}>
            <div className="row">
                <div className="col-12">
                    <form onSubmit={handleSubmit}  style={styles.formSignIn}>
                        <img className="mb-4" src="./newsletter.jfif" alt="pic" width="72" height="72" />
                        <h1 className="h5 mb-3 font-weight-normal">Build your Career</h1>
                        <input
                            type="email"
                            name="email"
                            style={styles.formControl}
                            placeholder="Enter Email"
                            value={credentials.email}
                            onChange={onChange}
                            nofill="true"
                            className='form-control'
                        />
                        <input
                            type="password"
                            name="password"
                            style={styles.formControl}
                            placeholder="Enter Password"
                            value={credentials.password}
                            onChange={onChange}
                            autoComplete="off"
                            nofill="true"
                            className='form-control'
                        />

                        <button className="btn btn-md mt-2  btn-primary btn-block" type="submit">Sign In</button>
                        <p className="mt-2">Not Registered? <a href='register'>Register Here</a></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

const styles = {
    formSignIn: {
        width: '100%',
        maxWidth: '330px',
        padding: '15px',
        margin: 'auto'
    },
    formControl: {
        position: 'relative',
        boxSizing: 'border-box',
        height: 'auto',
        padding: '10px',
        fontSize: '16px',
        transition: 'zIndex 0.3s ease',
        margin:'1px',
        zIndex: '0',
        ':focus': {
            zIndex: '1'
        }
    }
};

export default SignIn;
