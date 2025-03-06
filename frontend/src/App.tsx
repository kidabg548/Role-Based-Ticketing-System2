import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/signUp";
import { useAppContext } from "./contexts/AppContext";
import Home from "./pages/Home";
import CreateTicketForm from "./pages/createTicket";
import TicketsPage from "./pages/Tickets";
import Layout from "./components/layout";

const App: React.FC = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/signup" element={<Layout><Signup /></Layout>} />

        {isLoggedIn && (
          <>
            <Route path="/create/ticket" element={ <Layout><CreateTicketForm /> </Layout>} />
            <Route path="/tickets" element={<Layout><TicketsPage /></Layout>} />
            
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
