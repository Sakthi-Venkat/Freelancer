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
    <div className="form">
    <h1>Register</h1>
    {error && <p className="p">{error}</p>}
    {success && <p className="p">{success}</p>}

    <form onSubmit={handleSubmit}>
      <div className="inputForm">
        <input
          className="input"
          type="text"
          placeholder="Name"
          value={formdata.name}
          onChange={(e) =>
            setFormData({ ...formdata, name: e.target.value })
          }
          required
        />
      </div>

      <div className="inputForm">
        <input
          className="input"
          type="email"
          placeholder="Email"
          value={formdata.email}
          onChange={(e) =>
            setFormData({ ...formdata, email: e.target.value })
          }
          required
        />
      </div>

      <div className="inputForm">
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={formdata.password}
          onChange={(e) =>
            setFormData({ ...formdata, password: e.target.value })
          }
          required
        />
      </div>

      <div className="inputForm">
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
      </div>

      <button type="submit" className="button-submit">
        Register
      </button>
    </form>

    <p className="p">
      Already have an account? <a href="/login">Login</a>
    </p>
  </div>
);
};

export default Register