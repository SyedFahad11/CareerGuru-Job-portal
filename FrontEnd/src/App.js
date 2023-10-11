import Landing from "./components/landingPages/Home";
import './App.css'
import User from "./components/userPages/User"
import SignIn from "./components/landingPages/SignIn";
import { Route, Routes } from 'react-router-dom';
import Register from "./components/landingPages/Register";
import Profile from "./components/userPages/Profile";
import RecJobs from "./components/userPages/RecJobs"
import SavedJobs from "./components/userPages/SavedJobs"

function App() {
  
   return (
    <div>
      <Routes>
      
          <Route path='/' element={<Landing />} />
          <Route path='signin' element={<SignIn />} />
          <Route path='register' element={<Register />} />
          <Route path='user' element={<User />} />
          <Route path='user/profile' element={<Profile />} />
          <Route path='user/RecJobs' element={<RecJobs/>} />
          <Route path='user/SavJobs' element={<SavedJobs/>} />
        
      </Routes>
    </div>
  );
}



export default App;

