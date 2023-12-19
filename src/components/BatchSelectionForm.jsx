import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import ConfirmationModal from "./ConfirmationModal";
import { getBatches, postDetails } from "../apiRoutes";

const BatchSelectionForm = () => {
  const location = useLocation();
  const [selectedBatch, setSelectedBatch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [batchResult, setBatchResult] = useState([]);
  const feeAmount = "₹ 500/-";
  const userID = location.state;

  useEffect(() => {
    const fetchBatches = async () => {
      const result = await getBatches();
      setBatchResult(result);
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
    const response = await postDetails({
      userID,
      selectedBatch,
    });
    console.log("Data sent successfully", response);
    alert(response.message);
    setIsModalOpen(false);
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
            {batchResult?.map((batch) => (
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
