# 📚 Arena API Documentation

## Base URL
```
http://localhost:3030
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Endpoints

### 1. Register User
Create a new user account.

**Endpoint:** `POST /auth/register`  
**Auth Required:** No

**Request Body:**
```json
{
  "username": "string (required, unique)",
  "email": "string (required, unique, valid email)",
  "password": "string (required, min 6 characters)"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "username": "testuser",
      "email": "test@example.com",
      "role": "USER",
      "createdAt": "2024-12-04T10:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- `400` - Validation error (missing fields, password too short)
- `409` - Username or email already exists
- `500` - Internal server error

---

### 2. Login
Authenticate and receive JWT token.

**Endpoint:** `POST /auth/login`  
**Auth Required:** No

**Request Body:**
```json
{
  "username": "string (required, can be username or email)",
  "password": "string (required)"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "username": "testuser",
      "email": "test@example.com",
      "role": "USER",
      "createdAt": "2024-12-04T10:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- `400` - Missing username or password
- `401` - Invalid credentials
- `500` - Internal server error

---

### 3. Get Profile
Get current user's profile information.

**Endpoint:** `GET /auth/profile`  
**Auth Required:** Yes (User or Admin)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com",
    "role": "USER",
    "createdAt": "2024-12-04T10:00:00.000Z",
    "updatedAt": "2024-12-04T10:00:00.000Z"
  }
}
```

**Error Responses:**
- `401` - Access token required / Invalid token
- `404` - User not found
- `500` - Internal server error

---

### 4. Update Profile
Update current user's profile.

**Endpoint:** `PUT /auth/profile`  
**Auth Required:** Yes (User or Admin)

**Request Body:**
```json
{
  "username": "string (optional)",
  "email": "string (optional)"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": 1,
    "username": "newusername",
    "email": "newemail@example.com",
    "role": "USER",
    "createdAt": "2024-12-04T10:00:00.000Z",
    "updatedAt": "2024-12-04T11:00:00.000Z"
  }
}
```

**Error Responses:**
- `401` - Unauthorized
- `409` - Username or email already taken
- `500` - Internal server error

---

## 📝 Problem Endpoints

### 5. Get All Problems
Retrieve list of all problems (public).

**Endpoint:** `GET /problem`  
**Auth Required:** No

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Two Sum",
      "rating": 800,
      "tags": ["array", "hash-table"],
      "description": "Problem description...",
      "constraints": "Constraints...",
      "sampleInput": "Sample input...",
      "sampleOutput": "Sample output...",
      "notes": "Notes...",
      "createdAt": "2024-12-04T10:00:00.000Z"
    }
  ]
}
```

---

### 6. Get Problem by ID
Retrieve single problem details (public).

**Endpoint:** `GET /problem/:id`  
**Auth Required:** No

**URL Parameters:**
- `id` - Problem ID (integer)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Two Sum",
    "rating": 800,
    "tags": ["array", "hash-table"],
    "description": "Problem description...",
    "constraints": "Constraints...",
    "sampleInput": "Sample input...",
    "sampleOutput": "Sample output...",
    "notes": "Notes...",
    "createdAt": "2024-12-04T10:00:00.000Z",
    "testCases": [
      {
        "id": 1,
        "input": "Test input",
        "output": "Expected output"
      }
    ]
  }
}
```

**Error Responses:**
- `404` - Problem not found
- `500` - Internal server error

---

### 7. Create Problem ✅ (CAPSTONE REQUIREMENT)
Create a new coding problem (Admin only).

**Endpoint:** `POST /admin/problems`  
**Auth Required:** Yes (Admin only)

**Request Body:**
```json
{
  "title": "string (required, unique)",
  "rating": "integer (required)",
  "tags": "string (required, JSON array as string)",
  "description": "string (required)",
  "constraints": "string (required)",
  "sampleInput": "string (required)",
  "sampleOutput": "string (required)",
  "notes": "string (optional)",
  "testCases": [
    {
      "input": "string (required)",
      "output": "string (required)"
    }
  ]
}
```

**Example:**
```json
{
  "title": "Two Sum",
  "rating": 800,
  "tags": "[\"array\", \"hash-table\"]",
  "description": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
  "constraints": "2 <= nums.length <= 10^4",
  "sampleInput": "[2,7,11,15]\n9",
  "sampleOutput": "[0,1]",
  "notes": "You may assume that each input would have exactly one solution.",
  "testCases": [
    {
      "input": "[2,7,11,15]\n9",
      "output": "[0,1]"
    },
    {
      "input": "[3,2,4]\n6",
      "output": "[1,2]"
    }
  ]
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Problem created successfully",
  "data": {
    "problem": {
      "id": 1,
      "title": "Two Sum",
      "rating": 800,
      "tags": ["array", "hash-table"],
      "description": "...",
      "createdAt": "2024-12-04T10:00:00.000Z"
    },
    "testCases": [...]
  }
}
```

**Error Responses:**
- `400` - Validation error (missing required fields)
- `401` - Unauthorized (no token)
- `403` - Forbidden (not admin)
- `500` - Internal server error

---

### 8. Update Problem ✅ (CAPSTONE REQUIREMENT)
Update an existing problem (Admin only).

**Endpoint:** `PUT /admin/problems/:id`  
**Auth Required:** Yes (Admin only)

**URL Parameters:**
- `id` - Problem ID (integer)

**Request Body (all fields optional):**
```json
{
  "title": "string (optional)",
  "rating": "integer (optional)",
  "tags": "string (optional, JSON array)",
  "description": "string (optional)",
  "constraints": "string (optional)",
  "sampleInput": "string (optional)",
  "sampleOutput": "string (optional)",
  "notes": "string (optional)"
}
```

**Example:**
```json
{
  "title": "Two Sum (Updated)",
  "rating": 900,
  "description": "Updated description with more details."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Problem updated successfully",
  "data": {
    "id": 1,
    "title": "Two Sum (Updated)",
    "rating": 900,
    "description": "Updated description...",
    "updatedAt": "2024-12-04T11:00:00.000Z"
  }
}
```

**Error Responses:**
- `401` - Unauthorized
- `403` - Forbidden (not admin)
- `404` - Problem not found
- `500` - Internal server error

---

### 9. Delete Problem ✅ (CAPSTONE REQUIREMENT)
Delete a problem and its test cases (Admin only).

**Endpoint:** `DELETE /admin/problems/:id`  
**Auth Required:** Yes (Admin only)

**URL Parameters:**
- `id` - Problem ID (integer)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Problem deleted successfully"
}
```

**Error Responses:**
- `401` - Unauthorized
- `403` - Forbidden (not admin)
- `404` - Problem not found
- `500` - Internal server error

---

## 🏆 Contest Endpoints

### 10. Get All Contests
Retrieve list of all contests (public).

**Endpoint:** `GET /contests`  
**Auth Required:** No

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Weekly Contest 1",
      "description": "Contest description...",
      "problemIds": [1, 2, 3],
      "startsAt": "2024-12-10T10:00:00.000Z",
      "endsAt": "2024-12-10T12:00:00.000Z",
      "createdAt": "2024-12-04T10:00:00.000Z"
    }
  ]
}
```

---

### 11. Get Contest by ID
Retrieve single contest with problem details (public).

**Endpoint:** `GET /contests/:id`  
**Auth Required:** No

**URL Parameters:**
- `id` - Contest ID (integer)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Weekly Contest 1",
    "description": "Contest description...",
    "problemIds": [1, 2],
    "startsAt": "2024-12-10T10:00:00.000Z",
    "endsAt": "2024-12-10T12:00:00.000Z",
    "createdAt": "2024-12-04T10:00:00.000Z",
    "problems": [
      {
        "id": 1,
        "title": "Two Sum",
        "rating": 800,
        "tags": ["array"]
      }
    ]
  }
}
```

**Error Responses:**
- `404` - Contest not found
- `500` - Internal server error

---

### 12. Create Contest ✅ (CAPSTONE REQUIREMENT)
Create a new contest (Admin only).

**Endpoint:** `POST /admin/contests`  
**Auth Required:** Yes (Admin only)

**Request Body:**
```json
{
  "name": "string (required)",
  "description": "string (required)",
  "problemIds": "array of integers (required, min 1)",
  "startsAt": "ISO 8601 datetime (required)",
  "endsAt": "ISO 8601 datetime (required, must be after startsAt)"
}
```

**Example:**
```json
{
  "name": "Weekly Contest 1",
  "description": "First weekly coding contest with beginner-friendly problems",
  "problemIds": [1, 2, 3],
  "startsAt": "2024-12-10T10:00:00Z",
  "endsAt": "2024-12-10T12:00:00Z"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Contest created successfully",
  "data": {
    "id": 1,
    "name": "Weekly Contest 1",
    "description": "...",
    "problemIds": [1, 2, 3],
    "startsAt": "2024-12-10T10:00:00.000Z",
    "endsAt": "2024-12-10T12:00:00.000Z",
    "createdAt": "2024-12-04T10:00:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Validation error (missing fields, invalid dates, invalid problem IDs)
- `401` - Unauthorized
- `403` - Forbidden (not admin)
- `500` - Internal server error

---

### 13. Update Contest ✅ (CAPSTONE REQUIREMENT)
Update an existing contest (Admin only).

**Endpoint:** `PUT /admin/contests/:id`  
**Auth Required:** Yes (Admin only)

**URL Parameters:**
- `id` - Contest ID (integer)

**Request Body (all fields optional):**
```json
{
  "name": "string (optional)",
  "description": "string (optional)",
  "problemIds": "array of integers (optional)",
  "startsAt": "ISO 8601 datetime (optional)",
  "endsAt": "ISO 8601 datetime (optional)"
}
```

**Example:**
```json
{
  "name": "Weekly Contest 1 (Extended)",
  "description": "Extended contest with more time",
  "endsAt": "2024-12-10T14:00:00Z"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Contest updated successfully",
  "data": {
    "id": 1,
    "name": "Weekly Contest 1 (Extended)",
    "description": "Extended contest...",
    "problemIds": [1, 2, 3],
    "startsAt": "2024-12-10T10:00:00.000Z",
    "endsAt": "2024-12-10T14:00:00.000Z",
    "updatedAt": "2024-12-04T11:00:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Validation error
- `401` - Unauthorized
- `403` - Forbidden (not admin)
- `404` - Contest not found
- `500` - Internal server error

---

### 14. Delete Contest ✅ (CAPSTONE REQUIREMENT)
Delete a contest (Admin only).

**Endpoint:** `DELETE /admin/contests/:id`  
**Auth Required:** Yes (Admin only)

**URL Parameters:**
- `id` - Contest ID (integer)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Contest deleted successfully"
}
```

**Error Responses:**
- `401` - Unauthorized
- `403` - Forbidden (not admin)
- `404` - Contest not found
- `500` - Internal server error

---

## 👥 Admin User Management

### 15. Get All Users
List all users with pagination (Admin only).

**Endpoint:** `GET /admin/users`  
**Auth Required:** Yes (Admin only)

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": 1,
        "username": "testuser",
        "email": "test@example.com",
        "role": "USER",
        "isActive": true,
        "createdAt": "2024-12-04T10:00:00.000Z",
        "_count": {
          "submission": 5
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "pages": 3
    }
  }
}
```

---

### 16. Update User
Update user role or status (Admin only).

**Endpoint:** `PUT /admin/users/:id`  
**Auth Required:** Yes (Admin only)

**URL Parameters:**
- `id` - User ID (integer)

**Request Body:**
```json
{
  "role": "string (optional, USER or ADMIN)",
  "isActive": "boolean (optional)"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": 2,
    "username": "testuser",
    "email": "test@example.com",
    "role": "ADMIN",
    "isActive": true,
    "updatedAt": "2024-12-04T11:00:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Cannot modify own role/status
- `401` - Unauthorized
- `403` - Forbidden (not admin)
- `404` - User not found
- `500` - Internal server error

---

### 17. Get System Statistics
Get system-wide statistics (Admin only).

**Endpoint:** `GET /admin/stats`  
**Auth Required:** Yes (Admin only)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "totalProblems": 50,
    "totalUsers": 100,
    "totalSubmissions": 500,
    "recentSubmissions": 25
  }
}
```

---

## 🔒 HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input/validation error |
| 401 | Unauthorized - Missing or invalid token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Resource already exists |
| 500 | Internal Server Error - Server error |

---

## 🛡️ Security Notes

1. **JWT Tokens**: Expire after 7 days
2. **Password Requirements**: Minimum 6 characters
3. **Password Storage**: Hashed with bcrypt (12 rounds)
4. **Admin Routes**: Protected by role-based middleware
5. **Input Validation**: All endpoints validate input data
6. **CORS**: Configured for frontend access

---

## 📝 Notes

- All datetime fields use ISO 8601 format
- JSON arrays in request bodies should be stringified
- Tokens are automatically saved in Postman collection variables
- Admin role must be set manually in database or via admin panel
- Test cases are automatically deleted when a problem is deleted (cascade)

---

**For complete examples, see:** `Arena_Postman_Collection.json`  
**For demo guide, see:** `DEMO_GUIDE.md`  
**For quick reference, see:** `QUICK_REFERENCE.md`
