import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Error from "./Error";

function User() {
    const [userData, setUserData] = useState({ userName: "FAHAD" });

    useEffect(() => {
        const getUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
         
                return;
            }

            const userInfo = await fetch("http://localhost:5000/api/auth/getJobSeekerDetails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token,
                },
            });

           
            const userData = await userInfo.json();
            setUserData(userData);
            localStorage.setItem("userData", JSON.stringify(userData)); // Store user data in local storage for future use.

            
        };
        getUser();
    }, []);

    const token = localStorage.getItem("token");
    if (!token) {
        return <Error />;
    }

    return (
        <div>
            <Navbar />
            <div className="text-center" style={{ margin: "10%" }}>
                <h3>Welcome Back! {userData.userName} </h3>
                <h6>Our Recommendations: 20</h6>
                <h6>Saved Jobs: 5</h6>
                <h6>Applied: 1</h6>
            </div>
        </div>
    );
}

export default User;
