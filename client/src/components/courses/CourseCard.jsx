
import { Skeleton } from "@mui/material";
import { FaArrowRight } from "react-icons/fa";
import {useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Card from "./Card";

function CourseCard({ courseCategory ,Loading = false}) {
  const navigate = useNavigate();

  const { coursesData } = useSelector((state) => state?.course);
  const categoryInDash = courseCategory.replace(/ /g, "-").toLowerCase();


  
  return (
    <div className="space-y-5 ">
      <div />
      <div className=" flex justify-between">
        <div className="text-purple-600 text-xl font-bold">{courseCategory}</div>
       {coursesData && coursesData.filter((e)=>{
              return e.category === courseCategory
             }).length > 3 &&  <div
          className="flex space-x-2 items-center shadow-md px-4 py-2 text-sm cursor-pointer"
          onClick={() => navigate(`/courses/category/${categoryInDash}`)}
        >
          <div>View All</div>
          <div>
            <FaArrowRight />
          </div>
        </div>}
      </div>
    {!Loading ?  <div className="space-x-4 space-y-4 flex flex-wrap">
        <div></div>
        {coursesData  && 
             coursesData.filter((e)=>{
              return e.category === courseCategory
             }).slice(0,3).map((data)=> <Card key={data._id} data = {data} />)
            }
      
       
      </div>:
      
      (
        <div className="mt-9">
          <div className="flex flex-wrap  space-x-4 space-y-4">
            <div></div>
            <div className="space-y-3 w-full border pb-3 px-2 md:w-[45%] lg:w-[30%]">
              <Skeleton variant="rectangular" height={200} />
              <Skeleton variant="rounded" height={20} />
              <Skeleton variant="rounded" height={30} />
              <div className="flex justify-around w-[100%] pt-7">
                <Skeleton variant="rounded" width={100} height={40} />
                <Skeleton variant="rounded" width={100} height={40} />
              </div>
            </div>
            <div className="space-y-3 w-full border pb-3 px-2 md:w-[45%] lg:w-[30%]">
              <Skeleton variant="rectangular" height={200} />
              <Skeleton variant="rounded" height={20} />
              <Skeleton variant="rounded" height={30} />
              <div className="flex justify-around w-[100%] pt-7">
                <Skeleton variant="rounded" width={100} height={40} />
                <Skeleton variant="rounded" width={100} height={40} />
              </div>
            </div>
            <div className="space-y-3 w-full border pb-3 px-2 md:w-[45%] lg:w-[30%]">
              <Skeleton variant="rectangular" height={200} />
              <Skeleton variant="rounded" height={20} />
              <Skeleton variant="rounded" height={30} />
              <div className="flex justify-around w-[100%] pt-7">
                <Skeleton variant="rounded" width={100} height={40} />
                <Skeleton variant="rounded" width={100} height={40} />
              </div>
            </div>
          </div>
        </div>
      )}

      <hr />
    </div>
  );
}

export default CourseCard;
