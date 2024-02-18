import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from '../utils/axios';
import { logOutUserFailure, logOutUserStart, logOutUserSuccess } from '../redux/user/userSlice';

const GET_USER_PROFILE = "/user/profile/";
const LOGOUT_URL = "/auth/logout";

const Profile = () => {
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.user.currentUser?.id);
  const [result, setResult] = useState([]);
  const formattedDateTime = new Date(result.createdAt).toLocaleDateString(
    "en-CA"
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${GET_USER_PROFILE}${userId}`, {
          withCredentials: true,
        });
        setResult(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const logoutHandler = async () => {
    try {
      dispatch(logOutUserStart())
       const res = await axios.get(`${LOGOUT_URL}`, {
         withCredentials: true,
       });
       dispatch(logOutUserSuccess(res))
      } catch (error) {
      dispatch(logOutUserFailure(error))
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="max-w-sm flex flex-col items-center rounded 
              overflow-hidden shadow-lg bg-white m-10 transition-transform 
              duration-300 transform hover:scale-105"
      >
        <div className="p-6 font-bold text-2xl mb-2 text-center text-black font-thin">
          Hello! {result.username}
        </div>
        <div className="px-6 py-4">
          <div className="text-lg mb-2 text-gray-600 text-center">
            {result.email}
          </div>
          <p className="text-gray-700 text-base m-5 text-center">
            Since: {formattedDateTime}
          </p>
        </div>
        <div className="flex justify-between items-center bg-slate p-8 items-center">
          <button
            onClick={logoutHandler}
            className="p-3 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none focus:ring focus:border-blue-300"
          >
            &nbsp;&nbsp;Sing Out&nbsp;&nbsp;
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile