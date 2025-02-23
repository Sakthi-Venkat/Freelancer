import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const FetchJobList = () => {

    const [jobs ,setJobs] = useState([]);
    const [filter , setFilter] = useState("");
    const[sort ,setSort] = useState("budget");

     
    useEffect( () =>{
        axios.get(`http://Localhost:5000/api/jobs?filter=${filter}&sort=${sort}`)
        .then( (res) => setJobs(res.data.jobs))
        .catch( (err) => console.log(err))
    },[filter,sort]);
     

  return (
    <div>

            <h2>Job List</h2>

            <input
                type="text"
                placeholder='filter by category'
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
            <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
            >
                   <option  value="budget"  >Sort by Budget</option>
                   <option  value="createdAt" >Sort by Date</option>

            </select>


             <ul>
                {jobs.map( (job) => (
                    <li key={job._id} >
                        <Link to = {`/jobs/${job._id}`} >
                        {job.title} - ${job.budget} ({job.status})
                        </Link>
                    </li>

                )  )}
             </ul>
    </div>
  )
}

export default FetchJobList