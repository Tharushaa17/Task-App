import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { logInFailure, logInStart, logInSuccess } from "../redux/user/userSlice";

const LOGIN_URL = "/auth/login";

const Loggin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [username, setUser] = useState("");
  const [password, setpassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(logInStart())
      const response = await axios.post(LOGIN_URL, { username, password },{withCredentials: true});
      const accessToken = response?.data?.accessToken;

      const user = jwtDecode(accessToken)
      dispatch(logInSuccess(user));

      setUser("");
      setpassword("");
      navigate("/view");

    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      dispatch(logInFailure(err))
      errRef.current.focus();
    }
  };

  return (
    <div
      className="flex min-h-full flex-col 
                    justify-center 
                    px-6 py-12 lg:px-8"
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2
          className="mt-10 text-center text-2xl font-bold 
                    leading-9 tracking-tight text-gray-900"
        >
          User Loggin!
        </h2>
      </div>
      <p
        ref={errRef}
        className={
          errMsg ? "text-red-700 text-center font-semibold" : "offscreen"
        }
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username:
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={username}
                className="block w-full rounded-md border-0 py-1.5 
                          text-gray-900 shadow-sm ring-1 ring-inset 
                          ring-gray-300 placeholder:text-gray-400 
                          focus:ring-2 focus:ring-inset 
                          focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 
                                    text-gray-900"
            >
              Password:
            </label>
            <div className="mt-2">
              <input
                type="password"
                id="password"
                onChange={(e) => setpassword(e.target.value)}
                value={password}
                className="block w-full rounded-md border-0 py-1.5 
                                text-gray-900 shadow-sm ring-1 ring-inset 
                                ring-gray-300 placeholder:text-gray-400 
                                focus:ring-2 focus:ring-inset 
                                focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md 
                                bg-indigo-600 px-3 py-1.5 text-sm font-semibold 
                                leading-6 text-white shadow-sm 
                                hover:bg-indigo-500 focus-visible:outline 
                                focus-visible:outline-2 
                                focus-visible:outline-offset-2 
                                focus-visible:outline-indigo-600"
            >
              Loggin
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have Registered?
          <Link to={"/register"}>
            <p className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              &nbsp;&nbsp; Register
            </p>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Loggin;
