import React from "react";
import { useNavigate } from 'react-router-dom'

function Register() {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(e.target.userType.value)

        const { userName, email, password,userType, skills, job, pay, qualification, } = e.target
        console.log(e.target.userName);
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: userName.value,
                email: email.value, 
                password: password.value, 
                userType:userType.value
               /*  skills: skills.value, 
                job: job.value, pay: 
                pay.value, 
                qualification: qualification.value, */
            })
        });
        const json = await response.json();
        console.log(json);
        if (json.success){
            if(json.type==="jobSeeker"){
                localStorage.setItem('token', json.authtoken)
                navigate('/user');
            } 
            else navigate('/recruiter');
        } 
        else alert("User already exists ")



    }


    return (
        <div>
            <div className=" text-center container">
                <div className="row ">
                    <div className="col-12 left-form ">

                        <form onSubmit={handleSubmit} className="form-signup" >



                            <img className="mb-3" src="newsletter.jfif" alt="" width="72" height="72" />
                            <h5 className="h5 mb-12 font-weight-normal">Build your Career</h5>




                            {/* <div className="col">
                                        <div className="row">
                                            <div className="col">
                                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />

                                                <label class="form-check-label " for="flexRadioDefault1">
                                                    JobSeeker
                                                </label>

                                            </div>
                                            <div className="col">
                                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                                                <label class="form-check-label" for="flexRadioDefault2">
                                                    Recruiter
                                                </label>
                                            </div>

                                        </div>
                                    </div> */}




                            <input type="text" name="userName" className="form-control bottom" placeholder=" UserName" />

                            <input type="email" name="email" className="form-control bottom" placeholder=" Email" />

                            <input type="password" name="password" className="form-control bottom" placeholder=" Password" />

                            <div className="form-control">
                                <div className="row">
                                    <div className="col-3">
                                        <label > Are You A?</label>
                                    </div>
                                    <div className="col-3">
                                        <select name="userType">
                                            <option value="jobSeeker">
                                                JobSeeker
                                            </option>
                                            <option value="recruiter">
                                                Recruiter
                                            </option>

                                        </select>
                                    </div>



                                </div>
                            </div>



                            {/* <input type="text" name="skills" className="form-control bottom" placeholder=" Enter skills here" />

                            <input type="text" name="job" className="form-control bottom" placeholder="What jobs are you looking for?" />



                            <div className="form-control">
                                <label className="float-left"> How much pay are you looking for?</label>
                                <select name="pay">
                                    <option value="Any">Any
                                    </option>
                                    <option value="Above 1LPA   ">Above 1LPA
                                    </option>

                                    <option value=" Above 3LPA"> Above 3LPA
                                    </option>
                                    <option value="Above 5LPA">Above 5LPA
                                    </option>
                                    <option value="Above 10LPA">Above 10LPA
                                    </option>
                                </select>
                            </div>

                            <div className="form-control ">
                                <label className="float-left"> Select Qualification:</label>
                                <select name="qualification" >
                                    <option value="10 and below"> 10 and below
                                    </option>
                                    <option value="Intermediate"> Intermediate
                                    </option>

                                    <option value=" Graduate"> Graduate
                                    </option>
                                    <option value="PG and above"> PG and above
                                    </option>
                                </select>
                            </div>
                            <div className="form-control " >
                                <label className="float-left "> Upload Resume:</label>
                                <input type="file" name="resume" />
                            </div>
 */}

                            <button className="btn mt-2 btn-lg btn-primary btn-block" type="submit">Sign Up</button>
                            <p className="mt-2">Already a user? <a href='signin'>Login</a></p>
                        </form>
                    </div>
                </div>
            </div >

        </div >
    );
}
export default Register;