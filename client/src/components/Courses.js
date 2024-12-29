import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Courses.css';

const Courses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/courses')
            .then(response => setCourses(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <section className="courses">
            <div className="courses-header">
                <h2>Discover Our Courses</h2>
                <button className="view-more-btn">View More</button>
            </div>
            <div className="course-list">
                {courses.map(course => (
                    <div className="course" key={course._id}>
                        <img src={`http://localhost:5000/${course.image}`} alt={course.title} />
                        <h3>{course.title}</h3>
                        <p>{course.price} DT/Month</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Courses;
