import { BrowserRouter as Router, Routes , Route} from 'react-router-dom'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import JobPost from './pages/JobPost'
import HomePage from './pages/HomePage'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import FetchJobList from './pages/FetchJobList'
import JobDetails from './pages/JobDetails'

function App() {


  return (

    <>
    <Router>
      <Routes>
        <Route  path='/'  element ={<HomePage/>}    />
        <Route path='/register' element = {<Register/>}     />
        <Route path='/login' element = {<Login/>}     />
        <Route  path ="/job-create"  element={<JobPost/>}      />
        <Route  path='/profile'  element = {<Profile/>}  />
      </Routes>
    </Router>
      
    </>
  )
}

export default App
