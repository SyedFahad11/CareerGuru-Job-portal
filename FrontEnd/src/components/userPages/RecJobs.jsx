import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Card from "./Cards";

function RecJobs() {
    const [jobData, setJob] = useState([]);

    const getInfo = async () => {
        const response = await fetch("/api/jobs/availableJobs", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const json = await response.json();
        console.log(json);
        setJob(json);
    };

    useEffect(() => {
        getInfo();
    }, []);

    function AddEntries(props) {
        return (
            <div className="col-md-12 ">
                <Card
                    title={props.title}
                    Salary={props.salary}
                    Recruiter={props.postedBy}
                    WorkingHours={props.workingHours}
                    postedDate={props.date}
                    Info={props.description}
                    _id={props._id}
                    delete="false"
                />
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="row">
                <div  style={styles.box}>

                </div>
                {jobData.map(AddEntries)}
            </div>
        </div>
    );
}
const styles={
    box:{
        width:'40px',
        height:'100px',
        backgroundColor:'white'
    }
}

export default RecJobs;
