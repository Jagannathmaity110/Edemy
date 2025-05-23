import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const MyEnrollments = () => {
  const { enrolledCourses } = useContext(AppContext);
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const handleCourseClick = (courseId) => {
    navigate(`/player/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Learning Journey</h1>
          <p className="text-lg text-gray-600">Track your progress across all enrolled courses</p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="grid grid-cols-12 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
            <div className="col-span-6 md:col-span-5 font-semibold">Course</div>
            <div className="col-span-2 font-semibold hidden md:block">Duration</div>
            <div className="col-span-3 font-semibold">Progress</div>
            <div className="col-span-3 md:col-span-2 font-semibold">Status</div>
          </div>

          {enrolledCourses.map((course, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="grid grid-cols-12 items-center p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer" onClick={()=>handleCourseClick(course.id)}
            >
              <div className="col-span-6 md:col-span-5 flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img 
                    src={course.courseThumbnail} 
                    alt={course.courseTitle}
                    className="h-16 w-16 rounded-lg object-cover shadow-sm border border-gray-200"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{course.courseTitle}</h3>
                  <p className="text-sm text-gray-500 md:hidden">{course.duration}</p>
                </div>
              </div>

              <div className="col-span-2 text-gray-700 hidden md:block">
                {course.duration || "N/A"}
              </div>

              <div className="col-span-3">
                <div className="flex items-center space-x-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-500 h-2.5 rounded-full" 
                      style={{ width: '50%' }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">50%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">5/10 lectures completed</p>
              </div>

              <div className="col-span-3 md:col-span-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  <span className="w-2 h-2 mr-2 bg-blue-500 rounded-full animate-pulse"></span>
                  In Progress
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-8 text-center">
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
            Continue Learning
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default MyEnrollments;