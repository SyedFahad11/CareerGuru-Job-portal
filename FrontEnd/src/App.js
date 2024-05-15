import { Route, Routes } from 'react-router-dom';
import './App.css'
import SignIn from "./components/landingPages/SignIn";
import Landing from "./components/landingPages/Home";
import Register from "./components/landingPages/Register";

import User from "./components/userPages/User"
import ProfileUser from "./components/userPages/Profile";
import RecJobs from "./components/userPages/RecJobs"
import SavedJobs from "./components/userPages/SavedJobs"
import AppliedJobs from "./components/userPages/AppliedJobs";

import Recruiter from "./components/recruiterPages/RecruiterLanding"
import AddJob from "./components/recruiterPages/AddJobs";
import ProfileRecruiter from "./components/recruiterPages/Profile";
import MyJobs from "./components/recruiterPages/MyJobs";
import Applications from "./components/recruiterPages/Applications";

function App() {

   return (
    <div>
      <Routes>
        {/* <Route path='/' element={<User />}/> */}

          <Route path='/' element={<Landing />} />
          <Route path='signin' element={<SignIn />} />
          <Route path='register' element={<Register />} />

          <Route path='user' element={<User />} />
          <Route path='user/profile' element={<ProfileUser />} />
          <Route path='user/RecJobs' element={<RecJobs/>} />
          <Route path='user/SavedJobs' element={<SavedJobs/>} />
          <Route path='user/AppliedJobs' element={<AppliedJobs/>} />

          <Route path='recruiter' element={<Recruiter/>} />
          <Route path='recruiter/addJobs' element={<AddJob/>} />
          <Route path='recruiter/profile' element={<ProfileRecruiter/>} />
          <Route path='recruiter/myJobs' element={<MyJobs/>} />
          <Route path='recruiter/applications/:jobId' element={<Applications/>} />
          <Route path='recruiter/myEmployees' element={<MyJobs/>} />

      </Routes>
    </div>
  );
}



export default App;

