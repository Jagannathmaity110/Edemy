import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate;

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // Add duration to dummy courses
  const addDurationToCourses = (courses) => {
    return courses.map(course => ({
      ...course,
      duration: getCourseDuration(course.courseTitle) // Add duration based on course title
    }));
  };

  // Helper function to determine duration based on course title
  const getCourseDuration = (title) => {
    const durationMap = {
      'Introduction to JavaScript': '4 weeks',
      'Advanced Python Programming': '6 weeks',
      'Cybersecurity Basics': '5 weeks',
      'Web Development Bootcamp': '8 weeks',
      'Cloud Computing Essentials': '4 weeks',
      'Data Science with Python': '6 weeks',
      'Data Science and Machine Learning': '10 weeks',
      'Introduction to Cybersecurity': '4 weeks'
    };
    return durationMap[title] || '6 weeks'; // Default duration if not found
  };

  // Fetch All Courses
  const fetchAllCourses = async () => {
    const coursesWithDuration = addDurationToCourses(dummyCourses);
    setAllCourses(coursesWithDuration);
  };

  // Function to calculate average rating of the course
  const calculateRating = (course) => {
    if (course.courseRatings.length === 0) {
      return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach(rating => {
      totalRating += rating.rating;
    });
    return totalRating / course.courseRatings.length;
  };

  // Fetch User Enrolled Courses
  const fetchUserEnrolledCourses = async () => {
    const coursesWithDuration = addDurationToCourses(dummyCourses);
    setEnrolledCourses(coursesWithDuration);
  };

  useEffect(() => {
    fetchAllCourses();
    fetchUserEnrolledCourses();
  }, []);

  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating,
    isEducator,
    setIsEducator,
    enrolledCourses,
    fetchUserEnrolledCourses
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};