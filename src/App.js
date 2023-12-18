import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import BatchSelectionForm from "./components/BatchSelectionForm";

function App() {
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [userDetails, setUserDeatils] = useState({});
  const [selectedBatch, setSelectedBatch] = useState("");


  const handleRegistrationSubmit = (data) => {
    setUserDeatils(data);
    setIsUserRegistered(true);
  };

  const handleBatchSelectionSubmit = (batch) => {
    setSelectedBatch(batch);
  };

  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<RegistrationForm onRegistrationSubmit={handleRegistrationSubmit} />} />
          <Route path="/batch" element={<BatchSelectionForm onBatchSelectionSubmit={handleBatchSelectionSubmit} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
