import { Route, Routes } from 'react-router-dom';

import Landing from './Components/Landing/Landing';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Nav from './Components/Common/Nav/Nav';
import Notification from './Components/Common/Notification';
import Projects from './Components/Projects/Projects';
import UserGuard from './Guards/UserGuard';
import GuestGuard from './Guards/GuestGuard';
import Create from './Components/Create/Create';
import Details from './Components/Details/Details';
import ProfilePhoto from './Components/ProfilePhoto/ProfilePhoto';
import PasswordChange from './Components/PasswordChange/PasswordChange';

function App() {
  return (
    <>
      <div className="no-scroll">
        <Nav />
      </div>

      <Notification />

      <Routes>
        <Route element={<UserGuard />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<GuestGuard />}>
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<Details />} />
          <Route path="/create" element={<Create />} />
          <Route path="/photo" element={<ProfilePhoto />} />
          <Route path="/password" element={<PasswordChange />} />
        </Route>
        {/* error route */}
        <Route path="*" element={<Landing />} />
      </Routes>
    </>
  );
}

export default App;
