import React, { useState, useEffect } from "react";
import axios from "axios";

function AddMovies() {
  const [title, setTitle] = useState(""); // State for the movie Title
  const [genreId, setGenreId] = useState(""); // State for the selected genre ID
  const [numberInStock, setNumberInStock] = useState(""); // State for the movie Number In Stock
  const [dailyRentalRate, setdailyRentalRate] = useState(""); // State for the movie Daily Rental Rate
  const [genres, setGenres] = useState([]); // State to store the list of genres
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch genres when the component loads
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get("http://localhost:3900/api/genres");
        setGenres(response.data); // Set the genres in state
      } catch (error) {
        setError("Failed to load genres");
      }
    };

    fetchGenres();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      setError("Movie title is required");
      return;
    }
    if (!genreId) {
      setError("Movie Genre is required");
      return;
    }
    if (!numberInStock) {
      setError("Movie Number In Stock is required");
      return;
    }
    if (!dailyRentalRate) {
      setError("Movie Daily Rental Rate is required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3900/api/movies", {
        title,
        genreId,
        numberInStock,
        dailyRentalRate,
      });

      setSuccessMessage("Movie added successfully!");
      setError("");
      setTitle("");
      setGenreId("");
      setNumberInStock("");
      setdailyRentalRate("");
    } catch (error) {
      setError(
        error.response?.data || "An error occurred while adding the movie"
      );
    }
  };

  return (
    <div className="bg-slate-200 p-6 rounded-lg shadow-md w-96 mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Add New Movie</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {successMessage && (
        <p className="text-green-500 text-center mb-4">{successMessage}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Movie Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded w-full"
            placeholder="Enter movie title"
          />

          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="genreId"
          >
            Movie Genre
          </label>
          <select
            id="genreId"
            value={genreId}
            onChange={(e) => setGenreId(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded w-full"
          >
            <option value="">Select Genre</option>
            {genres.map((genre) => (
              <option key={genre._id} value={genre._id}>
                {genre.name}
              </option>
            ))}
          </select>

          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="numberInStock"
          >
            Movie Number In Stock
          </label>
          <input
            type="number"
            id="numberInStock"
            value={numberInStock}
            onChange={(e) => setNumberInStock(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded w-full"
            placeholder="Enter movie number In Stock"
          />

          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="dailyRentalRate"
          >
            Movie Daily Rental Rate
          </label>
          <input
            type="number"
            id="dailyRentalRate"
            value={dailyRentalRate}
            onChange={(e) => setdailyRentalRate(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded w-full"
            placeholder="Enter Movie Daily Rental Rate"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
          >
            Add Movie
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddMovies;
