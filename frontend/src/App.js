import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Login from './components/login-registration-forms/Login';
import Registration from './components/login-registration-forms/Registration';
/*import Contact from './components/Contact';
import NotFound from './components/NotFound';*/
import AdminHome from './components/Home-Pages/Admin';
import OrganisationHome from './components/Home-Pages/Organisation';
import Stu_Profess from './components/Home-Pages/Stu_Profess';
import MongoDBTest from './components/MongoDBTest';
import StuProfessProfiles from './components/Profiles/StuProfessProfile';
import ShowSPProfile from './components/Profiles/ShowSPProfile';

function App() {
  return (
    <Router>
      <div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about"element={<About />}/>
          <Route path="/login-form" element={<Login />}/>
          <Route path="/registration-form" element={<Registration />}/>
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/Stu_ProfessHome" element={<Stu_Profess />} />
          <Route path="/OrganisationHome" element={<OrganisationHome />} />
          <Route path="/MongoDBTest" element={<MongoDBTest/>}/>
          <Route path="/Stu_ProfessHome/StuProfessProfile" element={<StuProfessProfiles/>}/>
          <Route path="/showSPProfiles/:profileEmail" element={<ShowSPProfile />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
