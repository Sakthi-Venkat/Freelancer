import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [formData , setFormData] = useState({
        email: '',
        password: ''
    })

    const[error , setError] = useState('')
    const[sucess , setSucess] = useState('')
    const navigate =useNavigate();

    const handleSubmit = async  (e) =>{
        e.preventDefault()
        setError('')
            
        try {
            const res = await axios.post('http://localhost:5000/api/login',formData)

            if(res.data.success){
                localStorage.setItem('token' , res.data.token)
                setSucess(res.data.message)
                navigate('/dashboard')

            } else{
                setError(res.data.message)
            }
            
        } catch (error) {
            setError( error.message || "Something went wrong")

            
        }


    }
  return (
    <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />

                <input 
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />

                <button type="submit" >Login</button>
            </form>

    </div>
  )
}

export default Login