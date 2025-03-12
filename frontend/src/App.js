import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Navigate } from 'react-router-dom';
import ReactPlayer from 'react-player'; // For video playback
import './App.css'; // Import the CSS file
import 'bootstrap/dist/css/bootstrap.min.css';

// Registration Component
const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await axios.post('http://localhost:5000/register', { name, email, password, role });
            alert('Registration successful!');
            navigate('/login');
        } catch (error) {
            console.error('Error registering:', error);
            alert('Registration failed');
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
            <button onClick={handleRegister}>Register</button>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
};

// Login Component
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', { email, password });
            alert(response.data.message);
            if (response.data.role === 'admin') {
                navigate('/admin-dashboard');
            } else {
                navigate('/user-dashboard');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Login failed');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
    );
};

// Admin Dashboard Component
const AdminDashboard = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [videoFiles, setVideoFiles] = useState([]);
    const [videoTitles, setVideoTitles] = useState([]);
    const [videoTags, setVideoTags] = useState([]);

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            videoFiles.forEach((file, index) => {
                formData.append('videos', file);
                formData.append('videoTitles', videoTitles[index]);
                formData.append('videoTags', videoTags[index]);
            });

            await axios.post('http://localhost:5000/upload-course', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Course uploaded!');
        } catch (error) {
            console.error('Error uploading course:', error);
            alert('Upload failed');
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <input type="text" placeholder="Course Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Course Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            {[0, 1, 2].map((index) => (
                <div key={index}>
                    <input type="text" placeholder={`Video ${index + 1} Title`} value={videoTitles[index] || ''} onChange={(e) => {
                        const newTitles = [...videoTitles];
                        newTitles[index] = e.target.value;
                        setVideoTitles(newTitles);
                    }} />
                    <select value={videoTags[index] || ''} onChange={(e) => {
                        const newTags = [...videoTags];
                        newTags[index] = e.target.value;
                        setVideoTags(newTags);
                    }}>
                        <option value="">Select Tag</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                    <input type="file" accept="video/*" onChange={(e) => {
                        const newFiles = [...videoFiles];
                        newFiles[index] = e.target.files[0];
                        setVideoFiles(newFiles);
                    }} />
                </div>
            ))}
            <button onClick={handleUpload}>Upload Course</button>
        </div>
    );
};

// User Dashboard Component
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

    // Disable right-click on the video player
    const disableRightClick = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <h1>User Dashboard</h1>
            <div className="courses-grid">  {/* Applied grid class */}
                {courses.map((course) => (
                    <div key={course._id} className="course-card"> {/* Added course-card class */}
                        <h2>{course.name}</h2>
                        <p>{course.description}</p>
                        <div>
                            <h3>Beginner</h3>
                            {course.videos.filter(video => video.tag === 'Beginner').map((video, index) => (
                                <div key={index}>
                                    <h4>{video.title}</h4>
                                    <div onContextMenu={disableRightClick}>
                                        <ReactPlayer
                                            url={`http://localhost:5000/video/${course._id}/${index}`}
                                            controls
                                            width="100%"
                                            height="auto"
                                            config={{
                                                file: {
                                                    attributes: {
                                                        controlsList: 'nodownload', // Disable download option
                                                    },
                                                },
                                            }}
                                            onError={(e) => console.error('Video playback error:', e)} // Log playback errors
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <h3>Intermediate</h3>
                            {course.videos.filter(video => video.tag === 'Intermediate').map((video, index) => (
                                <div key={index}>
                                    <h4>{video.title}</h4>
                                    <div onContextMenu={disableRightClick}>
                                        <ReactPlayer
                                            url={`http://localhost:5000/video/${course._id}/${index}`}
                                            controls
                                            width="100%"
                                            height="auto"
                                            config={{
                                                file: {
                                                    attributes: {
                                                        controlsList: 'nodownload', // Disable download option
                                                    },
                                                },
                                            }}
                                            onError={(e) => console.error('Video playback error:', e)} // Log playback errors
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <h3>Advanced</h3>
                            {course.videos.filter(video => video.tag === 'Advanced').map((video, index) => (
                                <div key={index}>
                                    <h4>{video.title}</h4>
                                    <div onContextMenu={disableRightClick}>
                                        <ReactPlayer
                                            url={`http://localhost:5000/video/${course._id}/${index}`}
                                            controls
                                            width="100%"
                                            height="auto"
                                            config={{
                                                file: {
                                                    attributes: {
                                                        controlsList: 'nodownload', // Disable download option
                                                    },
                                                },
                                            }}
                                            onError={(e) => console.error('Video playback error:', e)} // Log playback errors
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Main App Component
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect root to login */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/user-dashboard" element={<UserDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;