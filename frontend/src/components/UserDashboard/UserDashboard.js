// src/components/UserDashboard/UserDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import './UserDashboard.css';

const UserDashboard = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/courses');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, []);

    // Function to generate a secure video URL with a token
    const getVideoUrl = (courseId, videoIndex) => {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        return `http://localhost:5000/video/${courseId}/${videoIndex}?token=${token}`;
    };

    // Disable right-click on the video player
    const disableRightClick = (e) => {
        e.preventDefault();
    };

    return (
        <div className="user-dashboard-container">
            <h1>User Dashboard</h1>
            <div className="courses-grid">
                {courses.map((course) => (
                    <div key={course._id} className="course-card">
                        <h2>{course.name}</h2>
                        <p>{course.description}</p>
                        <div>
                            <h3>Beginner</h3>
                            {course.videos.filter(video => video.tag === 'Beginner').map((video, index) => (
                                <div key={index}>
                                    <h4>{video.title}</h4>
                                    <div onContextMenu={disableRightClick}>
                                        <ReactPlayer
                                            url={getVideoUrl(course._id, index)} // Use token-based URL
                                            controls
                                            width="100%"
                                            height="auto"
                                            config={{
                                                file: {
                                                    attributes: {
                                                        controlsList: 'nodownload',
                                                    },
                                                },
                                            }}
                                            onError={(e) => console.error('Video playback error:', e)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Repeat for Intermediate and Advanced */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserDashboard;