const express = require('express');
const { createServer } = require("http");
const { initSocket } = require('./socketIO.js');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const userRouter = require('./routes/userRoutes'); // Centralized routes
const checkoutRouter = require('./routes/checkoutRoutes');
const laptopRouter = require('./routes/laptopRouter');
const orderRouter = require('./routes/OrderRouter');
const NotificationRouter = require('./routes/notificationRouter');
const reportsRouter = require('./routes/reportsRoutes')
const connectDB = require('./config/connectDb'); // Database connection
require('dotenv').config(); // Load environment variables

const app = express();
const httpServer = createServer(app);
const io = initSocket(httpServer);

// Middleware setup
app.use(express.static('client'))
app.use(express.json());
app.use(cors());
app.use(helmet());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Mount routes
app.use('/api/v1/admin', userRouter);
app.use('/api/v1/checkout', checkoutRouter);
app.use('/api/v1/laptop', laptopRouter);
app.use('/api/v1/Orders', orderRouter);
app.use('/api/v1/Notifications', NotificationRouter);
app.use('/api/v1/reports', reportsRouter);
// Handle 404 errors
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Resource not found',
    });
});

// Global error handler (optional, centralized error handling)
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Server Error',
    });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        httpServer.listen(3000, () => {
            console.log(`Server running on port 3000`);
        });
    } catch (err) {
        console.error("Failed to start server:", err.message);
        process.exit(1);
    }
};

startServer();

module.exports = { io }