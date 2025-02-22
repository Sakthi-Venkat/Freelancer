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

    <div className="register-container">
    <div className="form-container">
      <h1 className="heading">Login</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <input
          type="password"
          className="input"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />

        <button type="submit" className="login-button">Login</button>
      </form>
      <p className="agreement">
        Create a new account? <a href="/register">Sign In</a>
      </p>
    </div>

    <div className="image-container">
      <img src="/imagef8.png" alt="Login Illustration" />
    </div>
  </div>
);
};

export default Login