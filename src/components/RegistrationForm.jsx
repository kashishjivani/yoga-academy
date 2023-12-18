import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const RegistrationForm = ({ onRegistrationSubmit }) => {
  const navigate = useNavigate();
  const userRoute = "http://localhost:3001/api/user";
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    contactNo: "",
    email: "",
  });

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    if (e.target.name === "contactNo" && e.target.value.length < 10) {
      alert("Phone number must be at least 10 characters long");
    }
  };

  const handleRegistrationSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(userRoute, userData);
      console.log("Data sent successfully", response.data);
      alert(response.data.message);
      onRegistrationSubmit(userData);
      navigate("/batch", { state: response.data.userID });
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <form
        onSubmit={handleRegistrationSubmit}
        className="w-96 bg-white p-8 border rounded-md shadow-md"
      >
        <label className="block mb-2">
          First Name
          <input
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={handleInputChange}
            required
            className="form-input mt-1 block w-full border p-2"
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleInputChange}
            className="form-input mt-1 block w-full border p-2"
          />
        </label>
        <label className="block mb-2">
          Age
          <input
            type="number"
            min={18}
            max={65}
            name="age"
            value={userData.age}
            onChange={handleInputChange}
            className="form-input mt-1 block w-full border p-2"
            required
          />
        </label>
        <label className="block mb-2">
          Contact Number
          <input
            type="tel"
            name="contactNo"
            value={userData.contactNo}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className="form-input mt-1 block w-full border p-2"
            required
          />
        </label>
        <label className="block mb-2">
          Email
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            className="form-input mt-1 block w-full border p-2"
            required
          />
        </label>
        <div className="flex flex-col items-center justify-center">
          <button
            type="sumbit"
            className="bg-green-500 text-white rounded-md p-2 mt-2 w-40 mb-2"
          >
            Register
          </button>
          <Link to="/batch">
            <h3 className="font-bold text-blue-500">
              {" "}
              Already Registered? Enroll now!{" "}
            </h3>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;