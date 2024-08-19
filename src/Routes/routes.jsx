import React from "react";
import { Routes, Route } from "react-router-dom";
import MoviePage from "../components/MoviePage";
import AddGenres from "../components/AddGenres";
import AddMovies from "../components/AddMovies";
import EditMovie from "../components/EditMovie";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="flex-grow flex items-center justify-center">
            <h2 className="text-red-700 text-5xl font-bold text-center">
              IMDb Movie CRUD
            </h2>
          </div>
        }
      />
      <Route path="/movie" element={<MoviePage />} />
      <Route path="/AddGenres" element={<AddGenres />} />
      <Route path="/AddMovies" element={<AddMovies />} />
      <Route path="/EditMovie/:id" element={<EditMovie />} />{" "}
      {/* Added dynamic route */}
    </Routes>
  );
}

export default AppRoutes;
