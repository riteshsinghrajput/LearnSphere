import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import TeacherCard from "../../components/cards/TeacherCard";
import Layout from "../../Layout/Layout";
import {
  getCourseDescription,
  getCourseInstructor,
} from "../../Redux/slices/courseSlice";

function CourseDescription() {
  const { courseId } = useParams();

  const { courseDescription, courseInstructor } = useSelector(
    (state) => state?.course
  );
  const dispatch = useDispatch();

  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      const res = await dispatch(getCourseDescription(courseId));

      await dispatch(getCourseInstructor(res?.payload?.course?.createdBy?.id));
    })();
  }, []);

  return (
    <Layout>
      {courseDescription && (
        <>
          <div>
            <div className=" pb-4  flex justify-center items-center w-[100vw] min-h-[60vh] bg-black text-white">
              <div className=" w-[80%] h-[80%] flex flex-wrap-reverse ">
                <div className="w-[100%] min-h-[60vh] lg:flex-1  flex  items-center ">
                  <div className="space-y-7">
                    <div></div>
                    <div className="font-bold text-4xl ">
                      {courseDescription?.title}
                    </div>
                    <div>{courseDescription?.description}</div>
                    <div className="text-2xl font-bold">
                      ₹ {courseDescription?.price}
                    </div>
                    <div className="flex space-x-4">
                      <div className="relative z-10 bg-purple-600 rounded-md border border-purple-600" onClick={() => navigate("/course/checkout", { state: { ...courseDescription } })}>
                        <button
                          className=" text-white font-bold text-sm px-10 py-3 transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0  before:bg-white 
                before:rounded-md before:transition-transform before:duration-300 before:content-['']  hover:text-purple-500 before:hover:scale-x-100"
                        >
                          Buy Now
                        </button>
                      </div>
                      {/* <div className="relative z-10 bg-white rounded-md border border-purple-600 text-purple-500">
                        <button
                          className="  font-bold text-sm px-10 py-3 transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0  before:bg-purple-600 
                before:rounded-md before:transition-transform before:duration-300 before:content-['']  hover:text-white before:hover:scale-x-100"
                        >
                          Add to cart
                        </button>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="w-[100%] pt-9 lg:pt-0 lg:min-h-[60vh] lg:flex-1 flex justify-center items-center ">
                  <div className="w-[100%] justify-center items-center flex">
                    <img
                      src={courseDescription?.thumbnail?.secure_url}
                      alt="course image"
                      className=" w-[100%] md:w-[80%] xl:w-[70%] rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[80vw] mx-auto mt-14 space-y-7 font-sans mb-[4rem]">
            <div className="space-x-4 border-l-8  border-purple-600 flex items-center h-10">
              <div></div>
              <div className="text-2xl font-bold ">
                Guidance by Experts: Our Esteemed Faculty
              </div>
            </div>
            <div>
              Experience excellence in mentorship from industry-leading
              professional
            </div>
            <div className="flex items-center justify-center">
              <TeacherCard courseInstructor={courseInstructor} />
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}

export default CourseDescription;
