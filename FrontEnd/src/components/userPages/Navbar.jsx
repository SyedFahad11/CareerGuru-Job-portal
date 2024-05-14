import React from "react";
import { useNavigate } from "react-router-dom"

function Navbar() {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear();
        navigate("/");
    }
    return (
        <div className="container-fluid ">
            <nav className="navbar navbar-expand-lg navbar-light " style={styles.navbarBG} >
                <a className="navbar-brand " href='/user' >CareerGuru</a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="navbar navbar-collapse" id="navbarToggler"
                >
                    <ul className="navbar-nav ml-3">
                        <li className="nav-item ">
                            <a className="nav-link" href="/user/RecJobs">Recommended Jobs </a>
                        </li>
                        <li style={styles.navItem}>
                            <a className="nav-link" href="/user/SavedJobs" >Saved Jobs</a>
                        </li>

                        <li style={styles.navItem}>
                            <a className="nav-link" href="/user/AppliedJobs">Applied Jobs</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav nav-ul">
                        <li style={styles.navItem}>
                            <a className="nav-link " href="/user/profile" >Profile</a>
                        </li>
                        <li className="nav-item ">
                            <button className="btn btn-primary btn-md px-4 py-1 mt-1" onClick={logout}>Logout</button>

                        </li>

                    </ul>
                </div>

            </nav>
        </div>
    )
}
const styles = {
    navbarBG: {
        backgroundColor: 'white'
    },
    navItem: {
        color: 'black',
        fontSize: 'large',
        padding: '0 5px'
    }
}
export default Navbar;