import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserForm from './components/UserForm';
import SecondPage from './components/SecondPage.tsx';
import { CssBaseline } from '@mui/material'; // Import CssBaseline for global styles reset

const App = () => {
  return (
    <Router>
      <CssBaseline /> {/* Add CssBaseline for global styles reset */}
      <Routes>
        {/* Route for UserForm */}
        <Route path="/" element={<UserForm />} />

        {/* Route for SecondPage */}
        <Route
          path="/second"
          element={
            localStorage.getItem('userDetails') ? (
              <SecondPage />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
