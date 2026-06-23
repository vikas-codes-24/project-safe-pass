import React, { useRef, useState, useEffect } from "react";

const Manager = () => {
  const ref = useRef();

  const [form, setform] = useState({
    siteUrl: "",
    username: "",
    password: "",
  });

  const [passwordArray, setPasswordArray] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);

  useEffect(() => {
    fetchPassword();
  }, []);

  const fetchPassword = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:4000/password", {
      headers: {
        authorization: token,
      },
    });

    const data = await res.json();

    if (Array.isArray(data)) {
      setPasswordArray(data);
    } else {
      setPasswordArray([]);
    }
  };

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const savePassword = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login first to save passwords.");

      setTimeout(() => {
        setError("");
      }, 3000);

      return;
    }

    setError("");

    const res = await fetch("http://localhost:4000/password", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: token,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    console.log(data);

    setMessage("Password Saved Successfully!");

    setTimeout(() => {
      setMessage("");
    }, 2000);

    fetchPassword();

    setform({
      siteUrl: "",
      username: "",
      password: "",
    });
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:4000/password/${id}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          authorization: token,
        },
      }
    );

    if (response.ok) {
      setPasswordArray(
        passwordArray.filter((pass) => pass._id !== id)
      );

      setMessage("Password Deleted Successfully!");

      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };

  const copyText = async (text) => {
    await navigator.clipboard.writeText(text);

    setMessage("Copied Successfully!");

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-5xl font-bold text-center">
          <span className="text-green-500">&lt;</span>
          safe
          <span className="text-green-500">PASS/&gt;</span>
        </h1>

        <p className="text-green-900 text-lg text-center mt-2">
          Your own password manager
        </p>

        {/* Form Card */}
        <div className="bg-white shadow-xl rounded-2xl p-8 mt-8 flex flex-col gap-6">
          <input
            value={form.siteUrl}
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="rounded-xl border border-green-500 w-full p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            type="text"
            name="siteUrl"
          />

          <div className="grid md:grid-cols-2 gap-4">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-xl border border-green-500 w-full p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              type="text"
              name="username"
            />

            <input
              value={form.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="rounded-xl border border-green-500 w-full p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              type="password"
              name="password"
            />
          </div>

          {error && (
            <p className="text-red-600 font-semibold text-sm">
              {error}
            </p>
          )}

          {message && (
            <p className="text-green-600 font-semibold text-sm">
              {message}
            </p>
          )}

          <button
            onClick={savePassword}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-xl transition w-fit"
          >
            Add Password
          </button>
        </div>



      </div>
    </>
  );
};

export default Manager;