
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllCategory,
  getAllCourses,
  myCourse,
} from "../../Redux/slices/courseSlice";
import CourseCard from "./CourseCard";

function Courses() {
  const { courseCategory } = useSelector((state) => state?.course);

  const { data } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);

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
    <div className="mt-14">
      <div className="text-2xl font-bold">Our Courses</div>

        <div className="mt-9">
          {courseCategory &&
            courseCategory.map((category, index) => {
              return <CourseCard key={index} courseCategory={category} Loading={Loading}/>;
            })}
        </div>
      
    </div>
  );
}

export default Courses;
