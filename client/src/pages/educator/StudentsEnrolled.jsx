import React, { useEffect, useState } from 'react'
import { dummyStudentEnrolled } from '../../assets/assets'

const StudentsEnrolled = () => {
  const [enrolledStudents,setEnrolledStudents] = useState(null)
  const fetchEnrolledStudents = async ()=>{
    setEnrolledStudents(dummyStudentEnrolled)
  }
  useEffect(()=>{
    fetchEnrolledStudents()
  },[])
  return (
    <div>StudentsEnrolled</div>
  )
}

export default StudentsEnrolled