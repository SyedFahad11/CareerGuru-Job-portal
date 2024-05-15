import { useParams } from 'react-router-dom';
import React from 'react';
import Navbar from './Navbar';



function Applications() {
  const { jobId } = useParams();
  const token = localStorage.getItem('token')
  console.log(token);
  console.log(jobId);

    return <div>
            <Navbar/>

    </div>
}

export default Applications;