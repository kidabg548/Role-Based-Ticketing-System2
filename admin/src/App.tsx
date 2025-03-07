import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Tickets from './pages/tickets';
import AdminDashboard from './pages/dashboard';
import Layout from './components/layout';
import Login from './pages/Login';
// import Signup from './pages/signUp';
import { useAppContext } from './contexts/AppContext';

function App() {
  const { isLoggedIn } = useAppContext();
  console.log(isLoggedIn)

  return (
    <Router>
      <Layout>
        {isLoggedIn ? (
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="*" element={<Navigate to="/" />} /> 
          </Routes>
        ) : (
          <Routes>
            <Route path="/login" element={<Login/>} />
            {/* <Route path="/signup" element={<Signup/>} /> */}
            <Route path="*" element={<Navigate to="/login" />} /> 
          </Routes>
        )}
      </Layout>
    </Router>
  );
}

export default App;