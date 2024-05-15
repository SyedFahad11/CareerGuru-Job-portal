import React, { useState, useEffect } from "react";
import Navbar from "./Bootsrap/Navbar";



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

        const userInfo = await fetch("http://localhost:5000/auth/getRecruiterDetails", {
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

        const postData = await fetch('http://localhost:5000/auth/updateuser', {
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

