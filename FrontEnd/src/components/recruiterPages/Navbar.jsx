import React from "react";
import {useNavigate} from "react-router-dom"

function Navbar() {
    const navigate=useNavigate()
    
    const logout=()=>{
        localStorage.clear();
        navigate("/");
    }
    return (
        <div className="container-fluid ">
            <nav className="navbar navbar-expand-lg navbar-bg navbar-light " >
                <a className="navbar-brand " href='/recruiter' >CareerGuru</a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="navbar navbar-collapse" id="navbarToggler"
                >
                    <ul className="navbar-nav nav-ul">
                        <li className="nav-item ">
                            <a className="nav-link" href="/recruiter/addJobs">PostJobs</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/recruiter/myJobs" >MyJobs</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" >Employees</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav nav-ul">
                        <li className="nav-item">
                            <a className="nav-link " href="/recruiter/profile" >Profile</a>
                        </li>
                        <li className="nav-item ">
                            <button className="btn btn-danger btn-md px-4 py-1 mt-1" onClick={logout}>Logout</button>
                            
                        </li>

                    </ul>
                </div>

            </nav>
        </div>
    )
}
export default Navbar;