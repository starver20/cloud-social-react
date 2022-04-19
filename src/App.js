import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import RequiresAuth from './components/auth/RequiresAuth';

import { ToastContainer, toast } from 'react-toastify';

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
      </Routes>
      <ToastContainer
        autoClose={3000}
        draggablePercent={50}
        style={{ fontSize: '1.5rem' }}
        position={toast.POSITION.BOTTOM_RIGHT}
      />
    </div>
  );
}

export default App;
