import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Profile = () => {
    const[profile ,setProfile] = useState(null);
    const[loading,setLoading] = useState(true);
    const[error , setError] = useState(null);

    useEffect(() =>{
        const fetchProfile = async() =>{
            try { 
                const response = await axios.get('http://localhost:5000/api/profile');

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
        return <div>No profile found</div>;
      }

  return (
    <div>
              <h1>Profile</h1>
              <p>
                <strong>Name:</strong> {profile.name}
                </p>

                <p>
                <strong>Email:</strong> {profile.email}
                </p>

                {profile.profile && (
                    <>
                       
                       <p> <strong>Bio :</strong> {profile.profile.bio} </p>
         
                       
                    </>
                )}

    </div>
  )
}

export default Profile