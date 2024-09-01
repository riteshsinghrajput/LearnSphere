import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";
import { MdOutlineModeEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Layout from "../../Layout/Layout";
import {
  deleteCourse,
  getAllCourses,
  myCourse,
} from "../../Redux/slices/courseSlice";
import { getPaymentRecord } from "../../Redux/slices/razorpaySlice";
import { getStatsData } from "../../Redux/slices/statSlice";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allUsersCount, totalActiveSubscriptions } = useSelector(
    (state) => state.stat
  );
  const { allPayments, monthlySalesRecord } = useSelector(
    (state) => state.razorpay
  );

  const userData = {
    labels: ["Registered User", "Enrolled User"],
    datasets: [
      {
        label: "User Details",
        data: [allUsersCount, totalActiveSubscriptions],
        backgroundColor: ["purple", "green"],
        borderColor: ["purple", "green"],
        borderWidth: 1,
      },
    ],
  };

  const salesData = {
    labels: [
      "January",
      "Febraury",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    fontColor: "white",
    datasets: [
      {
        label: "Sales / Month",
        data: monthlySalesRecord,
        backgroundColor: ["rgb(255, 99, 132)"],
        borderColor: ["white"],
        borderWidth: 2,
      },
    ],
  };

  // getting the courses data from redux toolkit store
  const loginUserData = useSelector((state) => state?.auth?.data);
  const myCourses = useSelector((state) => state?.course?.myCourse);
  const AllCourses = useSelector((state) => state?.course?.coursesData);
  // function to handle the course delete
  const handleCourseDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete the course?")) {
      const res = await dispatch(deleteCourse(id));

      // fetching the new updated data for the course
      if (res.payload.success) {
        await dispatch(myCourse(loginUserData?.role));
      }
    }
  };

  useEffect(() => {
    (async () => {
      await dispatch(getAllCourses());
      await dispatch(myCourse(loginUserData?.role));
      await dispatch(getStatsData());
      await dispatch(getPaymentRecord());
    })();
  }, []);

  return (
    <Layout>
      <div className="min-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-black">
        <h1 className="text-center text-3xl font-semibold text-purple-500">
          Admin Dashboard
        </h1>

        {/* creating the records card and chart for sales and user details */}
        <div className="flex flex-col md:flex-row justify-center gap-5 m-auto ">
          {/* displaying the users chart and data */}
          <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
            {/* for displaying the pie chart */}
            <div className="w-80 h-80">
              <Pie data={userData} />
            </div>

            {/* card for user data */}
            <div className="grid grid-cols-2 gap-5">
              {/* card for registered users */}
              <div className="flex items-center justify-between py-5 px-5 gap-5 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Registered Users</p>
                  <h3 className="text-4xl font-bold">{allUsersCount}</h3>
                </div>
                <FaUsers className="text-purple-500 text-5xl" />
              </div>

              {/* card for enrolled users */}
              <div className="flex items-center justify-between py-5 px-5 gap-5 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">total subscribe courses</p>
                  <h3 className="text-4xl font-bold">
                    {totalActiveSubscriptions}
                  </h3>
                </div>
                <FaUsers className="text-green-500 text-5xl" />
              </div>
            </div>
          </div>

          {/* displaying the sales chart and data */}
          <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
            {/* for displaying the bar chart */}
            <div className="h-80 relative w-full">
              <Bar className="absolute bottom-0 h-80 w-full" data={salesData} />
            </div>

            {/* card for user data */}
            <div className="grid grid-cols-2 gap-5">
              {/* card for registered users */}
              <div className="flex items-center justify-between py-5 px-5 gap-5 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Subscriptions Count</p>
                  <h3 className="text-4xl font-bold">{allPayments?.count}</h3>
                </div>
                <FcSalesPerformance className="text-purple-500 text-5xl" />
              </div>

              {/* card for enrolled users */}
              <div className="flex items-center justify-between py-5 px-5 gap-5 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Total Revenue</p>
                  <h3 className="text-4xl font-bold">
                    {allPayments?.count * 499}
                  </h3>
                </div>
                <GiMoneyStack className="text-green-500 text-5xl" />
              </div>
            </div>
          </div>
        </div>

        {/* CRUD courses section */}
        <div className="mx-[10%] w-[80%] self-center flex flex-col items-center justify-center gap-10 mb-10">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-center text-xl md:text-3xl font-semibold">
              Courses Overview
            </h1>

            {/* add course card */}
            <button
              onClick={() => {
                navigate("/course/create", {
                  state: {
                    initialCourseData: {
                      newCourse: true,
                      title: "",
                      category: "",
                      createdBy: "",
                      description: "",
                      thumbnail: undefined,
                      previewImage: "",
                    },
                  },
                });
              }}
              className="w-fit bg-purple-500 hover:bg-purple-600 transition-all ease-in-out duration-300 rounded py-2 px-4 font-semibold text-lg cursor-pointer"
            >
              Create New Course
            </button>
          </div>

          <div className="w-[100vw] md:w-[100%] overflow-x-scroll">
            <table className=" table text-center    border w-[100%]  ">
              <thead className="border">
                <tr>
                  <th>S No.</th>
                  <th>Course Title</th>
                  <th>Course Category</th>
                  <th>Instructor</th>
                  <th>Total Lectures</th>
                  <th>Course Description</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody className="">
                {loginUserData?.role !== "ADMIN" &&
                  myCourses &&
                  myCourses.map((element, index) => {
                    const titleCat = element?.title
                      ?.toLowerCase()
                      .replace(/ /g, "-");
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>

                        <td>
                          {element?.title.length > 30
                            ? element?.title?.slice(0, 30) + "..."
                            : element?.title}
                        </td>

                        <td>{element?.category}</td>
                        <td>{element?.createdBy?.name}</td>
                        <td>{element?.numberOfLectures}</td>

                        <td>
                          {element?.description.length > 30
                            ? element?.description?.slice(0, 30) + "....."
                            : element?.description}
                        </td>

                        <td className="flex items-center gap-4">
                          {/* to edit the course */}
                          <button
                            onClick={() =>
                              navigate("/course/create", {
                                state: {
                                  initialCourseData: {
                                    newCourse: false,
                                    ...element,
                                  },
                                },
                              })
                            }
                            className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                          >
                            <MdOutlineModeEdit />
                          </button>

                          {/* to delete the course */}
                          <button
                            onClick={() => handleCourseDelete(element._id)}
                            className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-30 text-xl py-2 px-4 rounded-md font-bold"
                          >
                            <BsTrash />
                          </button>

                          {/* to CRUD the lectures */}
                          <button
                            onClick={() =>
                              navigate(
                                `/mycourse/${titleCat}/${element?._id}`,
                                {
                                  state: { ...element },
                                }
                              )
                            }
                            className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-30 text-xl py-2 px-4 rounded-md font-bold"
                          >
                            <BsCollectionPlayFill />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                {loginUserData?.role === "ADMIN" &&
                  AllCourses &&
                  AllCourses.map((element, index) => {
                    const titleCat = element?.title
                      ?.toLowerCase()
                      .replace(/ /g, "-");
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>

                        <td>
                          {element?.title.length > 30
                            ? element?.title?.slice(0, 30) + "..."
                            : element?.title}
                        </td>

                        <td>{element?.category}</td>
                        <td>{element?.createdBy?.name}</td>
                        <td>{element?.numberOfLectures}</td>

                        <td>
                          {element?.description.length > 30
                            ? element?.description?.slice(0, 30) + "....."
                            : element?.description}
                        </td>

                        <td className="flex items-center gap-4">
                          {/* to edit the course */}
                          <button
                            onClick={() =>
                              navigate("/course/create", {
                                state: {
                                  initialCourseData: {
                                    newCourse: false,
                                    ...element,
                                  },
                                },
                              })
                            }
                            className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                          >
                            <MdOutlineModeEdit />
                          </button>

                          {/* to delete the course */}
                          <button
                            onClick={() => handleCourseDelete(element._id)}
                            className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-30 text-xl py-2 px-4 rounded-md font-bold"
                          >
                            <BsTrash />
                          </button>

                          {/* to CRUD the lectures */}
                          <button
                            onClick={() =>
                              navigate(
                                `/mycourse/${titleCat}/${element?._id}`,
                                {
                                  state: { ...element },
                                }
                              )
                            }
                            className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-30 text-xl py-2 px-4 rounded-md font-bold"
                          >
                            <BsCollectionPlayFill />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
