import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditMovie() {
  const { id } = useParams(); // Get the movie ID from the URL
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [genreId, setGenreId] = useState("");
  const [numberInStock, setNumberInStock] = useState("");
  const [dailyRentalRate, setDailyRentalRate] = useState("");
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieResponse = await axios.get(
          `http://localhost:3900/api/movies/${id}`
        );
        const { title, genre, numberInStock, dailyRentalRate } =
          movieResponse.data;
        setTitle(title);
        setGenreId(genre._id);
        setNumberInStock(numberInStock);
        setDailyRentalRate(dailyRentalRate);
      } catch (error) {
        setError("Failed to load movie details");
      }
    };

    const fetchGenres = async () => {
      try {
        const response = await axios.get("http://localhost:3900/api/genres");
        setGenres(response.data);
      } catch (error) {
        setError("Failed to load genres");
      }
    };

    fetchMovie();
    fetchGenres();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !genreId || !numberInStock || !dailyRentalRate) {
      setError("All fields are required");
      return;
    }

    try {
      await axios.put(`http://localhost:3900/api/movies/${id}`, {
        title,
        genreId,
        numberInStock,
        dailyRentalRate,
      });

      setSuccessMessage("Movie updated successfully!");
      navigate("/"); // Navigate back to the movie list
    } catch (error) {
      setError(
        error.response?.data || "An error occurred while updating the movie"
      );
    }
  };

  return (
    <div className="bg-slate-200 p-6 rounded-lg shadow-md w-96 mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Edit Movie</h2>
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
            placeholder="Enter movie number in stock"
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
            onChange={(e) => setDailyRentalRate(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded w-full"
            placeholder="Enter movie daily rental rate"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            Update Movie
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditMovie;
