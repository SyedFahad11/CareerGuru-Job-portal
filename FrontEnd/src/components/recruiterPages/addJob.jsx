import React,{useEffect}from "react";
import Navbar from "./Navbar";

function AddJob() {
    var token=localStorage.getItem('token');

    var handleSubmit = async (e) => {
        e.preventDefault();
        const {title,salary,postedBy,workingHours,description,contact}=e.target;
        const response = await fetch("http://localhost:5000/api/jobs/addJob", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':token
            },
            body: JSON.stringify({
                title: title.value,
                salary: salary.value, 
                postedBy: postedBy.value, 
                workingHours:workingHours.value,
                description:description.value,
                contact:contact.value
            })
        });
        const json=await response.json();
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
                    <label htmlFor="tag" className="form-label ">Salary</label>
                    <input type="text" className="form-control" name="salary" />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label ">PostedBy</label>
                    <input type="text" className="form-control" name="postedBy" />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label ">WorkingHours</label>
                    <input type="text" className="form-control" name="workingHours" />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label " >Description</label>
                    <input type="text" className="form-control" name="description" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label ">Contact</label>
                    <input type="text" className="form-control" name="contact" required />
                </div>

                <button type="submit" className="btn btn-primary" >Add Job</button>
            </form>
        </div>

    </div>

}
export default AddJob;