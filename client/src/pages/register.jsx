import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axios";

const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/auth/register";

const Register = () => {
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USERNAME_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
    setValidMatch(password === matchPassword);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [username, password, matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = USERNAME_REGEX.test(username);
    const v2 = EMAIL_REGEX.test(email);
    const v3 = PASSWORD_REGEX.test(password);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }
   
    try {
      await axios.post(REGISTER_URL,{ username, email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setSuccess(true);

      setUsername("");
      setEmail("");
      setPassword("");
      setMatchPassword("");

      navigate("/");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
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
          User Registration!
        </h2>
      </div>
      <p
        ref={errRef}
        className={`${errMsg ? "text-center text-red-500" : "offscreen"}`}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <p>{success}</p>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 
                          text-gray-900"
            >
              Username:
              <span className={validName ? "valid" : "hidden"}>
                <FontAwesomeIcon
                  icon={faCheck}
                  className="pl-2 text-green-500 font-semibold"
                />
              </span>
              <span className={validName || !username ? "hidden" : "invalid"}>
                <FontAwesomeIcon
                  icon={faTimes}
                  className="pl-2 text-red-500 font-semibold"
                />
              </span>
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUsernameFocus(true)}
                onBlur={() => setUsernameFocus(false)}
                className="block w-full rounded-md border-0 py-1.5 
                        text-gray-900 shadow-sm ring-1 ring-inset 
                        ring-gray-300 placeholder:text-gray-400 
                          focus:ring-2 focus:ring-inset 
                        focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <p
                id="uidnote"
                className={
                  usernameFocus && username && !validName ? "instructions" : "hidden"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 
                          text-gray-900"
            >
              Email:
              <span className={validEmail ? "valid" : "hidden"}>
                <FontAwesomeIcon
                  icon={faCheck}
                  className="pl-2 text-green-500 font-semibold"
                />
              </span>
              <span className={validEmail || !email ? "hidden" : "invalid"}>
                <FontAwesomeIcon
                  icon={faTimes}
                  className="pl-2 text-red-500 font-semibold"
                />
              </span>
            </label>
            <div className="mt-2">
              <input
                type="email"
                id="email"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="emailnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                className="block w-full rounded-md border-0 py-1.5 
                        text-gray-900 shadow-sm ring-1 ring-inset 
                        ring-gray-300 placeholder:text-gray-400 
                          focus:ring-2 focus:ring-inset 
                        focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <p
                id="emailnote"
                className={
                  emailFocus && email && !validEmail ? "instructions" : "hidden"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Enter a valid email address.
              </p>
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 
                                text-gray-900"
            >
              Password
              <span className={validPassword ? "valid" : "hidden"}>
                <FontAwesomeIcon
                  icon={faCheck}
                  className="pl-2 text-green-500 font-semibold"
                />
              </span>
              <span className={validPassword || !password ? "hidden" : "invalid"}>
                <FontAwesomeIcon
                  icon={faTimes}
                  className="pl-2 text-red-500 font-semibold"
                />
              </span>
            </label>
            <div className="mt-2">
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                aria-invalid={validPassword ? "false" : "true"}
                aria-describedby="passwordnote"
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                className="block w-full rounded-md border-0 py-1.5 
                        text-gray-900 shadow-sm ring-1 ring-inset 
                        ring-gray-300 placeholder:text-gray-400 
                          focus:ring-2 focus:ring-inset 
                        focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <p
                id="passwordnote"
                className={passwordFocus && !validPassword ? "instructions" : "hidden"}
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number and a
                special character.
                <br />
                Allowed special characters:{" "}
                <span aria-label="exclamation mark">!</span>{" "}
                <span aria-label="at symbol">@</span>{" "}
                <span aria-label="hashtag">#</span>{" "}
                <span aria-label="dollar sign">$</span>{" "}
                <span aria-label="percent">%</span>
              </p>
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 
                                text-gray-900"
            >
              Check Password
              <span className={validMatch && matchPassword ? "valid" : "hidden"}>
                <FontAwesomeIcon
                  icon={faCheck}
                  className="pl-2 text-green-500 font-semibold"
                />
              </span>
              <span className={validMatch || !matchPassword ? "hidden" : "invalid"}>
                <FontAwesomeIcon
                  icon={faTimes}
                  className="pl-2 text-red-500 font-semibold"
                />
              </span>
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                onChange={(e) => setMatchPassword(e.target.value)}
                value={matchPassword}
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                required
                className="block w-full rounded-md border-0 py-1.5 
                        text-gray-900 shadow-sm ring-1 ring-inset 
                        ring-gray-300 placeholder:text-gray-400 
                          focus:ring-2 focus:ring-inset 
                        focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
              </p>
            </div>
          </div>

          <div>
            <button
              className="flex w-full justify-center rounded-md 
                        bg-indigo-600 px-3 py-1.5 text-sm font-semibold 
                        leading-6 text-white shadow-sm 
                        hover:bg-indigo-500 focus-visible:outline 
                        focus-visible:outline-2 
                        focus-visible:outline-offset-2 
                        focus-visible:outline-indigo-600 disabled:opacity-25"
              disabled={!validName || !validPassword || !validMatch ? true : false}
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already Registered?
          <Link to={"/"}>
            <p className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              &nbsp;&nbsp; Loggin
            </p>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
