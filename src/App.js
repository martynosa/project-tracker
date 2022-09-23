import { Route, Routes } from 'react-router-dom';
import Landing from './Components/Landing';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Nav from './Components/Common/Nav';
import Notification from './Components/Common/Notification';

function App() {
  return (
    <>
      <Nav />
      <Notification />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
