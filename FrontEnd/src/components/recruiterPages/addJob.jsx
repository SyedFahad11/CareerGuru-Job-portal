import React, { useEffect } from "react";
import Navbar from "./Navbar";

function AddJob() {
    var token = localStorage.getItem('token');

    var handleSubmit = async (e) => {
        e.preventDefault();
        const { title, salary, postedBy, workingHours, description, contact } = e.target;
        const response = await fetch("http://localhost:5000/api/jobs/addJob", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            body: JSON.stringify({
                title: title.value,
                salary: salary.value,
                postedBy: postedBy.value,
                workingHours: workingHours.value,
                description: description.value,
                contact: contact.value
            })
        });
        const json = await response.json();
        window.location.reload();
    }
    return <div className="recruiter">
        <Navbar />
        <div className="container my-3 " >
            <h2>Add a JOB</h2>
            <form className="my-3" onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label htmlFor="title" className="form-label ">Title</label>
                    <input type="text" className="form-control" name="title" required />

                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label ">Location</label>
                    <input type="text" className="form-control" name="salary" />
                </div>

                <div className="mb-3">
                    <label htmlFor="tag" className="form-label ">Salary</label>
                    <input type="text" className="form-control" name="salary" />
                </div>


                <div className="mb-3">
                    <label htmlFor="description" className="form-label " >Description</label>
                    <input type="text" className="form-control" name="description" required />
                </div>

                <div className="mb-3">
                    <label htmlFor="tag" className="form-label mr-3">Category</label>
                    <select name="category">
                        <option value="Software Development">Software Development</option>
                        <option value="Sales, Advertising, & Account Management">Sales, Advertising, & Account Management</option>
                        <option value="Buying, Planning, & Instock Management">Buying, Planning, & Instock Management</option>
                        <option value="Operations, IT, & Support Engineering">Operations, IT, & Support Engineering</option>
                        <option value="Machine Learning Science">Machine Learning Science</option>
                        <option value="Marketing & PR">Marketing & PR</option>
                        <option value="Project/Program/Product Management--Non-Tech">Project/Program/Product Management--Non-Tech</option>
                        <option value="Business Intelligence">Business Intelligence</option>
                        <option value="Solutions Architect">Solutions Architect</option>
                        <option value="Hardware Development">Hardware Development</option>
                        <option value="Medical, Health, & Safety">Medical, Health, & Safety</option>
                        <option value="Administrative Support">Administrative Support</option>
                        <option value="Finance & Accounting">Finance & Accounting</option>
                        <option value="Systems, Quality, & Security Engineering">Systems, Quality, & Security Engineering</option>
                        <option value="Facilities, Maintenance, & Real Estate">Facilities, Maintenance, & Real Estate</option>
                        <option value="Fulfillment & Operations Management">Fulfillment & Operations Management</option>
                        <option value="Project/Program/Product Management--Technical">Project/Program/Product Management--Technical</option>
                        <option value="Research Science">Research Science</option>
                        <option value="Supply Chain/Transportation Management">Supply Chain/Transportation Management</option>


                    </select>
                </div>


                <div className="mb-3">
                    <label htmlFor="tag" className="form-label mr-3">Contract Type</label>
                    <select name="contractType">
                        <option value="fullTime">Full Time</option>
                        <option value="partTime">Part Time</option>
                        <option value="">{ }</option>

                    </select>
                </div>

                <button type="submit" className="btn btn-primary" >Add Job</button>
            </form>
        </div>

    </div>

}
export default AddJob;