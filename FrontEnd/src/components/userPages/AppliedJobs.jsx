import React,{useEffect,useState} from "react";
import Navbar from "./Navbar";
import Card from "./Cards";


function AppliedJobs() {
    const [jobData,setJob]=useState([]);
    const token=localStorage.getItem('token')

    const getInfo=async()=>{
        const response= await fetch("/api/seek/appliedJobs",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token

            }
        })
        const json= await response.json()
        setJob(json)

    }
    //getInfo()
    useEffect(()=>{
        getInfo()
    },[])


    function AddEntries(props){

        return <Card
            title={props.title}
            Salary= {props.salary}
            Recruiter={props.postedBy}
            WorkingHours={props.workingHours}
            postedDate={props.date}
            Info={props.description}
            _id={props._id}
            page="save"
        />
    }


    return (
        <div>
            <Navbar/>
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
export default AppliedJobs;