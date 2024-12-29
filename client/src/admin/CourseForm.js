import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Typography, Box } from "@mui/material";

const CourseForm = ({ course, fetchCourses, setEditing }) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (course) {
            setTitle(course.title);
            setPrice(course.price);
            setImage(course.image);
        }
    }, [course]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("price", price);
        if (image && typeof image !== 'string') {
            formData.append("image", image);
        }
        
        try {
            if (course) {
                // Update 
                await axios.put(`http://localhost:5000/api/courses/${course._id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                setEditing(false);
            } else {
                // Create 
                await axios.post("http://localhost:5000/api/courses", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            }
            fetchCourses();
            setTitle("");
            setPrice("");
            setImage(null);
        } catch (error) {
            console.error("Error saving course:", error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Typography variant="h6">{course ? "Edit Course" : "Add New Course"}</Typography>
            <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <TextField
                label="Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />
            <Button
                variant="contained"
                component="label"
            >
                Upload Image
                <input
                    type="file"
                    hidden
                    onChange={(e) => setImage(e.target.files[0])}
                />
            </Button>
            <Button type="submit" variant="contained" color="primary">
                {course ? "Update Course" : "Add Course"}
            </Button>
        </Box>
    );
};

export default CourseForm;