import { Route, Routes } from 'react-router-dom';
import Landing from './Components/Landing';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Nav from './Components/Common/Nav';
import Notification from './Components/Common/Notification';
import Projects from './Components/Projects';
import UserGuard from './Guards/UserGuard';
import GuestGuard from './Guards/GuesGuard';
import Profile from './Components/Profile/Profile';
import Create from './Components/Create/Create';

function App() {
  return (
    <>
      <Nav />
      <Notification />

      <Routes>
        <Route element={<UserGuard />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<GuestGuard />}>
          <Route path="/projects" element={<Projects />} />
          <Route path="/create" element={<Create />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<Landing />} />
      </Routes>
    </>
  );
}

export default App;
