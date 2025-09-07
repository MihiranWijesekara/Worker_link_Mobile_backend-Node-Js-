const fs = require('fs');
const path = require('path');
const db = require('../config/db');
const workerService = require('../services/workerService');

// Add Worker Controller
const addWorker = (req, res) => {
  const {
    First_name,
    Last_name,
    Email,
    Password,
    Whatsapp_number,
    Address,
    Age,
    Work_type,
    Work_exp,
    Daily_charge,
    gig_description,
    About_me,
    Profile_image, // Base64-encoded image string
  } = req.body;

  // Validate required fields
  if (
    !First_name ||
    !Last_name ||
    !Email ||
    !Password ||
    !Whatsapp_number ||
    !Address ||
    !Age ||
    !Work_type ||
    !Work_exp ||
    !Daily_charge ||
    !gig_description ||
    !About_me
  ) {
    return res.status(400).json({ status: 'error', message: 'All fields are required.' });
  }

  // Initialize profileImagePath
  let profileImagePath = null;

  // Check if Profile_image is provided
  if (Profile_image) {
    // Define the directory to save the image
    const uploadDir = path.join(__dirname, '../uploads/profile_images');

    // Ensure the directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Generate a unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = `${uniqueSuffix}.jpg`; // Assuming the image is in JPEG format
    profileImagePath = `/uploads/profile_images/${filename}`;

    // Decode the Base64 string and save the image
    const imageBuffer = Buffer.from(Profile_image, 'base64');
    fs.writeFileSync(path.join(uploadDir, filename), imageBuffer);
  }

  const sql = `
    INSERT INTO worker_account (
      First_name, Last_name, Email, Password, Whatsapp_number, Address, Age, 
      Work_type, Work_exp, Daily_charge, gig_description, About_me, Profile_image
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    First_name,
    Last_name,
    Email,
    Password,
    Whatsapp_number,
    Address,
    Age,
    Work_type,
    Work_exp,
    Daily_charge,
    gig_description,
    About_me,
    profileImagePath,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting worker:', err);
      return res.status(500).json({ status: 'error', message: 'Failed to add worker.' });
    }

    return res.status(201).json({
      status: 'success',
      message: 'Worker added successfully!',
      workerId: result.insertId,
    });
  });
};

const fetchWorker = (req,res) => {
  const {email} = req.query;

  workerService.fetchWorker(email,(err,result) => {
    if(err){
      console.error('Error fetch worker:', err);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to fetch worker data.'
      });
    }
    if(result.status == 'error'){
      const statusCode = result.message == 'worker not found.'? 404:400;
      return res.status(statusCode).json(result);
    }
    return res.status(200).json(result);
  })
}

module.exports = { addWorker,fetchWorker };


