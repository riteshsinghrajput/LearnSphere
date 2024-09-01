import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { time } from "../../helper/time";


function Card({ data }) {
  const navigate = useNavigate();
  const location = useLocation()
  const [isMyCourse, setIsMyCourse] = useState(false);

  const userCourse = useSelector((state) => state?.course.myCourse);
 const titleCat =  data?.title?.toLowerCase().replace(/ /g, '-');
   const {istDateString } = time(data?.createdAt)
  useEffect(() => {
    (async () => {
       userCourse && userCourse?.map((d) => {
        if (d._id === data._id) {
          setIsMyCourse(true);
        }
      });
    })();
  }, [userCourse]);

  return (
    <div className={`w-full  md:w-[45%] lg:w-[30%] shadow-md flex flex-col hover:animate-pulse  ${location.pathname === "/mycourse" ? "h-[300px]" : "h-[460px]" }`}>
      <div className="h-[50%] pb-2">
        <img
          src={data?.thumbnail?.secure_url}
          alt="course title"
          className="w-full h-[100%]"
        />
      </div>
      <div className=" h-[20%] flex flex-col space-y-2 p-2">
        <div>{data?.title}</div>
        <div className="text-xs">
          {" "}
          {data?.description.length > 100
            ? data?.description.slice(0, 100) + "..."
            : data?.description}
        </div>
      </div>
     {!isMyCourse && <div className=" w-[100%] h-[20%] flex items-center ">
        <div className="w-[100%] items-center">
          <div className="flex justify-around items-center">
            <div>Registration Started</div>
            <div className="text-blue-500 text-xs">start on {istDateString}</div>
          </div>
        </div>
      </div>}
      <div className="space-y-6 p-3 mt-auto">
        {!isMyCourse ? (
          <div className="flex justify-between">
            <Link to={`/courses/courseDescription/${data?._id}`}>
              <div className="relative z-10 bg-purple-600 rounded-md border border-purple-600">
                <button
                  className=" text-white font-bold text-sm px-6 py-3 transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0  before:bg-white 
                before:rounded-md before:transition-transform before:duration-300 before:content-['']  hover:text-purple-500 before:hover:scale-x-100"
                >
                  Explore
                </button>
              </div>
            </Link>
            <div
              className="relative z-10 bg-white border-purple-600 border rounded-md"
              onClick={() =>
                navigate("/course/checkout", { state: { ...data } })
              }
            >
              <button
                className=" text-purple-500 font-bold text-sm px-6 py-3   transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-purple-600
                before:rounded-md before:transition-transform before:duration-300 before:content-['']  hover:text-white before:hover:scale-x-100"
              >
                Buy Now
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div onClick={()=>{navigate(`/mycourse/${titleCat}/${data?._id}` , { state: { ...data } })} }>
              <div className="relative z-10 bg-green-400 rounded-md border border-green-400">
                <button
                  className=" text-white font-bold text-sm px-8 py-3 transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0  before:bg-white 
                before:rounded-md before:transition-transform before:duration-300 before:content-['']  hover:text-green-500 before:hover:scale-x-100"
                >
                  Watch Course
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
