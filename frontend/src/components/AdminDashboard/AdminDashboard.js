import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [videos, setVideos] = useState([{ title: '', tag: '', file: null }]);
    const [courses, setCourses] = useState([]);
    const [editingCourseId, setEditingCourseId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch all courses on component mount
    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:5000/courses');
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleAddVideo = () => {
        if (videos.length < 10) {
            setVideos([...videos, { title: '', tag: '', file: null }]);
        } else {
            alert('Maximum of 10 videos allowed per course.');
        }
    };

    const handleRemoveVideo = (index) => {
        if (videos.length > 1) {
            const updatedVideos = videos.filter((_, i) => i !== index);
            setVideos(updatedVideos);
        } else {
            alert('At least one video is required.');
        }
    };

    const handleVideoChange = (index, field, value) => {
        const updatedVideos = [...videos];
        updatedVideos[index][field] = value;
        setVideos(updatedVideos);
    };

    const handleUpload = async () => {
        try {
            if (!name || !description || videos.some(video => !video.title || !video.tag || !video.file)) {
                alert('Please fill all fields before uploading.');
                return;
            }

            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);

            videos.forEach((video, index) => {
                formData.append('videos', video.file); // Append files directly
                formData.append(`videoTitles[${index}]`, video.title); // Append titles
                formData.append(`videoTags[${index}]`, video.tag); // Append tags
            });

            if (editingCourseId) {
                await axios.put(`http://localhost:5000/courses/${editingCourseId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                alert('Course updated successfully!');
            } else {
                await axios.post('http://localhost:5000/upload-course', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                alert('Course uploaded successfully!');
            }

            resetForm();
            fetchCourses();
        } catch (error) {
            console.error('Error uploading/updating course:', error);
            alert('Operation failed. Please try again.');
        }
    };

    const handleEditCourse = (course) => {
        setName(course.name);
        setDescription(course.description);
        setVideos(course.videos.map(video => ({ ...video, file: null }))); // Reset file inputs
        setEditingCourseId(course._id);
    };

    const handleDeleteCourse = async (courseId) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                await axios.delete(`http://localhost:5000/courses/${courseId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                alert('Course deleted successfully!');
                fetchCourses();
            } catch (error) {
                console.error('Error deleting course:', error);
                alert('Deletion failed. Please try again.');
            }
        }
    };

    const resetForm = () => {
        setName('');
        setDescription('');
        setVideos([{ title: '', tag: '', file: null }]);
        setEditingCourseId(null);
    };

    const filteredCourses = courses.filter(course =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="admin-dashboard-container">
            <h1>Admin Dashboard</h1>

            {/* Course Form */}
            <div className="course-form">
                <h2>{editingCourseId ? 'Edit Course' : 'Add New Course'}</h2>
                <div className="form-group">
                    <label>Course Name</label>
                    <input
                        type="text"
                        placeholder="Enter course name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Course Description</label>
                    <textarea
                        placeholder="Enter course description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                {videos.map((video, index) => (
                    <div key={index} className="video-group">
                        <h3>Video {index + 1}</h3>
                        <div className="form-group">
                            <label>Video Title</label>
                            <input
                                type="text"
                                placeholder="Enter video title"
                                value={video.title}
                                onChange={(e) => handleVideoChange(index, 'title', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Video Tag</label>
                            <select
                                value={video.tag}
                                onChange={(e) => handleVideoChange(index, 'tag', e.target.value)}
                            >
                                <option value="">Select Tag</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Upload Video</label>
                            <input
                                type="file"
                                accept="video/*"
                                onChange={(e) => handleVideoChange(index, 'file', e.target.files[0])}
                            />
                        </div>
                        {videos.length > 1 && (
                            <button
                                className="remove-video-btn"
                                onClick={() => handleRemoveVideo(index)}
                            >
                                Remove Video
                            </button>
                        )}
                    </div>
                ))}

                <div className="actions">
                    <button className="add-video-btn" onClick={handleAddVideo}>
                        Add Video
                    </button>
                    <button className="upload-btn" onClick={handleUpload}>
                        {editingCourseId ? 'Update Course' : 'Upload Course'}
                    </button>
                    {editingCourseId && (
                        <button className="cancel-btn" onClick={resetForm}>
                            Cancel Edit
                        </button>
                    )}
                </div>
            </div>

            {/* Course List */}
            <div className="course-list">
                <h2>All Courses</h2>
                <input
                    type="text"
                    placeholder="Search courses by name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {filteredCourses.map((course) => (
                    <div key={course._id} className="course-item">
                        <h3>{course.name}</h3>
                        <p>{course.description}</p>
                        <div className="course-actions">
                            <button
                                className="edit-btn"
                                onClick={() => handleEditCourse(course)}
                            >
                                Edit
                            </button>
                            <button
                                className="delete-btn"
                                onClick={() => handleDeleteCourse(course._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;