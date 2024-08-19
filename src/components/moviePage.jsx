import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaYoutube,
  FaSearch,
  FaPlus,
  FaSortUp,
  FaSortDown,
  FaFilm,
  FaGhost,
  FaHeart,
  FaRobot,
  FaSmileBeam,
  FaMagic,
  FaBaby,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function MoviePage() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "title",
    direction: "asc",
  });
  const [selectedGenre, setSelectedGenre] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieResponse = await axios.get(
          "http://localhost:3900/api/movies"
        );
        setMovies(movieResponse.data);

        const genreResponse = await axios.get(
          "http://localhost:3900/api/genres"
        );
        setGenres(genreResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
  };

  const handleDeleteGenre = async (genreId) => {
    try {
      // Delete the genre
      await axios.delete(`http://localhost:3900/api/genres/${genreId}`);
      setGenres(genres.filter((genre) => genre._id !== genreId));

      // Delete all movies of the deleted genre
      const moviesToDelete = movies.filter(
        (movie) => movie.genre._id === genreId
      );
      await Promise.all(
        moviesToDelete.map((movie) =>
          axios.delete(`http://localhost:3900/api/movies/${movie._id}`)
        )
      );
      setMovies(movies.filter((movie) => movie.genre._id !== genreId));

      if (selectedGenre && selectedGenre._id === genreId) {
        setSelectedGenre("");
      }
    } catch (error) {
      console.error("Error deleting genre or movies:", error);
    }
  };

  const sortedMovies = [...movies].sort((a, b) => {
    const keyA = sortConfig.key.includes(".")
      ? sortConfig.key.split(".").reduce((o, i) => o[i], a)
      : a[sortConfig.key];
    const keyB = sortConfig.key.includes(".")
      ? sortConfig.key.split(".").reduce((o, i) => o[i], b)
      : b[sortConfig.key];

    return sortConfig.direction === "asc"
      ? keyA > keyB
        ? 1
        : -1
      : keyA < keyB
      ? 1
      : -1;
  });

  const filteredMovies = sortedMovies.filter((movie) => {
    const matchesSearchTerm = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesGenre = !selectedGenre || movie.genre.name === selectedGenre;
    return matchesSearchTerm && matchesGenre;
  });

  const renderSortIcon = (key) => {
    const isSelected = sortConfig.key === key;
    const isAsc = sortConfig.direction === "asc";

    return (
      <span className="ml-2 inline-block">
        {isSelected && isAsc ? (
          <FaSortUp
            className={`font-bold ${
              isSelected ? "text-black" : "text-gray-400"
            }`}
          />
        ) : (
          <FaSortDown
            className={`font-bold ${
              isSelected ? "text-black" : "text-gray-400"
            }`}
          />
        )}
      </span>
    );
  };

  const getGenreIcon = (genreName) => {
    switch (genreName.toLowerCase()) {
      case "action":
        return <FaFilm className="mr-2" />;
      case "comedy":
        return <FaSmileBeam className="mr-2" />;
      case "romance":
        return <FaHeart className="mr-2" />;
      case "child":
        return <FaBaby className="mr-2" />;
      case "sci-fi":
        return <FaRobot className="mr-2" />;
      case "horror":
        return <FaGhost className="mr-2" />;
      case "fantasy":
        return <FaMagic className="mr-2" />;
      default:
        return <FaFilm className="mr-2" />;
    }
  };

  // Get the count of movies per genre
  const getMoviesCountForGenre = (genreId) => {
    return movies.filter((movie) => movie.genre._id === genreId).length;
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/5 bg-slate-700 p-4">
        <div className="flex w-2/2 align-middle pt-5">
          <div className="w-1/2">
            <h3 className="text-white font-bold text-3xl pl-4">Genres</h3>
          </div>
          <div className="justify-end flex w-1/2 max-h-10">
            <button
              className="bg-blue-500 relative font-bold text-white w-20 text-end pr-3 text-xs rounded"
              onClick={() => navigate("/AddGenres")}
            >
              Add
              <FaPlus className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white" />
            </button>
          </div>
        </div>

        <ul className="pt-4 pl-4">
          <li
            className={`text-white text-lg py-2 cursor-pointer ${
              !selectedGenre ? "font-bold" : ""
            }`}
            onClick={() => handleGenreSelect("")}
          >
            All
          </li>
          {genres.length > 0 ? (
            genres.map((genre) => (
              <li
                key={genre._id}
                className={`text-white text-lg py-2 flex justify-between cursor-pointer ${
                  selectedGenre === genre.name ? "font-bold" : ""
                }`}
                onClick={() => handleGenreSelect(genre.name)}
              >
                <span className="flex items-center">
                  {getGenreIcon(genre.name)}
                  {genre.name}
                </span>
                <div className="flex items-center">
                  <span className="text-gray-400 mr-2">
                    {getMoviesCountForGenre(genre._id)} movies
                  </span>
                  <button
                    className="text-red-500 ml-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteGenre(genre._id);
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="text-white text-lg py-2">No genres available</li>
          )}
        </ul>
      </div>
      <div className="w-4/5 bg-slate-200 p-4 py-14">
        <div className="justify-end flex">
          <button
            className="bg-blue-500 text-end pr-3 relative font-bold text-white w-24 px-4 py-2 rounded"
            onClick={() => navigate("/AddMovies")}
          >
            Add
            <FaPlus className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white" />
          </button>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center justify-left w-2/3">
            <FaYoutube className="text-red-700 size-20 mr-2" />
            <div className="text-3xl font-bold">Movies List</div>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 px-4 py-2 rounded pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <table className="min-w-full bg-white">
          <thead>
            <tr className="text-xl">
              <th
                className="px-6 py-3 cursor-pointer text-left"
                onClick={() => handleSort("title")}
              >
                Title {renderSortIcon("title")}
              </th>
              <th
                className="px-6 py-3 cursor-pointer text-left"
                onClick={() => handleSort("genre.name")}
              >
                Genre {renderSortIcon("genre.name")}
              </th>
              <th
                className="px-6 py-3 cursor-pointer text-left"
                onClick={() => handleSort("numberInStock")}
              >
                Stock {renderSortIcon("numberInStock")}
              </th>
              <th
                className="px-6 py-3 cursor-pointer text-left"
                onClick={() => handleSort("dailyRentalRate")}
              >
                Rate {renderSortIcon("dailyRentalRate")}
              </th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <tr key={movie._id} className="text-xl">
                  <td className="px-6 py-4">{movie.title}</td>
                  <td className="px-6 py-4">{movie.genre.name}</td>
                  <td className="px-6 py-4">{movie.numberInStock}</td>
                  <td className="px-6 py-4">{movie.dailyRentalRate}</td>
                  <td className="px-6 py-4 flex items-center">
                    <button
                      className="text-blue-500 mr-2"
                      onClick={() => navigate(`/EditMovie/${movie._id}`)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500"
                      onClick={async () => {
                        await axios.delete(
                          `http://localhost:3900/api/movies/${movie._id}`
                        );
                        setMovies(movies.filter((m) => m._id !== movie._id));
                      }}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-4 text-center" colSpan="5">
                  No movies found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MoviePage;
