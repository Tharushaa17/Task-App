import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import TaskCard from "../components/taskCard";
import { Link } from "react-router-dom";
import { clearMessage } from "../redux/task/taskSlice";

const GET_TASK_URL = "/task/get/";

const ViewTask = () => {
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.user.currentUser?.id);
  const msg = useSelector((state) => state.task.success);

  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${GET_TASK_URL}${userId}`, {
          withCredentials: true,
        });

        setResult(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [msg, userId]);

  setTimeout(() => {
    dispatch(clearMessage());
  }, 5000);

  return (
    <>
      <h1 className="p-5 text-3xl font-bold">My Tasks</h1>
      <div className="p-10 flex flex-col items-center">
        {msg && (
          <p className="bg-red-600 text-white font-semibold text-xl p-2 rounded-md border border-red-600 shadow-md">
            {msg}
          </p>
        )}
        {result.length > 0 ? (
          result.map((task) => (
            <div
              key={task._id}
              className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 p-2"
            >
              <TaskCard
                key={task._id}
                id={task._id}
                title={task.title}
                dateTime={task.dateTime}
                text={task.text}
                compleated={task.compleated}
              />
            </div>
          ))
        ) : (
          <div
            className="max-w-sm flex flex-col items-center rounded 
                overflow-hidden shadow-lg bg-white m-10 p-10 transition-transform 
                duration-300 transform hover:scale-105"
          >
            <p className="text-lg font-semibold mb-5">No Tasks to Show</p>
            <Link to={"/add"}>
              <button className="bg-purple-800 text-white p-5 rounded-md">
                <i className="fas fa-plus mr-2"></i> Add Task
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewTask;
