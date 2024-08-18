import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MoviePage from "./components/MoviePage";
import AddGenres from "./components/AddGenres";
import AddMovies from "./components/AddMovies";
import EditMovie from "./components/EditMovie";

function App() {
  return (
    <Router>
      <Header />
      <div className="min-h-screen flex flex-col">
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
      </div>
      <Footer />
    </Router>
  );
}

export default App;
