import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import ConfirmationModal from "./ConfirmationModal";

const BatchSelectionForm = ({ onBatchSelectionSubmit }) => {
  const [selectedBatch, setSelectedBatch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [batchResult, setBatchResult] = useState([]);
  const generateBatchRoute = "http://localhost:3001/api/generateBatch";
  const feeAmount = "₹ 500/-";
  const location = useLocation();
  const userID = location.state;
  const detailsRoute = "http://localhost:3001/api/details";

  useEffect(() => {
    const fetchBatches = async () => {
      const response = await axios.get(generateBatchRoute);
      setBatchResult(response.data.results);
    };
    fetchBatches();
  }, []);

  const handleBatchSelectionSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = async () => {
    try {
      const response = await axios.post(detailsRoute, {
        userID,
        selectedBatch,
      });
      console.log("Data sent successfully", response.data);
      alert(response.data.message);
      onBatchSelectionSubmit(selectedBatch);
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex  flex-col items-center justify-center">
      <form
        onSubmit={handleBatchSelectionSubmit}
        className="max-w-md bg-white p-8 rounded-md shadow-md"
      >
        <label className="block mb-4">
          Select Your Batch
          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            required
            className="form-select mt-1 block w-full border p-2"
          >
            <option value="">Select Batch</option>
            {batchResult.map((batch) => (
              <option key={batch.BatchID} value={batch.BatchID}>
                {" "}
                {`${batch.StartTime.slice(11, 16)} - ${batch.EndTime.slice(
                  11,
                  16
                )}`}{" "}
              </option>
            ))}
          </select>
        </label>

        <label className="block mb-4">
          Fees
          <input
            type="text"
            value={feeAmount}
            readOnly
            className="form-input mt-1 block w-full border p-2 bg-gray-200"
          />
        </label>
        <div className="flex flex-col items-center justify-center">
          <button
            type="submit"
            className="bg-green-500 text-white rounded-mdp-2 w-full h-10 mb-2"
          >
            Pay
          </button>
          <Link to="/">
            <h3 className="font-bold text-blue-500">
              {" "}
              New here? Register now!
            </h3>
          </Link>
        </div>
      </form>
      {isModalOpen && (
        <ConfirmationModal onClose={handleCancel} onConfirm={handleConfirm} />
      )}
    </div>
  );
};

export default BatchSelectionForm;
