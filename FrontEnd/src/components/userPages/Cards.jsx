import React from "react";


function Card(props) {
    const token = localStorage.getItem('token')
    const handleSave = async (e) => {
        e.target.innerHTML='Saved'
        const response = await fetch('http://localhost:5000/api/jobs/savedJobs', {
            method: 'Post',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ job_id: props._id })
        })
        


    }
    const handleDelete = async (e) => {
        const response = await fetch('http://localhost:5000/api/jobs/savedJobs/delete', {
            method: 'Post',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ job_id: props._id })
        })
    }
    const handleApply=()=>{

    }



    return (



        <div className="card card-component text-left col-lg-9 " style={{ borderRadius: "15px" }}>
            <div className="card-body " >

                <h5 className=" row card-title mb-3">{props.title}</h5>

                <div className="row mb-1">
                    <h6 className=" mb-0 text-muted">Salary :</h6>
                    <h6 className=" font-weight-normal mb-0 text-muted ">{props.Salary}</h6>

                </div>

                <div className="row mb-1">
                    <h6 className=" mb-0 text-muted">Posted By :</h6>
                    <h6 className=" font-weight-normal mb-0 text-muted ">{props.Recruiter},
                        <a href="https://www.arcesium.com/careers/" className="text-muted" style={{ color: "black" }}> Arcesium</a></h6>

                </div>
                <div className="row mb-1">
                    <h6 className=" mb-0 text-muted">Working Hours:</h6>
                    <h6 className=" font-weight-normal mb-0 text-muted ">{props.WorkingHours}</h6>
                    



                </div>
                <p className="row mb-2  text-muted ">{props.Info}</p>

                <div className="row mb-2">
                    <h6 className=" mb-0 text-muted">Posted On :</h6>
                    <h6 className=" font-weight-normal mb-2 text-muted ">{props.postedDate}</h6>

                </div>
                {props.delete === 'false' ?
                    <div style={{}} >
                        <button className="btn btn-primary btn-sm" style={{ padding: "5px 50px", marginLeft: "-15px", marginRight: "25px" }} onClick={handleSave}>Save</button>
                        <button className="btn btn-success btn-sm" style={{ padding: "5px 50px", marginLeft: "-15px" }} onClick={handleApply}>Apply</button></div> :
                    <div style={{}} >
                        <button className="btn btn-danger btn-sm" style={{ padding: "5px 50px", marginLeft: "-15px", marginRight: "25px" }} onClick={handleDelete}>Delete</button>
                        <button className="btn btn-success btn-sm" style={{ padding: "5px 50px", marginLeft: "-15px" }} onClick={handleApply}>Apply</button></div>
                }



            </div>
                
        </div>

    )
}
export default Card;