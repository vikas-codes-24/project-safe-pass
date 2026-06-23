import { useState } from "react";

function SignupModal({ closeModal, setShowLogin }) {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSignup = async () => {
        setLoading(true);
        const res = await fetch("http://localhost:4000/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });
        setLoading(false);

        const data = await res.json();

        if (res.ok) {
            closeModal();
            setShowLogin(true);
        } else {
            setError(data.message || "Signup failed");
            setTimeout(() => {
                setError("");
            }, 2000);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white shadow-2xl rounded-2xl p-8 w-96">
                <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

                <input
                    type="text"
                    name="username"
                    placeholder="userName"
                    onChange={handleChange}
                    className="border w-full p-2 mb-3 rounded"
                />

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

                {success && (
                    <p className="text-green-600 text-sm font-semibold mb-2">
                        {success}
                    </p>
                )}

                {error && (
                    <p className="text-red-600 text-sm font-semibold mb-2">
                        {error}
                    </p>
                )}

                <button
                    onClick={handleSignup}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl w-full font-semibold transition"
                >
                    {loading ? "Creating Account..." : "Create Account"}
                </button>

                <button
                    onClick={closeModal}
                    className="mt-2 text-red-500 w-full"
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default SignupModal;