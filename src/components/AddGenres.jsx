import React, { useState } from "react";
import axios from "axios";

function AddGenres() {
  const [name, setName] = useState(""); // State for the genre name
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setError("Genre name is required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3900/api/genres", {
        name,
      });

      setSuccessMessage("Genre added successfully!");
      setError("");
      setName("");
    } catch (error) {
      setError(
        error.response?.data || "An error occurred while adding the genre"
      );
    }
  };

  return (
    <div className="bg-slate-200 p-6 rounded-lg shadow-md w-96 mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Add New Genre</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {successMessage && (
        <p className="text-green-500 text-center mb-4">{successMessage}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Genre Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded w-full"
            placeholder="Enter genre name"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
          >
            Add Genre
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddGenres;
