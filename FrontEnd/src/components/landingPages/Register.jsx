import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'

function Register() {
    const navigate = useNavigate();

    // Define state variables for form fields
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
        userType: 'jobSeeker',
        companyName:''
         // Default value for userType
    });

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { userName, email, password, userType,companyName } = formData;

        const response = await fetch("http://localhost:5000/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName,
                email,
                password,
                userType,
                companyName
            })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            if (json.type === "jobSeeker") {
                localStorage.setItem('token', json.authtoken)
                navigate('/user');
            } else {
                navigate('/recruiter');
            }
        } else {
            alert("User already exists ");
        }
    };

    return (
        <div>
            <div className=" text-center container">
                <div className="row ">
                    <div className="col-12 left-form ">
                        <form onSubmit={handleSubmit} className="form-signup">
                            <img className="mb-3" src="newsletter.jfif" alt="" width="72" height="72" />
                            <h5 className="h5 mb-12 font-weight-normal">Build your Career</h5>

                            <input type="text" name="userName" value={formData.userName} onChange={handleChange} className="form-control bottom" placeholder=" Name" />

                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control bottom" placeholder=" Email" />

                            <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control bottom" placeholder=" Password" />

                            <div className="form-control">
                                <div className="row">
                                    <div className="col-3">
                                        <label > Are You A?</label>
                                    </div>
                                    <div className="col-3">
                                        <select name="userType" value={formData.userType} onChange={handleChange}>
                                            <option value="jobSeeker">JobSeeker</option>
                                            <option value="recruiter">Recruiter</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {formData.userType === "recruiter" ?
                                <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="form-control bottom" placeholder="Company Name" /> :

                                <div></div>
                            }

                            <button className="btn mt-2 btn-lg btn-primary btn-block" type="submit">Sign Up</button>
                            <p className="mt-2">Already a user? <a href='signin'>Login</a></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
