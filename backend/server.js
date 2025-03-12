const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/videostream', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// User schema
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: String, // 'user' or 'admin'
});
const User = mongoose.model('User', userSchema);

// Course schema
const courseSchema = new mongoose.Schema({
    name: String,
    description: String,
    videos: [{
        title: String,
        tag: String, // Beginner, Intermediate, Advanced
        filePath: String, // Path to the video file
    }],
});
const Course = mongoose.model('Course', courseSchema);

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save uploaded files to the 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});
const upload = multer({ storage });

// Register a user
app.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const user = new User({ name, email, password: hashedPassword, role });
        await user.save();
        res.status(201).send('User registered!');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send('User not found');

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send('Invalid password');

        res.status(200).json({ message: 'Login successful', role: user.role });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Upload a course (admin only)
app.post('/upload-course', upload.array('videos'), async (req, res) => {
    try {
        const { name, description, videoTitles, videoTags } = req.body;

        // Map uploaded files to video objects
        const videos = req.files.map((file, index) => ({
            title: videoTitles[index],
            tag: videoTags[index],
            filePath: file.path,
        }));

        // Create a new course
        const course = new Course({ name, description, videos });
        await course.save();

        res.status(201).send('Course uploaded!');
    } catch (error) {
        console.error('Error uploading course:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Fetch all courses
app.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Stream a video
app.get('/video/:courseId/:videoIndex', async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);
        if (!course) return res.status(404).send('Course not found');

        const video = course.videos[req.params.videoIndex];
        if (!video) return res.status(404).send('Video not found');

        const videoPath = path.join(__dirname, video.filePath);
        const stat = fs.statSync(videoPath); // Get video file stats
        const fileSize = stat.size;
        const range = req.headers.range;

        if (range) {
            // Handle partial content (streaming)
            const parts = range.replace(/bytes=/, '').split('-');
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

            if (start >= fileSize) {
                return res.status(416).send('Requested range not satisfiable');
            }

            const chunkSize = end - start + 1;
            const file = fs.createReadStream(videoPath, { start, end });
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunkSize,
                'Content-Type': 'video/mp4',
            };

            res.writeHead(206, head);
            file.pipe(res);
        } else {
            // Handle full video request
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(200, head);
            fs.createReadStream(videoPath).pipe(res);
        }
    } catch (error) {
        console.error('Error streaming video:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});