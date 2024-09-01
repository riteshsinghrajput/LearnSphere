import {time} from '../../helper/time'

const CourseHeader = ({course}) => {
     const timeUpdate =  time(course?.updatedAt)
  return (
    <div className="bg-purple-600 text-white p-6 rounded-t-lg">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">{course?.title}</h1>
          <p className="text-lg mt-2">Best {course?.category?.toLowerCase()} Batch</p>
        </div>

      </div>
      <div className="mt-4 flex items-center text-sm">
        <span className="mr-4 ">Responsible: <span className="font-bold">{course?.createdBy?.name?.toUpperCase()}</span></span>
        <span className="mr-4">Last Update: {timeUpdate.istDateString}</span>
        <span>Course Duration: {course?.duration}</span>
      </div>
    </div>
  );
};

export default CourseHeader;
