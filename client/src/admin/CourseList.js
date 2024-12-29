import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Typography, Card, CardContent, CardMedia, Grid } from "@mui/material";
import CourseForm from "./CourseForm";

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [editing, setEditing] = useState(false);
    const [currentCourse, setCurrentCourse] = useState(null);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/courses");
            setCourses(response.data);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    const handleEdit = (course) => {
        setEditing(true);
        setCurrentCourse(course);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/courses/${id}`);
            fetchCourses();
        } catch (error) {
            console.error("Error deleting course:", error);
        }
    };

    return (
        <div>
            <Typography variant="h6">Course List</Typography>
            <Grid container spacing={2}>
                {courses.map((course) => (
                    <Grid item key={course._id} xs={12} md={6} lg={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={`http://localhost:5000/${course.image}`}
                                alt={course.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {course.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Price: {course.price} DT/Month
                                </Typography>
                                <Button variant="outlined" onClick={() => handleEdit(course)} sx={{ mt: 2 }}>
                                    Edit
                                </Button>
                                <Button variant="contained" color="secondary" onClick={() => handleDelete(course._id)} sx={{ mt: 2, ml: 2 }}>
                                    Delete
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {editing && currentCourse && (
                <div>
                    <Typography variant="h6" sx={{ mt: 4 }}>Edit Course</Typography>
                    <CourseForm course={currentCourse} fetchCourses={fetchCourses} setEditing={setEditing} />
                </div>
            )}
        </div>
    );
};

export default CourseList;