import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './EditProfile.css'
const EditProfile = () => {
    const [formData , setFormData] = useState({
        _id : "",
        name : "",
        email : "",
        profile : {
            bio : "",
            skills : "",
            portfolioLinks : "",
            GithubLinks : "",
        }

    });

    const navigate = useNavigate();

    const [loading , setLoading] = useState(true);
    const [error , setError] = useState("");
    
     
       useEffect( () => {
               const fetchProfile = async() =>{
                try {

                     const token = localStorage.getItem('token');
                      
                     if(!token) {
                        setError("Please login first");
                     }



                    const res = await axios.get('http://localhost:5000/api/profile' ,
                        {
                            headers : {
                                'Authorization' : `Bearer ${token}`
                        },
                        withCredentials : true

                             
                        })

                        const profileData = res.data.profile;

                        setFormData({
                            _id : profileData._id ,
                            name : profileData.name,
                            email : profileData.email,
                             profile :{
                                bio : profileData.profile?.bio || "" ,

                                skills : profileData.profile?.skills ?
                                profileData.profile?.skills.join(', ') : "",

                                portfolioLinks : profileData.profile?.portfolioLinks 
                                ? profileData.profile?.portfolioLinks.join(', ') : "",

                                GithubLinks : profileData.profile?.GithubLinks ?
                                profileData.profile?.GithubLinks.join(', ') : "",
                             }

                        });

                    
                } catch (error) {
                    setError(error.message);
                    
                } finally{
                    setLoading(false);
                }
               }

               fetchProfile();
       },[] );


    const handleChange = (e) =>{

        const {name , value} = e.target;

        if(['bio', 'skills' , 'portfolioLinks' , 'GithubLinks'].includes(name)){

            setFormData( (prev) =>({
                ...prev ,
                profile :{
                    ...prev.profile,
                    [name] : value 
                }
            }) );
        } else{
            setFormData( (prev) =>({
                ...prev ,
                [name] : value
            }))
        }

    }
    const handleSubmit = async (e) =>{
        e.preventDefault();

        try {
             const token = localStorage.getItem('token');

             if(!token) {
                setError("Please login first");
             }

             const updatedProfile = {
                name : formData.name,

                email : formData.email,

                profile : {
                    bio : formData.profile.bio,

                    skills : formData.profile.skills
                    .split(",")
                    .map( (s) =>s.trim()   )
                    .filter(Boolean),

                    portfolioLinks : formData.profile.portfolioLinks
                    .split(",")
                    .map( (s) =>s.trim()   )
                    .filter(Boolean),

                    GithubLinks : formData.profile.GithubLinks
                    .split(",")
                    .map( (s) =>s.trim()   )
                    .filter(Boolean),

                }

             };


             await axios.put('http://localhost:5000/api/profile' , updatedProfile , {
            headers : {
                'Authorization' : `Bearer ${token}`
            },
            withCredentials : true
        } 
        )
         navigate('/profile');

        } catch (error) {
            
        }
    }

 { error && <p>{error}</p>}
 { loading && <p>Loading...</p>}

  return (
    <div className="profile-page">
  {/* Background Images */}
  <img src="/imagef6.png" alt="Top Left" className="bg-image-top-left" />
  <img src="/imagef7.png" alt="Bottom Right" className="bg-image-bottom-right" />

  <div className="profile-container">
    <h1>Edit Profile</h1>

    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="input-box"
        />
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="input-box"
        />
      </div>

      <div className="form-group">
        <label>Bio:</label>
        <textarea
          name="bio"
          value={formData.profile.bio}
          onChange={handleChange}
          className="input-box"
        />
      </div>

      <div className="form-group">
        <label>Skills:</label>
        <input
          type="text"
          name="skills"
          value={formData.profile.skills}
          onChange={handleChange}
          className="input-box"
        />
      </div>

      <div className="form-group">
        <label>Portfolio Links:</label>
        <input
          type="text"
          name="portfolioLinks"
          value={formData.profile.portfolioLinks}
          onChange={handleChange}
          className="input-box"
        />
      </div>

      <div className="form-group">
        <label>Github Links:</label>
        <input
          type="text"
          name="GithubLinks"
          value={formData.profile.GithubLinks}
          onChange={handleChange}
          className="input-box"
        />
      </div>

      <button type="submit" className="btn">
        Save Changes
      </button>
    </form>
  </div>
</div>

  )
}

export default EditProfile