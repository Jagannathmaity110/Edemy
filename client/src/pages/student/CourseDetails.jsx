import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import { assets } from "../../assets/assets";

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { allCourse = [], calculateRating } = useContext(AppContext); // Default empty array

  const fetchCourseData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!Array.isArray(allCourse)) {
        throw new Error("Courses data is not available");
      }

      const findCourse = allCourse.find((course) => course._id === id);
      
      if (!findCourse) {
        throw new Error("Course not found");
      }

      setCourseData(findCourse);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching course:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, [id, allCourse]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        <p>Error: {error}</p>
        <button 
          onClick={fetchCourseData}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="p-8 text-center">
        <p>Course not found</p>
      </div>
    );
  }

  const rating = calculateRating ? calculateRating(courseData) : 0;
  const roundedRating = Math.round(rating * 10) / 10;

  return (
    <div className="flex flex-col md:flex-row-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-full min-h-[500px] -z-10 bg-gradient-to-b from-cyan-100/70"></div>

      {/* Left column */}
      <div className="max-w-xl z-10 text-gray-500">
        <h1 className="md:text-4xl text-2xl md:leading-[44px] leading-[36px] font-semibold text-gray-800">
          {courseData.courseTitle}
        </h1>
        {/* Rest of your component... */}
      </div>
    </div>
  );
};

export default CourseDetails;