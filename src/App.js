import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import RequiresAuth from './components/auth/RequiresAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Profile from './pages/profile/Profile';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <RequiresAuth>
              <Dashboard />
            </RequiresAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/p/:userId"
          element={
            <RequiresAuth>
              <Profile />
            </RequiresAuth>
          }
        />
      </Routes>
      <ToastContainer
        autoClose={3000}
        draggablePercent={50}
        toastClassName="dark-toast"
        toastStyle={{ backgroundColor: `var(--card-background-color)` }}
        style={{
          fontSize: '1.5rem',
        }}
        position={toast.POSITION.BOTTOM_RIGHT}
      />
    </div>
  );
}

export default App;
