import { useState } from "react";

function LoginModal({ closeModal, setIsLoggedIn, setCurrentPage }) {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async () => {
        setLoading(true);
        const res = await fetch("http://localhost:4000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });
        setLoading(false);

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem("token", data.token);
            setIsLoggedIn(true);
            setCurrentPage("dashboard");
            closeModal();
        }

        else {
            setError(data.message || "Invalid email or password");
        }

    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white shadow-2xl rounded-2xl p-8 w-96">
                <h2 className="text-2xl font-bold mb-4">Login</h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="border w-full p-2 mb-3 rounded"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="border w-full p-2 mb-3 rounded"
                />
                {error && (
                    <p className="text-red-600 text-sm font-semibold mb-2">
                        {error}
                    </p>
                )}

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl w-full font-semibold transition"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
                <button
                    onClick={closeModal}
                    className="mt-3 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white py-3 rounded-xl w-full transition"
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default LoginModal;