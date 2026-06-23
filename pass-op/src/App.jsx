import { useState } from "react";
import Navbar from "./Components/Navbar";
import Manager from "./Components/Manager";
import Footer from "./Components/Footer";
import LoginModal from "./Components/LoginModal";
import SignupModal from "./Components/SignupModal";
import Home from "./Components/Home";
import Dashboard from "./Components/Dashboard";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        setShowLogin={setShowLogin}
        setShowSignup={setShowSignup}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setCurrentPage={setCurrentPage}
      />
      <main className="flex-grow">
        {currentPage === "home" && <Home />}
        {currentPage === "manager" && <Manager />}
        {currentPage === "dashboard" && <Dashboard />}
      </main>
      {showLogin && (
        <LoginModal
          closeModal={() => setShowLogin(false)}
          setIsLoggedIn={setIsLoggedIn}
          setCurrentPage={setCurrentPage}
        />
      )}

      {showSignup && (
        <SignupModal
          closeModal={() => setShowSignup(false)}
          setShowLogin={setShowLogin}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;