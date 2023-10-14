import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";



function Profile() {
    const [data, setData] = useState({});
    const token = localStorage.getItem("token");
    useEffect(() => {
        getUser()
    }, [])

    const [imageData, setImageData] = useState({
        file: []
    })
    const [resumeData, setResumeData] = useState({
        file: []
    })

    const getUser = async () => {

        const userInfo = await fetch("http://localhost:5000/api/auth/getJobSeekerDetails", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }
        });
        const Info = await userInfo.json()
        //console.log(Info)
        setData(Info)
    }
    const HandleSubmit = async (e) => {
        e.preventDefault();
        //const temp=e.json();
        console.log(e.target.userName.value)
        const { userName, email, password, skills, job, pay, qualification } = e.target

        const postData = await fetch('http://localhost:5000/api/auth/updateJobSeekerDetails', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'auth-token': token

            },
            body: JSON.stringify({
                userName: userName.value,
                email: email.value, password: password.value, skills: skills.value, job: job.value, pay: pay.value, qualification: qualification.value
            })
        })
        const response = await postData.json();
        console.log(response)
    }
    const OnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const imageUpload = () => {

    }
    const resumeUpload = () => {

    }
    const onProfileChange = (e) => {
        setImageData({ ...imageData, file: e.target.files[0] })
    }
    const onResumeChange = (e) => {
        setResumeData({ ...resumeData, file: e.target.files[0] })
    }



    return (
        <div>
            <Navbar />
            <h2 className="h2 mb-4 container font-weight-normal" style={{ width: "55%", textAlign: "center", marginTop: "1%" }}>My Profile</h2>

            <img className="mb-3 rounded-circle" src={`https://www.kasandbox.org/programming-images/avatars/mr-pants.png`} alt="ProfileImage" style={{ "height": "150px", "width": "150px", "marginLeft": "auto", "marginRight": "auto", "display": "block" }} />

            <div className="container " style={{ width: "55%", backgroundColor: "white", borderRadius: "15px", marginTop: "2%", padding: "20px", marginBottom: "100px" }}>




                <form onSubmit={HandleSubmit}>
                    <div className="form-row ">

                        <div className="form-group col-md-12 " >
                            <label >UserName</label>
                            <input type="text" className="form-control" name="userName" placeholder="UserName" value={data.userName} onChange={OnChange} />
                        </div>

                        <div className="form-group col-md-6">
                            <label >Email</label>
                            <input type="email" className="form-control" name="email" placeholder="Email" value={data.email} onChange={OnChange} />
                        </div>

                        <div className="form-group col-md-6">
                            <label >Password</label>
                            <input type="text" className="form-control" name="password" placeholder="Password" value={data.password} onChange={OnChange} />
                        </div>

                    </div>


                    <div className="form-group">
                        <label >My Skills</label>
                        <input type="text" className="form-control" name="skills" placeholder="Skills" value={data.skills} onChange={OnChange} />
                    </div>

                    <div className="form-group">
                        <label >What jobs Iam looking at? </label>
                        <input type="text" className="form-control" name="job" placeholder="Want to work as...." value={data.job} onChange={OnChange} />
                    </div>





                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label > How much pay Iam looking for?</label>
                            <select name="pay" className="form-control" onChange={OnChange}>
                                <option value={data.pay} selected>{data.pay}
                                </option>
                                <option value="Any">Any
                                </option>

                                <option value="Above 1LPA">Above 1LPA
                                </option>

                                <option value=" Above 3LPA"> Above 3LPA
                                </option>
                                <option value="Above 5LPA">Above 5LPA
                                </option>
                                <option value="Above 10LPA">Above 10LPA
                                </option>
                            </select>
                        </div>


                        <div className="form-group col-md-6">
                            <label >My Qualification</label>
                            <select name="qualification" className="form-control" onChange={OnChange}>
                                <option value={data.qualification} selected> {data.qualification}
                                </option>
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




                    </div>


                    <button className="btn mt-2  btn-block btn-md btn-primary " type="submit">UPDATE DETAILS</button>


                    <br></br>

                    <div className="form-control container-fluid " style={{ "textAlign": "left", "paddingBottom": "40px" }} >
                        <label className="float-left mr-2"> Upload Photo: </label>

                        <input type="file" name="profileImage" onChange={onProfileChange} />
                        <button className="btn   btn-sm px-5 btn-primary " type="submit" onClick={imageUpload}
                        >Upload</button>
                    </div>




                    <br></br>

                    <div className="form-control " style={{ "textAlign": "left","paddingBottom": "40px" }} >
                        <label className="float-left "> Upload Resume:</label>
                        <input type="file" name="resume" onChange={onResumeChange} />
                        <button className="btn   btn-sm px-5 btn-primary "
                            type="submit" onClick={resumeUpload} >Upload</button>
                    </div>
                </form>

            </div>
        </div>
    );
}
export default Profile


{/* return (
        <div>
            <Navbar />
            <div classNameName=" text-center container">
                <div classNameName="row ">
                    <div classNameName="col-12 mt-5">

                        <form classNameName="form-profile" >

                            <h5 classNameName="h4 mb-4 font-weight-normal">My Profile</h5>
                            <div classNameName="row">
                               <label classNameName="form-control">Name</label>
                                <input classNameName="form-control m-1 bottom" type="text" name="email"  placeholder=" Name" value={data.userName} />
                                
                            </div>



                            <input type="text" name="password" classNameName="form-control m-1 bottom" placeholder=" Password" value={data.password} />

                            <div classNameName="m-1 " >
                                <input classNameName="form-control  float-left" style={{ width: '500px' }} type="text" name="skills" placeholder=" Skills"
                                    value={data.skills} />

                                <button type="button" classNameName="btn btn-sm mt-2 btn-primary ">ADD</button>
                            </div>




                            <div classNameName="form-control " style={{ marginTop: '11px' }}>
                                <label classNameName="float-left"> How much pay are you looking for?</label>
                                <select>
                                    <option value="BMW">Any
                                    </option>
                                    <option value="Mercedes">Above 1LPA
                                    </option>

                                    <option value="Audi"> Above 3LPA
                                    </option>
                                    <option value="Skoda">Above 5LPA
                                    </option>
                                    <option value="Skoda">Above 10LPA
                                    </option>
                                </select>
                            </div>

                            <div classNameName="form-control mt-1 ">
                                <label classNameName="float-left"> Select Qualification:</label>
                                <select>
                                    <option value="BMW"> 10 and below
                                    </option>
                                    <option value="Mercedes"> Intermediate
                                    </option>

                                    <option value="Audi"> Graduate
                                    </option>
                                    <option value="Skoda"> PG and above
                                    </option>
                                </select>
                            </div>

                            <div classNameName="form-control mt-1" >
                                <label classNameName="float-left "> Upload Resume:</label>
                                <input type="file" name="password" />
                            </div>

                            <button classNameName="btn mt-2 px-5 btn-md btn-primary " type="submit">UPDATE DETAILS</button>
                        </form>
                    </div>
                </div>

            </div>
 
         </div>
    );
 */}
