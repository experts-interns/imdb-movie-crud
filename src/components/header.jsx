import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="bg-slate-900 flex text-white p-7 items-center">
      <div className="w-1/2 text-4xl font-bold">Imdb Movie CRUD</div>
      <div className="w-1/2 text-[20px] font-semibold flex space-x-4 justify-end">
        <Link to="/">Home</Link> {/* This links to the root path */}
        <Link to="/movie">Movies</Link>
      </div>
    </div>
  );
}

export default Header;
