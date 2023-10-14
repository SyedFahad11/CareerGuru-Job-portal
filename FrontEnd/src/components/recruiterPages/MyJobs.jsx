import React,{useEffect,useState} from "react";
import Navbar from "./Navbar";
import Card from "./Cards";


function RecJobs() {
    const [jobData,setJob]=useState([]);
    const token=localStorage.getItem('token')
    const getInfo=async()=>{
        const response= await fetch("/api/jobs/myPostedJobs",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':token

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
            Contact={props.contact}
            delete="false"
            />
    }


    return (
        <div>
            <Navbar/>
            <div>{jobData.map(AddEntries)}</div>
        </div>



    );
}
export default RecJobs;