import React, { useEffect, useState } from "react";

function Dashboard() {
    const [passwordArray, setPasswordArray] = useState([]);
    const [message, setMessage] = useState("");
    const [showPasswords, setShowPasswords] = useState(false);

    useEffect(() => {
        fetchPasswords();
    }, []);

    const fetchPasswords = async () => {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:4000/password", {
            headers: {
                authorization: token,
            },
        });

        const data = await res.json();

        if (Array.isArray(data)) {
            setPasswordArray(data);
        }
    };

    const copyText = async (text) => {
        await navigator.clipboard.writeText(text);

        setMessage("Copied Successfully!");

        setTimeout(() => {
            setMessage("");
        }, 2000);
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");

        const response = await fetch(
            `http://localhost:4000/password/${id}`,
            {
                method: "DELETE",
                headers: {
                    authorization: token,
                },
            }
        );

        if (response.ok) {
            setPasswordArray(
                passwordArray.filter((pass) => pass._id !== id)
            );

            setMessage("Password Deleted!");

            setTimeout(() => {
                setMessage("");
            }, 2000);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-8">

            <h1 className="text-4xl font-bold mb-6">
                Your Dashboard
            </h1>

            {message && (
                <p className="text-green-600 font-semibold mb-4">
                    {message}
                </p>
            )}

            <button
                onClick={() => setShowPasswords(!showPasswords)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg mb-4"
            >
                {showPasswords ? "Hide Passwords" : "Show Passwords"}
            </button>

            {passwordArray.length === 0 ? (
                <div className="bg-white p-6 rounded-xl shadow">
                    No Passwords Saved
                </div>
            ) : (
                <table className="table-auto w-full bg-white rounded-xl shadow overflow-hidden">
                    <thead className="bg-green-700 text-white">
                        <tr>
                            <th className="py-3">Site</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {passwordArray.map((item) => (
                            <tr
                                key={item._id}
                                className="border-b"
                            >
                                <td className="text-center py-3">
                                    <div className="flex justify-center gap-2">
                                        <a
                                            href={item.siteUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {item.siteUrl}
                                        </a>

                                        <button
                                            onClick={() =>
                                                copyText(item.siteUrl)
                                            }
                                        >
                                            📋
                                        </button>
                                    </div>
                                </td>

                                <td className="text-center">
                                    <div className="flex justify-center gap-2">
                                        {item.username}

                                        <button
                                            onClick={() =>
                                                copyText(item.username)
                                            }
                                        >
                                            📋
                                        </button>
                                    </div>
                                </td>

                                <td className="text-center">
                                    <div className="flex justify-center gap-2">
                                        {showPasswords
                                            ? item.password
                                            : "********"}

                                        <button
                                            onClick={() =>
                                                copyText(item.password)
                                            }
                                        >
                                            📋
                                        </button>
                                    </div>
                                </td>

                                <td className="text-center">
                                    <button
                                        onClick={() =>
                                            handleDelete(item._id)
                                        }
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Dashboard; 