import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Card from "./Cards";
import { borderRadius } from "@mui/system";


function RecJobs() {
    const [jobData, setJob] = useState([]);
    const token=localStorage.getItem('token');

    const getInfo = async () => {
        const response = await fetch("/api/seek/availableJobs", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':token
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
            <div className="">
                <Card
                    title={props.title}
                    location={props.location}
                    Salary={props.salary}
                    Info={props.description}
                    contract={props.contractType}
                    companyName={props.companyName}
                    postedDate={props.date}
                    type={props.type}
                    _id={props._id}
                    page="rec"
                />
            </div>
        );
    }

    return (
        <div>
            <Navbar />


            <div className="row">
                <div className="col-md-4">
                    <div style={styles.box}></div>
                </div>
                <div className="col-md-6">
                    <div style={styles.cards}>
                        {jobData.map(AddEntries)}
                    </div>
                </div>
            </div>


        </div>
    );
}
const styles = {
    box: {
        marginTop: '20px',
        marginLeft: '20px',
        width: '400px',
        height: '1000px',
        backgroundColor: 'white',
        borderRadius: '15px',

    },
    cards: {
        margin: 'auto'
    }
}

export default RecJobs;
