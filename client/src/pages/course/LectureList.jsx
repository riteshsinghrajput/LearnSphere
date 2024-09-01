// LectureList.jsx
import { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import Notice from "../../components/Notice";
import ScrollToTop from "../../components/ScrollToTop";
import {
  deleteCourseLecture,
  getLeacture,
} from "../../Redux/slices/courseSlice";

const LectureList = () => {
  const { courseLecture } = useSelector((state) => state?.course);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [selectedLecture, setSelectedLecture] = useState(courseLecture[0]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { data } = useSelector((state) => state?.auth);

  const handleLectureClick = (lecture) => {
    setSelectedLecture(lecture);
    setSidebarOpen(false); // Close sidebar after selecting a lecture
  };

  const handleLectureDelete = async (courseId, lectureId) => {
    const data = { courseId, lectureId };
    await dispatch(deleteCourseLecture(data));
    await dispatch(getLeacture(state._id));
  };

  useEffect(() => {
    setSelectedLecture(courseLecture[0]);
  }, [courseLecture]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <ScrollToTop />
      {/* Hamburger Icon */}
      {courseLecture.length > 0 && (
        <>
          <div className="bg-purple-500 h-[50px]  sticky flex text-white items-center justify-between px-4 ">
            <div
              className=" cursor-pointer flex items-center space-x-1 border-r-2 pr-2 h-full hover:bg-purple-700"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <div className="text-2xl">
                <FaBars />
              </div>
              <p className="">Lectures</p>
            </div>

            {/* add lectures */}
            {((data?.role === "INST" && data?._id === state?.createdBy.id) ||
              data?.role === "ADMIN") && (
              <div
                className="flex items-center space-x-1 max-h-[100%] rounded-md border bg-green-500 font-bold  py-2 px-2 cursor-pointer"
                onClick={() =>
                  navigate("/course/addlecture", { state: { ...state } })
                }
              >
                <p>Add Lecture</p>
              </div>
            )}
            <div
              className="flex items-center space-x-1 border-l-2 h-full px-2 cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <div>
                <FaHome />
              </div>
              <p>Back to course</p>
            </div>
          </div>

          {/* notice board */}
          <Notice noticeData={state?.notice} state={state} />
          {/* Sidebar with Lecture Titles */}
          <div
            className={`fixed top-0 left-0 w-64 bg-white shadow-md p-4 h-full z-20 transition-transform transform ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-purple-500">Lectures</h2>
              <button
                className="text-2xl  hover:border p-2 border-purple-500 text-purple-500"
                onClick={() => setSidebarOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="space-y-2">
              {courseLecture &&
                courseLecture?.map((lecture, index) => (
                  <div
                    key={index}
                    className={`flex items-center h-full   cursor-pointer space-x-2 ${
                      lecture === selectedLecture
                        ? "border-l-4"
                        : "hover:border-l-4"
                    } border-purple-700 pl-2`}
                    onClick={() => handleLectureClick(lecture)}
                  >
                    <div className="text-lg flex-1 ">{index + 1} </div>
                    <div className="flex-3">
                      <span className="text-lg">{lecture?.title}</span>
                    </div>
                    {(data?.role === "ADMIN" || data?.role === "INST") && (
                      <div className="flex-1">
                        <button
                          onClick={() =>
                            handleLectureDelete(state?._id, lecture?._id)
                          }
                          className=" bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-30 text-xl py-2 px-4 rounded-md font-bold"
                        >
                          <BsTrash />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-grow p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold">{selectedLecture?.title}</h2>
            </div>
            <div className="w-[100%] h-[40vh] sm:h-[60vh] flex justify-center items-center ">
              <div className=" flex w-[100%]  sm:w-[80%] h-[80%] sm:h-[100%]  items-center  justify-center ">
                <video
                  className="w-[100%] h-[100%] "
                  controls
                  controlsList="nodownload"
                  title={selectedLecture?.title}
                  src={selectedLecture?.lecture?.secure_url}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            <div className="text-lg pl-3 w-[100%] lg:w-[80%]  mt-5 pb-6">
              {selectedLecture?.description}
            </div>
          </div>
        </>
      )}

      {courseLecture.length === 0 && (
        <>
          <div className="bg-purple-500 h-[50px]  sticky flex text-white items-center justify-between px-4 ">
            {/* add lectures */}
            {((data?.role === "INST" && data?._id === state?.createdBy.id) ||
              data?.role === "ADMIN") && (
              <div
                className="flex items-center space-x-1 rounded-md max-h-[100%] border bg-green-500 font-bold  py-2 px-2 cursor-pointer"
                onClick={() =>
                  navigate("/course/addlecture", { state: { ...state } })
                }
              >
                <p>Add Lecture</p>
              </div>
            )}
            <div
              className="flex items-center space-x-1 border-l-2 h-full px-2 cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <div>
                <FaHome />
              </div>
              <p>Back to course</p>
            </div>
          </div>

          <Notice noticeData={state?.notice} state={state} />
          <div className="h-[70vh] flex justify-center items-center ">
            Currently there is no lecture
          </div>
        </>
      )}
    </div>
  );
};

export default LectureList;
