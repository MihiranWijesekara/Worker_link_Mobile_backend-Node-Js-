Controller → Only handles request & response.

Service → Contains actual business logic.

Model → Handles DB queries (or ORM calls).

Middleware → Authentication, validation, error handling.

Utils → Reusable helpers (JWT, email, hashing, file utils).


project/
├── config/             # Database, environment, logger configs
│   └── db.js
├── controllers/        # Handle HTTP requests/responses
│   └── workerController.js
├── services/           # Business logic (separate from controllers)
│   └── workerService.js
├── models/             # DB models (SQL queries or ORM schemas)
│   └── workerModel.js
├── middlewares/        # Auth, validation, error-handling
│   └── authMiddleware.js
├── routes/             # Route definitions
│   └── workerRoutes.js
├── utils/              # Helper functions (jwt, hashing, etc.)
│   └── jwtUtils.js
├── uploads/            # Uploaded files
├── server.js           # Entry point
└── .env                # Environment variables
