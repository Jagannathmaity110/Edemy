import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import CourseCard from './CourseCard';

const CourseSection = () => {
  const { allCourses } = useContext(AppContext);

  return (
    <div className='py-8 md:py-16 px-4 md:px-40'>
      <h2 className='text-2xl md:text-3xl font-medium text-gray-800'>Learn from the best</h2>
      <p className='text-sm md:text-base text-gray-500 mt-2 md:mt-3'>
        Discover our top-rated courses across various categories. From coding and design to business and wellness,
        our courses are crafted to deliver results.
      </p>
      
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 md:mt-16'>
        {allCourses.slice(0, 4).map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      <div className='mt-10 text-center'>
        <Link 
          to='/course-list' 
          onClick={() => window.scrollTo(0, 0)}
          className='inline-block border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-6 py-2 md:px-10 md:py-3 rounded-lg transition-colors duration-200'
        >
          Show all courses
        </Link>
      </div>
    </div>
  );
};

export default CourseSection;