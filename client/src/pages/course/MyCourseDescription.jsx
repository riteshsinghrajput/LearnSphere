// import { useEffect } from "react";
// import { useDispatch } from "react-redux"
// import { useLocation, useParams } from "react-router-dom"

// import Header from "../../components/courses/leactures/Header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {useParams } from "react-router-dom";

import { getLeacture } from "../../Redux/slices/courseSlice";
import LectureList from './LectureList';

const lectures = [
  {
    title: 'SOFTLY Official Music Video KARAN AUJLA | IKYY',
    description: 'Latest Punjabi Songs 2023',
    image: '/path_to_image.jpg', // Replace with actual image path
    completionStatus: 'Complete', // Example status
  },
  {
    title: 'SOFTLY Official Music Video KARAN AUJLA | IKYY',
    description: 'Latest Punjabi Songs 2023',
    image: '/path_to_image.jpg', // Replace with actual image path
    completionStatus: 'In Progress', // Example status
  },
  // Add more lectures as needed
];

const MyCourseDescription = () => {
  const {courseId}  = useParams()
    
  
    const dispatch= useDispatch();
    useEffect(()=>{
        (async()=>{
           await dispatch(getLeacture(courseId))


        })()
    },[])
  return (
  
    <div className="min-h-screen bg-gray-100 ">
      {/* <CourseHeader course = {state}/> */}
      <div className="">
        <LectureList lectures={lectures} />
      </div>
    </div>

  );
};

export default MyCourseDescription;

