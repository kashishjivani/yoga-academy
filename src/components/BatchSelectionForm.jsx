import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";
import { getBatches, postDetails } from "../apiRoutes";

const BatchSelectionForm = () => {
  const location = useLocation();
  const [selectedBatch, setSelectedBatch] = useState(0);  // State for selected batch to send to the API
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [batchResult, setBatchResult] = useState([]);
  const feeAmount = "₹ 500/-";           // hardcoded values for payment
  const userID = location.state;

  useEffect(() => {                        // Fetching batch details from API
    const fetchBatches = async () => {
      const batches = await getBatches();
      setBatchResult(batches);
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
    const { message } = response;
    alert(message);
    setIsModalOpen(false);
  };

  // Form for batch and payment details
  // Has modal for confirmation of payment
  
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
              <option key={batch.batchId} value={batch.batchId}>
                {" "}
                {`${batch.startTime?.slice(11, 16)} - ${batch.endTime?.slice(
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
