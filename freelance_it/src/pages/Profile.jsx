import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Profile.css'
const Profile = () => {
    const[profile ,setProfile] = useState(null);
    const[loading,setLoading] = useState(true);
    const[error , setError] = useState(null);

    useEffect(() =>{
        const fetchProfile = async() =>{
            try { 
              const token = localStorage.getItem('token');

               if(!token) {
                setError('You are not logged in');
               }

                const response = await axios.get('http://localhost:5000/api/profile',{
                  headers: {
                    'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true,
                    
                });

                setProfile(response.data.profile)
                
            } catch (error) {
                 setError(error.message);

            } finally{
                setLoading(false);
            }

        }

        fetchProfile();
    },[] )

      if(loading) {
        return <div>Loading...</div>;
      }

      if(error) {
        return <div>Error: {error}</div>;
      }

      if(!profile) {
        return <div>No profile found!</div>;
      }

  return (
    <div className="profile-page">
    {/* Background Images */}
    <img src="/imagef6.png" alt="Top Left" className="bg-image-top-left" />
    <img src="/imagef7.png" alt="Bottom Right" className="bg-image-bottom-right" />

    <div className="profile-containerrr">
        <h1 className="profile-title">Profile</h1>
        <img src={profile.image} alt="Profile" className="profile-image" />

        <div className="profile-grid">
            {/* First Row: Name & Email */}
            <div className="grid-row">
                <p className="grid-item"><strong>Name:</strong><br /><br/>{profile.name}</p>
                <p className="grid-item"><strong>Email:</strong><br /><br/>{profile.email}</p>
            </div>

            {/* Second Row: Bio */}
            {profile.profile?.bio && (
                <div className="grid-row full-width">
                    <p className="grid-item"><strong>Bio:</strong><br /><br/>{profile.profile.bio}</p>
                </div>
            )}

            {/* Third Row: Skills */}
            {profile.profile?.skills && (
                <div className="grid-row full-width">
                    <p className="grid-item"><strong>Skills:</strong><br /><br/>{profile.profile.skills.join(", ")}</p>
                </div>
            )}

            {/* Fourth Row: Github & Portfolio */}
            <div className="grid-row">
                {profile.profile?.githubLinks && (
                    <p className="grid-item"><strong>Github:</strong><br /><br/>{profile.profile.githubLinks.join(", ")}</p>
                )}
                {profile.profile?.portfolioLinks && (
                    <p className="grid-item"><strong>Portfolio:</strong><br /><br/>{profile.profile.portfolioLinks.join(", ")}</p>
                )}
            </div>
        </div>

        <a href="/editProfile" className="btn btn-full margin-right-sm">Edit Profile</a>
    </div>
</div>


  )
}

export default Profile