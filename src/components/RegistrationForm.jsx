import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postUser } from "../apiRoutes";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({   // State for user details
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

  const handleRegistrationSubmit = async (e) => {  // Calling API for Posting user details
    e.preventDefault();
    const response = await postUser(userData);
    const { message, userID } = response;
    alert(message);
    navigate("/batch", { state: userID });  // After posting, navigating to the batch selection page with the newly generated user id 
  };

  // Form for filling user details
  
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
