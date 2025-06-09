import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let password = localStorage.getItem("password");
    if (password) {
      setPasswordArray(JSON.parse(password));
    }
  }, []);

  const showPassword = () => {
    passwordRef.current.type = "text";
    console.log(ref.current.src);
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "icons/eyecross.png";
      passwordRef.current.type = "password";
    }
  };

  const savePassword = () => {
    setPasswordArray([...passwordArray, form]);
    localStorage.setItem("password", JSON.stringify([...passwordArray, form]));
    console.log([...passwordArray, form]);
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast("copied to Clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className=" mycontainer">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-green-500">&lt;</span>
          <span>safe</span>
          <span className="text-green-500">PASS/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own password manager
        </p>

        <div className=" flex flex-col p-4 text-black gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            id=""
          />
          <div className="flex w-full justify-between gap-8 ">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              id=""
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="pssword"
                name="password"
                id=""
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer "
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 bg-green-600 hover:bg-green-500 rounded-full px-8 py-2 w-fit border border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>

        <div className="password">
          <h2 className="font-bold text-2xl py-4">Your's Passwords</h2>
          {passwordArray.length === 0 && <div>No Password to Show.</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                </tr>
              </thead>
              <tbody className="bg-green-100 ">
                {passwordArray.map((items) => {
                  return (
                    <tr>
                      <td className=" py-2 border border-white text-center w-32">
                        <a href="{items.site}" target="_blank">
                          {items.site}
                        </a>
                        <div
                          className="lordiconcopy size-7 cursor-pointer "
                          onClick={() => {
                            copyText(items.site);
                          }}
                        >
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                            src="https://cdn.lordicon.com/lyrrgrsl.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </td>
                      <td className=" py-2 border border-white  text-center w-32">
                        <a href="{items.username}" target="_blank">
                          {items.username}
                        </a>{" "}
                      </td>
                      <td className=" py-2 border border-white  text-center w-32">
                        <a href="{items.password}" target="_blank">
                          {items.password}
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
