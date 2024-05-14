import React, { useState } from "react";

function Card(props) {
    const token = localStorage.getItem('token');
    const [expanded, setExpanded] = useState(false);

    const handleToggleDescription = () => {
        setExpanded(!expanded);
    };

    const handleSave = async (e) => {
        e.target.innerHTML = 'Saved';
        const response = await fetch('http://localhost:5000/api/jobs/savedJobs', {
            method: 'Post',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ job_id: props._id })
        });
    };

    const handleDelete = async (e) => {
        const response = await fetch('http://localhost:5000/api/jobs/savedJobs/delete', {
            method: 'Post',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ job_id: props._id })
        });
    };

    const handleApply = () => { };

    return (
        <div id={props._id} >


            <div className="card-container" style={styles.cardContainer}>
                <div className="card text-left" style={styles.cardComponent}>
                    <div className="card-body">
                        <h5 className="card-title mb-3" style={styles.cardTitle}>{props.title}</h5>

                        <div className="row mb-2">
                        <div className="col-md-6">
                                <div className="row">
                                    <h6 className="mb-0 text-muted ml-3">Company:</h6>
                                    <h6 className="font-weight-normal mb-0 text-muted ml-2" style={styles.salaryStyle}>
                                        {props.companyName}, <a href="https://www.arcesium.com/careers/" className="text-muted" style={{ color: "black" }}>Arcesium</a>
                                    </h6>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="row">
                                    <h6 className="mb-0 text-muted ml-3">Salary:</h6>
                                    <h6 className="font-weight-normal mb-0 text-muted ml-2" style={styles.salaryStyle}>{props.Salary}</h6>
                                </div>
                            </div>

                        </div>


                        <div className="row mb-2">
                            <div className="col-md-6">
                                <div className="row">
                                    <h6 className="mb-0 text-muted ml-3">Working Hours:</h6>
                                    <h6 className="font-weight-normal mb-0 text-muted ml-2" style={styles.salaryStyle}>{props.WorkingHours}</h6>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <h6 className="mb-0 text-muted ml-3">Posted On:</h6>
                                    <h6 className="font-weight-normal mb-2 text-muted ml-2" style={styles.salaryStyle}>{props.postedDate}</h6>
                                </div>
                            </div>
                        </div>


                        <div className="ml-3 mb-3">
                            <div className="row">
                                <h6 className="mb-0 text-muted">Description:</h6>

                                {props.Info.length > 100 ?
                                    <div >
                                        {expanded ?
                                            <div className="ml-2 row" style={styles.expanded} >
                                                <h6 className="font-weight-normal mb-0 text-muted">{props.Info}</h6>
                                                <button className="btn btn-link btn-sm" onClick={handleToggleDescription}>Show Less</button>

                                            </div> :
                                            <div className="ml-2 row" style={styles.truncated} >
                                                <h6 className="font-weight-normal mb-0 text-muted">{props.Info.substring(0, 50)}</h6>
                                                <button className="btn btn-link btn-sm pt-0" onClick={handleToggleDescription}>Show More</button>

                                            </div>
                                        }
                                    </div>

                                    :
                                    <div className="ml-2" >
                                        <h6 className="font-weight-normal mb-0 text-muted">{props.Info}</h6>
                                    </div>
                                }
                            </div>
                        </div>

                        {props.delete === 'false' ? (
                            <div style={styles.buttonGroup}>
                                <button className="btn btn-primary btn-sm" style={styles.actionButton} onClick={handleSave}>Save</button>
                                <button className="btn btn-success btn-sm" style={styles.actionButton} onClick={handleApply}>Apply</button>
                            </div>
                        ) : (
                            <div style={styles.buttonGroup}>
                                <button className="btn btn-danger btn-sm" style={styles.actionButton} onClick={handleDelete}>Delete</button>
                                <button className="btn btn-success btn-sm" style={styles.actionButton} onClick={handleApply}>Apply</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    cardContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '2%',

    },
    cardComponent: {
        width:'100%',
        borderRadius: "15px",
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
    salaryStyle: {
        marginLeft: '10px',
    },
    truncated: {
        textOverflow: 'clip',
        whiteSpace: 'nowrap',
    },

    // Expanded description
    expanded: {
        overflow:'hidden',
        whiteSpace:'normal',
    },
};

export default Card;