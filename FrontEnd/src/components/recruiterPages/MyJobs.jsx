import React,{useEffect,useState} from "react";
import Navbar from "./Bootstrap/Navbar";
import Card from "./Bootstrap/JobCard";


function RecJobs() {
    const [jobData,setJob]=useState([]);
    const token=localStorage.getItem('token')
    const getInfo=async()=>{
        const response= await fetch("/api/rec/myPostedJobs",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':token

            }
        })
        const json= await response.json()
        console.log(json);
        setJob(json)

    }
    //getInfo()
    useEffect(()=>{
        getInfo()
    },[])


    function AddEntries(props){

        return <Card
            Title={props.title}
            Salary= {props.salary}
            PostedDate={props.date}
            Info={props.description}
            Contract={props.contractType}
            Category={props.category}
            Location={props.location}
            _id={props._id}
            />
    }


    return (
        <div>
            <Navbar/>
            {jobData.length ===0 ? <h4>No Applications</h4>:
                <div >{jobData.map(AddEntries)}</div>
            }
        </div>



    );
}
export default RecJobs;