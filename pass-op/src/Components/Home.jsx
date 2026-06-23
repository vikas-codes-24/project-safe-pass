function Home() {
    return (
        <div className="min-h-[calc(100vh-120px)] bg-gradient-to-b from-slate-50 to-green-50 flex flex-col justify-center items-center px-4">

            {/* Hero Section */}
            <h1 className="text-7xl md:text-8xl font-bold text-center">
                <span className="text-green-500">&lt;</span>
                SafePass
                <span className="text-green-500">/&gt;</span>
            </h1>

            <p className="text-xl md:text-2xl mt-6 text-gray-700 text-center">
                Securely store and manage all your passwords.
            </p>

            <p className="mt-3 text-gray-500 max-w-2xl text-center">
                Keep your credentials safe, generate strong passwords,
                and access them anytime from one secure place.
            </p>

            {/* Buttons */}
            <div className="flex gap-4 mt-8">
                <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition">
                    Get Started
                </button>

                <button className="border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white px-6 py-3 rounded-xl font-semibold transition">
                    Learn More
                </button>
            </div>

            {/* Feature Cards */}
            <div className="mt-16 grid md:grid-cols-3 gap-8">

                <div className="bg-white shadow-lg p-8 rounded-2xl hover:scale-105 transition duration-300">
                    <div className="text-4xl mb-3">🔒</div>
                    <h3 className="font-bold text-xl">Secure Storage</h3>
                    <p className="text-gray-600 mt-2">
                        Store all your passwords safely in one place.
                    </p>
                </div>

                <div className="bg-white shadow-lg p-8 rounded-2xl hover:scale-105 transition duration-300">
                    <div className="text-4xl mb-3">⚡</div>
                    <h3 className="font-bold text-xl">Fast Access</h3>
                    <p className="text-gray-600 mt-2">
                        Access your passwords instantly whenever needed.
                    </p>
                </div>

                <div className="bg-white shadow-lg p-8 rounded-2xl hover:scale-105 transition duration-300">
                    <div className="text-4xl mb-3">☁️</div>
                    <h3 className="font-bold text-xl">Cloud Backup</h3>
                    <p className="text-gray-600 mt-2">
                        Never lose your credentials again.
                    </p>
                </div>

            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-10 mt-16 text-center">

                <div>
                    <h2 className="text-3xl font-bold text-green-600">
                        10K+
                    </h2>
                    <p className="text-gray-600">
                        Passwords Protected
                    </p>
                </div>

                <div>
                    <h2 className="text-3xl font-bold text-green-600">
                        99.9%
                    </h2>
                    <p className="text-gray-600">
                        Reliability
                    </p>
                </div>

                <div>
                    <h2 className="text-3xl font-bold text-green-600">
                        256-bit
                    </h2>
                    <p className="text-gray-600">
                        Security
                    </p>
                </div>

            </div>

        </div>
    );
}

export default Home;