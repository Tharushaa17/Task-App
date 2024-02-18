import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";


const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [isDropdownVisible, setDropdownVisibility] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisibility(!isDropdownVisible);
  };

  return (
    <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/view">
          <h1 className="font-bold text-3xl uppercase sm:text-xl flex flex-wrap">
            <span className="text-purple-300 font-bold">Task</span>
            <span className="bg-[#fbe2e3] text-slate-700 px-1">App</span>
          </h1>
        </Link>
        {currentUser ? (
        <button
          onClick={toggleDropdown}
          data-collapse-toggle="navbar-hamburger"
          type="button"
          className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-hamburger"
          aria-expanded={isDropdownVisible}
        >
          <FontAwesomeIcon icon={faBars} className="w-5 h-5" />
        </button>
         ) : null}
        <div className={`w-full ${isDropdownVisible ? "" : "hidden"}`}>
          <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <li>
              <Link to="/view">
                <p
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={toggleDropdown}
                >
                  Home
                </p>
              </Link>
            </li>
            <li>
              <Link to="/add">
                <p
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={toggleDropdown}
                >
                  Add Task
                </p>
              </Link>
            </li>
            <li>
              <Link to="/profile">
                <p
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={toggleDropdown}
                >
                  Profile
                </p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
