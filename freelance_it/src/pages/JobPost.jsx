import React, { useState } from 'react'
import axios from 'axios'

const JobPost = () => {
        const [jobTitle , setJobTitle] = useState('')
        const [jobDescription , setJobDescription] = useState('')
        const [jobBudget , setJobBudget] = useState('')
        const [category , setCategory] = useState('')
        const [tags , setTags] = useState('')

        const [error , setError] = useState('')
        const [sucess , setSucess] = useState('')

         
          const handleSubmit = async (e) =>{
            e.preventDefault()
             try {
                const token = localStorage.getItem('token')
                

                      

                 if(!token){
                    setError('You are not logged in')
                    return; 
                 }

                const res = await axios.post('http://localhost:5000/api/job-create',
                    {
                        title: jobTitle,
                        description: jobDescription,
                        budget: jobBudget,
                        category: category,
                        tags: tags
                    },{
                        headers : {
                            Authorization : `Bearer ${token}`
                        },
                        withCredentials: true
                    }, 
                   
                )

                if(res.data.success) {
                    setSucess(res.data.message)
                    setJobTitle('')
                    setJobDescription('')
                    setJobBudget('')
                    setCategory('')
                    setTags('')
                } else{
                    setError(" Something went wrong")
                }
                
             } catch (error) {
                    setError(error.message || "Something went wrong")

             }
          }
         
  return (
    <div>
        <h1>Job Creation</h1>

        {error && <p>{error}</p>}
        {sucess && <p>{sucess}</p>}
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Job Title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
            />

            <input 
                type='text'
                value = {jobDescription}
                placeholder="Job Description"
                onChange={(e) => setJobDescription(e.target.value)}
            />

            <input
                type="number"
                placeholder="Job Budget"
                value={jobBudget}
                onChange={(e) => setJobBudget(e.target.value)}
            />

            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />

            <input
                type="text"
                placeholder="Tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
            />

            <button type="submit">Create Job</button>
        </form>
    </div>
  )
}

export default JobPost