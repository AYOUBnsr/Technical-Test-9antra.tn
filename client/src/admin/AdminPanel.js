import React from "react";
import { Container, Typography, Paper, Box } from "@mui/material";
import CourseForm from "./CourseForm";
import CourseList from "./CourseList";

const AdminPanel = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Container>
                <Typography variant="h4" sx={{ margin: '20px 0' }}>Admin Panel</Typography>
                <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px' }}>
                    <CourseForm />
                </Paper>
                <Paper elevation={3} sx={{ padding: '20px' }}>
                    <CourseList />
                </Paper>
            </Container>
        </Box>
    );
};

export default AdminPanel;