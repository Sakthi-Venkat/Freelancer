import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const JobDetails = () => {
      const {id} = useParams();
     const navigate = useNavigate();
     const [jobs , setJobs] = useState([]);
     const [status , setStatus] = useState("");


     useEffect( () =>{
        axios.get(`http://localhost:5000/api/jobs/${id}`)
        .then ( (res) => {setJobs(res.data.job)
            setStatus(res.data.job.status)
        })
        .catch ( (err) => console.log(err))
     },[id]);


     const handleDelete = () =>{
        axios.delete(`http://localhost:5000/api/jobs/${id}`)
        .then(() =>navigate('/jobsList'))
        .catch((err) => console.log(err))
     };

      const handleUpdate = () =>{
         
      }



  return (
    <div>JobDetails</div>
  )
}

export default JobDetails