import { BrowserRouter as Router, Routes , Route} from 'react-router-dom'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import JobPost from './pages/JobPost'

function App() {


  return (

    <>
    <Router>
      <Routes>
        <Route path='/register' element = {<Register/>}     />
        <Route path='/login' element = {<Login/>}     />
        <Route  path ="/job-create"  element={<JobPost/>}      />
      </Routes>
    </Router>
      
    </>
  )
}

export default App
