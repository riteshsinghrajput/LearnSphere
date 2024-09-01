import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Card from "../../components/courses/Card";
import Layout from "../../Layout/Layout";
import { myCourse } from "../../Redux/slices/courseSlice";

function MyCourse() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state?.auth);
  const userCourse = useSelector((state) => state?.course?.myCourse);
  useEffect(() => {
    (async () => {
      await dispatch(myCourse(data?.role));
    })();
  }, []);

  return (
    <Layout>
      <div className="w-[70vw] mx-auto mb-6">
        <div className="space-x-4 space-y-4 flex flex-wrap  ">
          <div></div>
          {userCourse &&
            userCourse?.map((data) => {
              return <Card key={data._id} data={data} />;
            })}

          {userCourse.length == 0 && (
            <div className="h-[50vh] flex flex-col space-y-3 items-center justify-center w-[100vw]">
              <p>
                Currently you do not purchase any course , please purchase at
                least one course
              </p>
              <Link to="/courses">
                <div className="z-10 relative border-2 border-purple-400 rounded-md">
                  <button
                    className=" text-black px-4 py-2  text-xl transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-purple-600
                before:rounded-md before:transition-transform before:duration-300 before:content-['']  hover:text-white before:hover:scale-x-100"
                  >
                    Explore Course
                  </button>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default MyCourse;
