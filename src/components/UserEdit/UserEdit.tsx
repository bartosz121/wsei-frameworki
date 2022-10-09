import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { AppContext } from "../../context/AppContext";
import { IUser } from "../../types/Api";

type Props = {};

const UserEdit = (props: Props) => {
  const appContext = useContext(AppContext);
  const [name, setName] = useState(appContext.userData!.name);
  const [username, setUsername] = useState(appContext.userData!.username);
  const [email, setEmail] = useState(appContext.userData!.email);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      name: name,
      username: username,
      email: email,
    };

    const res = await axios.patch<IUser>(
      `https://jsonplaceholder.typicode.com/users/${appContext.userId}`,
      payload
    );

    appContext.userData = res.data;

    navigate(`/user/${appContext.userId}`);
  };

  return (
    <div className="flex items-center justify-center my-2 border-b">
      <div className="mx-auto w-full max-w-[550px]">
        <form onSubmit={handleSubmit} method="POST">
          <div className="mb-5">
            <label htmlFor="name" className="font-semibold text-2xl">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Name"
              className="form-input border-[#e0e0e0] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="username" className="font-semibold text-2xl">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="Username"
              className="form-input border-[#e0e0e0] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="font-semibold text-2xl">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
              className="form-input border-[#e0e0e0] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div>
            <button className="form-submit-btn hover:shadow-form hover:bg-violet-800">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEdit;
