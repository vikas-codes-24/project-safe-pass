import React from "react";

function Navbar({
  setShowLogin,
  setShowSignup,
  isLoggedIn,
  setIsLoggedIn,
  setCurrentPage,
}) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCurrentPage("home");
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <div
          onClick={() => setCurrentPage("home")}
          className="text-2xl font-bold cursor-pointer"
        >
          <span className="text-green-500">&lt;</span>
          <span className="text-white">safe</span>
          <span className="text-green-500">PASS/&gt;</span>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {!isLoggedIn ? (
            <>
              <button
                onClick={() => setShowLogin(true)}
                className="px-5 py-2 rounded-lg border border-green-500 text-green-400 hover:bg-green-500 hover:text-white transition"
              >
                Login
              </button>

              <button
                onClick={() => setShowSignup(true)}
                className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <span className="text-gray-300 text-sm hidden md:block">
                Welcome 👋
              </span>
              <button
                onClick={() => setCurrentPage("dashboard")}
                className="px-4 py-2 rounded-lg bg-slate-700"
              >
                Dashboard
              </button>

              <button
                onClick={() => setCurrentPage("manager")}
                className="px-4 py-2 rounded-lg bg-green-600"
              >
                Add Password
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500"
              >
                Logout
              </button>
            </>
          )}

          <a
            href="https://github.com/vikas-codes-24/project-safe-pass"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition"
          >
            <img
              className="invert w-5"
              src="icons/github.svg"
              alt="github"
            />
            <span className="text-sm font-medium">GitHub</span>
          </a>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;