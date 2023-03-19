import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useUserStore } from "../../state/user.state";
import { IUser } from "../../types/Api";

const Login = () => {
  const { userId, isLoggedIn, setUserId, setIsLoggedIn, setUserData } =
    useUserStore();
  const [loginInput, setLoginInput] = useState(userId);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoggedIn(true);
    setUserId(loginInput);

    const r = await axios.get<IUser>(
      `https://jsonplaceholder.typicode.com/users/${loginInput}`
    );
    setUserData(r.data);
    navigate("/");
  };

  if (isLoggedIn) {
    navigate("/");
  }

  return (
    <div className="login-wrapper">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5">WSEI Frameworki</h1>
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <div className="px-5 py-7">
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              E-mail
            </label>
            <input
              type="number"
              min={1}
              max={10}
              value={loginInput}
              onChange={(e) => setLoginInput(parseInt(e.target.value))}
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Password
            </label>
            <input
              type="text"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />
            <button
              onClick={handleLogin}
              className="login-btn hover:shadow-form hover:bg-violet-800"
            >
              <span className="inline-block mr-2">Login</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4 inline-block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
