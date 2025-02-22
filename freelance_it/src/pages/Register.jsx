import React, { useState } from 'react'
import axios from 'axios'
import './Register.css'
const Register = () => {
    const [formdata ,setFormData] = useState({
        name: '',
        email: '',
        password : '',
        role: 'freelancer'
    })

    const [error ,setError] = useState('')
    const [success ,setSuccess] = useState('')

    const handleSubmit = async (e) =>{
        e.preventDefault()

        setError('')
        setSuccess('')

        if(!formdata.name || !formdata.email || !formdata.password || !formdata.role){
            setError('All fields are required')
            return
        }

        try {
            const res  = await axios.post("http://localhost:5000/api/register", formdata)

            if(res.data.success){
                setSuccess("User registered successfully")
                setFormData({
                    name: '',
                    email: '',
                    password : '',
                    role: 'freelancer'
                })

            }
            
        } catch (error) {
            setError(error.response.data.message || "Something went wrong")
        }
    }

  return (
    <div className="register-container">
    <div className="form-container">
      <h1 className="heading">Register</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          placeholder="Name"
          value={formdata.name}
          onChange={(e) =>
            setFormData({ ...formdata, name: e.target.value })
          }
          required
        />
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={formdata.email}
          onChange={(e) =>
            setFormData({ ...formdata, email: e.target.value })
          }
          required
        />
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={formdata.password}
          onChange={(e) =>
            setFormData({ ...formdata, password: e.target.value })
          }
          required
        />
        <select
          className="input"
          value={formdata.role}
          onChange={(e) =>
            setFormData({ ...formdata, role: e.target.value })
          }
          required
        >
          <option value="freelancer">Freelancer</option>
          <option value="client">Client</option>
        </select>

        <button type="submit" className="login-button">
          Register
        </button>
      </form>

      <p className="agreement">
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>

    {/* 🔹 Image on the Right Side */}
    <div className="image-container">
      <img src="/imagef7.png" alt="Registration Illustration" />
    </div>
  </div>
);
};

export default Register