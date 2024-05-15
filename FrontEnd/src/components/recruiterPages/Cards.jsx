import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./UpdateModal";


function Card(props) {
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    const [cardData, setUpdatedData] = useState(props);
    const [expanded, setExpanded] = useState(false);

    const handleToggleDescription = () => {
        setExpanded(!expanded);
    };




    const handleDelete = async (e) => {
       /*  const response = await fetch('http://localhost:5000/api/rec/deleteJob', {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
                'jobId': props._id
            }
        })
        window.location.reload() */;
    }
    const handleApplications = () => {

    }


    const handleUpdate = (event) => {

    };


    /*  const updateJobs = async (e) => {
         e.preventDefault();
         const { title, Salary, Recruiter, WorkingHours, Info, Contact } = e.target;
         const response = await fetch("http://localhost:5000/api/rec/updateJob", {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
                 'jobId': props._id
             },
             body: JSON.stringify({
                 title: title.value,
                 salary: Salary.value,
                 postedBy: Recruiter.value,
                 workingHours: WorkingHours.value,
                 description: Info.value,
                 contact: Contact.value
             })
         });
         const json = await response.json();
         setUpdatedData(popOverData);
     } */

    return (
        <div>
            <div className="card card-component text-left col-lg-9">
                <div className="card-header">
                    <div className="row">
                        <h5 className="card-title mb-3 col-12">{cardData.Title}</h5>
                    </div>
                    <div className="row mb-2">
                        <div className="col-auto">
                            <h6 className="text-muted">Salary :</h6>
                        </div>
                        <div className="col">
                            <h6 className="mb-0 text-muted">{cardData.Salary}</h6>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-auto">
                            <h6 className="mb-0 text-muted">Location :</h6>
                        </div>
                        <div className="col">
                            <h6 className="mb-2 text-muted">{cardData.Location}</h6>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-auto">
                            <h6 className="mb-0 text-muted">Posted On :</h6>
                        </div>
                        <div className="col">
                            <h6 className=" mb-2 text-muted">{cardData.PostedDate}</h6>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    {props.Info.length > 100 ? (
                        <div className="">
                            {expanded ? (
                                <div className="row mb-2" style={styles.expanded}>
                                    <div className="">
                                        <h6 className="fw-normal mb-0 text-muted" style={styles.para}>
                                            {props.Info}
                                        </h6>
                                    </div>
                                    <div className="">
                                        <button className="btn btn-link btn-sm" onClick={handleToggleDescription}>
                                            Show Less
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="row mb-2" style={styles.truncated}>
                                    <div className="">
                                        <h6 className="fw-normal mb-0 text-muted" style={styles.para}>
                                            {props.Info.substring(0, 200)}
                                        </h6>
                                    </div>
                                    <div className="">
                                        <button className="btn btn-link btn-sm pt-0 mt-0" onClick={handleToggleDescription}>
                                            Show More
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="row">
                            <div className="col">
                                <h6 className="fw-normal mb-2 text-muted">{props.Info}</h6>
                            </div>
                        </div>
                    )}

                    <div className="row" style={styles.buttonGroup}>

                        <div className="col-auto">
                            <Modal cardData={props}/>
                            <button className="btn btn-warning btn-sm me-2" style={styles.actionButton} onClick={handleApplications}>
                                View Applications
                            </button>
                            <button className="btn btn-danger btn-sm" style={styles.actionButton} onClick={handleDelete}>
                                Remove Job
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}

const styles = {
    cardContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '2%',

    },
    cardComponent: {
        width: '100%',
        backgroundColor: 'white',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
        padding: '10px',
    },
    cardTitle: {
        fontWeight: 'bold',
        color: '#333',
    },
    actionButton: {
        padding: '8px 20px',
        marginLeft: '10px',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'flex-end',
    },

    truncated: {

        overflow: 'visible',
        whiteSpace: 'normal',

    },

    expanded: {
        overflow: 'hidden',
        whiteSpace: 'normal',

    },
    para: {
        lineHeight: '1.5em',
        whiteSpace: 'pre-wrap'

    }
};
export default Card;