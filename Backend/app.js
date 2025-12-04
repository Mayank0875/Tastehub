const express = require('express')
const cors = require('cors')
const multer = require('multer')
const { createServer } = require('http')
const { Server } = require('socket.io')
require('dotenv').config()

// Import routes
const { fetch_problem } = require('./routes/fetch_problem')
const { fetch_single_problem_details } = require('./routes/fetch_single_problem_details')
const { submit_problem } = require('./routes/submit_problem')
const { register, login, getProfile, updateProfile } = require('./routes/auth')
const { 
    createProblem, 
    updateProblem, 
    deleteProblem, 
    addTestCases, 
    getUsers, 
    updateUser, 
    getStats 
} = require('./routes/admin')
const {
    createContest,
    getContests,
    getContestById,
    updateContest,
    deleteContest
} = require('./routes/contest')

// Import middleware
const { authenticateToken, requireAdmin, optionalAuth } = require('./middleware/auth')

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Vite default port
        methods: ["GET", "POST"]
    }
});
const PORT = 3030;

app.use(cors());
app.use(express.json());


const storage = multer.memoryStorage();
const upload = multer({ storage });

// WebSocket connection handling
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Make io available to other modules
app.set('io', io);

app.get('/', (req, res) => {
    res.send("Online Judge API is running...")
});

// Authentication routes
app.post('/auth/register', register);
app.post('/auth/login', login);
app.get('/auth/profile', authenticateToken, getProfile);
app.put('/auth/profile', authenticateToken, updateProfile);

// Problem routes (public)
app.get('/problem', fetch_problem);
app.get('/problem/:id', fetch_single_problem_details);

// Submission routes (require authentication)
app.post('/submit/:id/:ext', authenticateToken, upload.single("codeFile"), submit_problem);

// Admin routes (require admin role)
app.post('/admin/problems', authenticateToken, requireAdmin, createProblem);
app.put('/admin/problems/:id', authenticateToken, requireAdmin, updateProblem);
app.delete('/admin/problems/:id', authenticateToken, requireAdmin, deleteProblem);
app.post('/admin/problems/:id/testcases', authenticateToken, requireAdmin, addTestCases);
app.get('/admin/users', authenticateToken, requireAdmin, getUsers);
app.put('/admin/users/:id', authenticateToken, requireAdmin, updateUser);
app.get('/admin/stats', authenticateToken, requireAdmin, getStats);

// Contest routes
app.get('/contests', getContests);
app.get('/contests/:id', getContestById);
app.post('/admin/contests', authenticateToken, requireAdmin, createContest);
app.put('/admin/contests/:id', authenticateToken, requireAdmin, updateContest);
app.delete('/admin/contests/:id', authenticateToken, requireAdmin, deleteContest);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});