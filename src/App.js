import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import BatchSelectionForm from "./components/BatchSelectionForm";

function App() {

  // Components for registration and batch selection on different routes
  
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/batch" element={<BatchSelectionForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
