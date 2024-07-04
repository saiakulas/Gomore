
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserForm from './components/UserForm';
import SecondPage from './components/SecondPage.tsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserForm />} />
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
