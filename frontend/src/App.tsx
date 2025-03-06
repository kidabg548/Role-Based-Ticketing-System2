import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/signUp";
import { useAppContext } from "./contexts/AppContext";
import Home from "./pages/Home";
import CreateTicketForm from "./pages/createTicket";
import TicketsPage from "./pages/Tickets";

const App: React.FC = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {isLoggedIn && (
          <>
            <Route path="/create/ticket" element={<CreateTicketForm />} />
            <Route path="/tickets" element={<TicketsPage />} />


            
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
