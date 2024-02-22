import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";
import { useSelector } from "react-redux";

const UPDATE_TASK_URL = "/task/update/";
const EDIT_TASK_URL = "/task/edit/";

const EditTask = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user.currentUser?.id);
  const navigate = useNavigate();
  const errRef = useRef();

  const [formdata, setFormData] = useState({
    user,
    title:"",
    text:"",
    dateTime:"",
    isCompleated:false
  })

  console.log(formdata);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get(`${EDIT_TASK_URL}${id}`, {
        withCredentials: true,
      });

      setFormData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, [id]);


  const handleChange = (e) => {
    if (e.target.id === "compleated") {
      setFormData({
        ...formdata,
        type: e.target.id
      })
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(
        `${UPDATE_TASK_URL}${id}`,
        { formdata },
        {
          // headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setSuccess(true);

      navigate("/view");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Title Already Taken");
      } else {
        setErrMsg("Submission Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Update Task!
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
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Title:
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="text"
                autoComplete="off"
                onChange={handleChange}
                value={formdata.title}
                required
                className="block w-full rounded-md border-0 py-1.5 
                          text-gray-900 shadow-sm ring-1 ring-inset 
                          ring-gray-300 placeholder:text-gray-400 
                          focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                          sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="text"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Text:
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="text"
                autoComplete="off"
                onChange={handleChange}
                value={formdata.text || ""}
                required
                className="block w-full rounded-md border-0 py-1.5 
                        text-gray-900 shadow-sm ring-1 ring-inset 
                        ring-gray-300 placeholder:text-gray-400 
                        focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                        sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Date and Time
            </label>
            <div className="mt-2">
              <input
                type="datetime-local"
                id="date-time"
                onChange={handleChange}
                value={formdata.dateTime ? formdata.dateTime.slice(0, -5) : ""}
                required
                className="block w-full rounded-md border-0 py-1.5 
                          text-gray-900 shadow-sm ring-1 ring-inset 
                          ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                          focus:ring-inset focus:ring-indigo-600 
                          sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="compleated"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Completed
            </label>
            <div className="mt-2">
              <input
                id="compleated"
                name="compleated"
                type="checkbox"
                onChange={handleChange}
                checked={formdata.isCompleated || false}
                className="toggle-checkbox visually-hidden"
              />
              <label htmlFor="compleated" className="toggle-label">
                <span
                  className={`toggle-inner ${
                    formdata.isCompleated ? "bg-indigo-600" : "bg-gray-300"
                  }`}
                />
                <span
                  className={`toggle-switch ${
                    formdata.isCompleated ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </label>
              {/* <input
                type="hidden"
                name="completed"
                value={formdata.isCompleated.toString()}
              /> */}
            </div>
          </div>

          <div>
            <button className="flex w-full justify-center rounded-md 
                              bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 
                              text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
                              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 
                              disabled:opacity-25"
            >
              Update
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          <Link to={"/view"}>
            <p className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              &nbsp;&nbsp; Go Back to Task
            </p>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default EditTask;
