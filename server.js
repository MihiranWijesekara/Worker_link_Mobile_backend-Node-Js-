const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const workerRoutes = require('./routes/workerRoutes');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use(cors());

// Routes
app.use('/api/workers', workerRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
