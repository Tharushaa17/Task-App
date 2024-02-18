import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { useDispatch } from "react-redux";
import { taskDeleteStart, taskDeleteSuccess } from "../redux/task/taskSlice";

const DELETE_TASK_URL = "/task/delete/"

const TaskCard = ({ id, title, dateTime, text, compleated }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const formattedDateTime = new Date(dateTime).toLocaleString("en-CA");

  const deleteTaskHandler = async (id) => {
    try {
      dispatch(taskDeleteStart())
      const res = await axios.delete(`${DELETE_TASK_URL}${id}`, {
        withCredentials: true,
      });
console.log(res);
      dispatch(taskDeleteSuccess(res.data.message));
      navigate("/view")
    } catch (error) {
      console.error("Error deleteing data:", error);
    }
  }

  return (
    <div
      key={id}
      className="max-w-sm flex flex-col items-center rounded 
                overflow-hidden shadow-lg bg-white m-10 transition-transform 
                duration-300 transform hover:scale-105"
    >
      <div className="p-6 font-bold text-2xl mb-2 text-center bg-indigo-500 text-white">
        {title}
      </div>
      <div className="px-6 py-4">
        <div className="text-lg mb-2 text-gray-600 text-center">
          {formattedDateTime}
        </div>
        <p className="text-gray-700 text-base m-5 text-center">{text}</p>
        <p
          className={`text-base ${
            compleated ? "text-green-600" : "text-red-600"
          } font-semibold text-center p-5`}
        >
          {compleated ? "Completed" : "Incomplete"}
        </p>
      </div>

      <div className="flex justify-between items-center bg-gray-100 py-2">
        <button
          onClick={() => deleteTaskHandler(id)}
          className="p-3 bg-red-500 text-white rounded
                  hover:bg-red-700 focus:outline-none focus:ring
                  focus:border-blue-300"
        >
          Delete
        </button>

        <div className="w-4"></div>

        <Link to={`/edit/${id}`}>
          <button
            className="p-3 bg-green-500 text-white rounded 
                    hover:bg-red-700 focus:outline-none focus:ring 
                    focus:border-blue-300"
          >
            &nbsp;&nbsp;Edit&nbsp;&nbsp;
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TaskCard;
