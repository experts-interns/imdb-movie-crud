import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./Routes/routes"; // Import the routes

function App() {
  return (
    <Router>
      <Header />
      <div className="min-h-screen flex flex-col">
        <AppRoutes /> {/* Use the imported routes */}
      </div>
      <Footer />
    </Router>
  );
}

export default App;
