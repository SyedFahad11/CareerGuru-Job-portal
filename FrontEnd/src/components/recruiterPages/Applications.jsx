import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Card from './UserCard';
import { PiRowsPlusBottom } from 'react-icons/pi';



function Applications() {
  const { jobId } = useParams();
  const [jobData, setJob] = useState([]);
  const token = localStorage.getItem('token')
  const getInfo = async () => {
    const response = await fetch("/api/rec/applications", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
        'job_id': jobId
      }
    })
    const json = await response.json()
    console.log(json);
    setJob(json)

  }
  //getInfo()
  useEffect(() => {
    getInfo()
  }, [])


  function AddEntries(props) {

    return <Card
      ApplicationId={props._id}
      SeekerId={props.seekerId}
      Name={props.userName}
      Sop={props.sop}
      Status={props.status}
      Date={props.date}



    />
  }


  return <div>
    <Navbar />
    {jobData.length === 0 ? <h4>No Posted Jobs</h4> :
      <div>{jobData.map(AddEntries)}</div>
    }


  </div>
}

export default Applications;