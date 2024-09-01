import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import asset1 from "../assets/asset1.png";
import asset2 from "../assets/asset2.png";
import asset3 from "../assets/asset3.png";
import collegeUrl from "../assets/clg.jpeg";
import Cards from "../components/cards/Cards";
import ChatWidget from "../components/ChatWidget";
import CourseCard from "../components/courses/CourseCard";
import Layout from "../Layout/Layout";
import {
  getAllCategory,
  getAllCourses,
  myCourse,
} from "../Redux/slices/courseSlice";

const desc = [
  { imageUrl: asset1, heading: "55%", description: "Average Salary Hike" },
  { imageUrl: asset2, heading: "600+", description: "Different Courses" },
  { imageUrl: asset3, heading: "12000+", description: "Career Transition" },
];

function Home() {
  const { courseCategory } = useSelector((state) => state?.course);
  const { data } = useSelector((state) => state?.auth);
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setLoading(true);
      await dispatch(getAllCategory());
      await dispatch(myCourse(data?.role));
      await dispatch(getAllCourses());
      setLoading(false);
    })();
  }, []);

  return (
    <Layout>
      <div>
        {/* first image */}
        <div
          style={{ backgroundImage: `url(${collegeUrl})` }}
          className="h-[90vh] bg-cover bg-center relative"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black  to-black opacity-60" />

          <div className="relative h-full flex flex-col items-center justify-center text-white  ">
            <div className="space-y-4 flex flex-col justify-center items-center  w-[80vw]">
              <div className="font-bold text-4xl lg:text-5xl">
                Committed to Excellence
              </div>
              <div className="pb-9">
                Our academy has been ranked #1 in The World Academy Rankings for
                five consecutive years.
              </div>
              <div className="flex justify-center items-center mt-20 space-x-5">
                {
                  <Link to={"/contact"}>
                    {" "}
                    <div className="relative z-10 bg-purple-500 rounded-md">
                      <button
                        className=" text-white px-4 py-2  text-xl transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-white
                before:rounded-md before:transition-transform before:duration-300 before:content-['']  hover:text-black before:hover:scale-x-100"
                      >
                        Contact Us
                      </button>
                    </div>
                  </Link>
                }
                {
                  <Link to={"/courses"}>
                    <div className="relative z-10 bg-white rounded-md">
                      <button
                        className=" text-black px-4 py-2  text-xl transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-purple-600
                before:rounded-md before:transition-transform before:duration-300 before:content-['']  hover:text-white before:hover:scale-x-100"
                      >
                        Explore Course
                      </button>
                    </div>
                  </Link>
                }
              </div>
            </div>
          </div>
        </div>

        <div className=" mt-16 min-h-24 flex justify-center items-center">
          <div className="w-[80vw] mx-auto min-h-[10vh]   flex flex-wrap items-center justify-center space-x-7 space-y-4">
            <div></div>

            {desc.length > 0 &&
              desc.map((e, index) => {
                return (
                  <Cards
                    key={index}
                    imageUrl={e.imageUrl}
                    heading={e.heading}
                    description={e.description}
                  />
                );
              })}
          </div>
        </div>
      </div>
      <div className="w-[80vw] mx-auto mb-4 mt-14 ">
        <div className="text-2xl font-bold">Feature Courses</div>
        <div className="mt-9">
          {courseCategory &&
            courseCategory.slice(0, 3).map((category, index) => {
              return (
                <CourseCard
                  key={index}
                  courseCategory={category}
                  Loading={Loading}
                />
              );
            })}
        </div>

        <Link to="/courses">
          <div>
            <div className="flex justify-center text-xs mt-3 ">
              <div className="relative z-10 bg-black rounded-full  opacity-70 ">
                <button className=" text-white font-bold px-4 py-3 ">
                  Explore All Course/Category
                </button>
              </div>
            </div>
          </div>
        </Link>
      </div>
      {data && <ChatWidget />}
    </Layout>
  );
}

export default Home;
