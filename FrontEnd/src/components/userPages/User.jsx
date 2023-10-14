import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Error from "./Error"

function User() {
    //Calling HOOKS
    const [data, setData] = useState({userName:"FAHAD"});

    useEffect(() => {

        getUser()
    }, [])
    const getUser = async () => {
        const token = localStorage.getItem("token");
        const userInfo = await fetch("http://localhost:5000/api/auth/getJobSeekerDetails", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }
        });
        const Info = await userInfo.json()
        
        setData(Info)
    }

    const token = localStorage.getItem('token')
    if (!token) return <div>
        <Error />;
    </div>

    else {
        
            return (
                <div>
                    <Navbar />
                    <div className="text-center" style={{ margin: "10%" }}>
                        <h3>WelcomeBack! {data.userName} </h3>
                        <h6>Our Recommendations : 20</h6>
                        <h6>Saved Jobs : 5</h6>
                        <h6>Applied :1</h6>
                    </div>


                </div>

            );
        }
    

}

export default User;