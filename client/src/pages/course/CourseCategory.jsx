import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Card from "../../components/courses/Card";
import Layout from "../../Layout/Layout";
import { getCategoryCourse, myCourse } from "../../Redux/slices/courseSlice";

function CourseCategory() {

     const {category} = useParams()

     const categoryUpperCase = category?.replace(/-/g, ' ').toUpperCase()

     const { data } = useSelector((state) => state?.auth);
     const { courseCategoryData } = useSelector((state) => state?.course);
     // const navigate = useNavigate();
     const dispatch = useDispatch();
   
     useEffect(() => {
       (async () => {
        await dispatch(myCourse(data?.role));
         await dispatch(getCategoryCourse(category));
       })();
     }, []);
     
  return (
    <Layout>
        <div className="w-[80vw] mx-auto mb-4 mt-14">
      <div className=" flex justify-between">
        <div className="text-purple-600 text-xl font-bold">{categoryUpperCase}</div>
      </div>

      <div className="space-x-4 space-y-4 flex flex-wrap">
            <div> </div>
            {courseCategoryData && 
             courseCategoryData.map((data , index)=> <Card key={index} data = {data}/>)
            }
           
           
           
        </div>
        </div>
    </Layout>
  );
}

export default CourseCategory;
