# FlatMotion: AI-Powered Animation Studio
## Complete Project Description

---

## 1. Project Overview

### 1.1 What is FlatMotion?

**FlatMotion** is a full-stack web application that empowers users to generate professional-quality 2D mathematical animations by simply describing them in natural language. The system leverages state-of-the-art AI models to convert text prompts into executable Python code, which is then rendered into video files using the Manim (Mathematical Animation Engine) library.

#### Live Deployment
- **Frontend**: https://flat-motion.vercel.app (Next.js on Vercel)
- **Backend**: https://flatmotion-server.onrender.com (Docker on Render)

### 1.2 The Problem It Solves

**Traditional animation creation is labor-intensive:**
- Creating 2D mathematical animations requires deep knowledge of graphics programming
- Learning Manim, Python, and animation concepts takes significant time
- Iterating on animation designs is slow and technical
- Non-technical users cannot easily create professional animations

**FlatMotion solves this by:**
1. Accepting plain English descriptions of desired animations
2. Using AI to generate correct, executable Manim code automatically
3. Rendering the code into video files with zero human intervention
4. Providing a web-based interface accessible to anyone

### 1.3 Main Goals and Objectives

| Goal | Description |
|------|-------------|
| **Democratize Animation Creation** | Enable non-programmers to create professional animations |
| **AI-Powered Code Generation** | Use LLMs to intelligently translate prompts into Manim code |
| **Multi-Provider Support** | Support multiple AI providers (Gemini, Claude, Groq, OpenRouter, HuggingFace) |
| **Project Management** | Allow users to organize, save, and manage animation projects |
| **Gallery & Discovery** | Showcase generated animations; enable sharing and exploration |
| **Admin Controls** | Provide admins with user management and system monitoring |
| **Donation System** | Enable users to support the platform via donations |
| **Production-Ready** | Deploy on scalable, containerized infrastructure |

---

## 2. Core Features & Functionality

### 2.1 Feature List

| Feature | Description | User Type |
|---------|-------------|-----------|
| **User Authentication** | Secure email/password registration and login | All Users |
| **Dashboard** | Central hub for managing projects and viewing animations | Authenticated Users |
| **AI Animation Generator** | Create animations by typing natural language descriptions | Authenticated Users |
| **Multi-Provider AI** | Choose between 5+ AI providers and multiple models | Authenticated Users |
| **Project Management** | Create, edit, delete, and organize animation projects | Authenticated Users |
| **Animation Gallery** | Browse and view all generated animations | All Users |
| **Generation History** | Track job status, view errors, regenerate failed animations | Authenticated Users |
| **Admin Dashboard** | Monitor users, projects, and system health | Admin Users |
| **Donation System** | Support the platform with payments via SSLCommerz | All Users |
| **Real-Time Status Updates** | Poll job status and receive live progress feedback | Authenticated Users |
| **Cloud Storage** | Store videos on Cloudinary with 7-day retention | System |
| **Error Handling & Auto-Retry** | Capture errors, retry with feedback, show user-friendly messages | System |

### 2.2 How Each Feature Works

#### **2.2.1 User Authentication**
```
User Flow: Register/Login → Email Verification (optional) → Session Storage → API Requests with Auth
```
- Uses **Better Auth** library for secure session management
- Stores user credentials in PostgreSQL
- Supports multiple authentication methods
- Sessions stored as cookies with CSRF protection
- Role-based access control (USER, ADMIN)

#### **2.2.2 Dashboard**
```
User See → Projects List + AI Composer + Gallery
```
- **Left Sidebar**: List of user's projects with quick navigation
- **Main Area**: Project details, animation generation interface
- **Real-Time Updates**: Polling mechanism to track job status
- **Visual Feedback**: Loading animations, progress indicators, error alerts
- **Responsive Design**: Works seamlessly on mobile and desktop

#### **2.2.3 AI Animation Generator**
```
User Input (Prompt) → Backend API → LLM → Python Code → Manim Render → Video → Cloud Storage → Display
```

**Detailed Steps:**
1. User types a prompt describing desired animation (e.g., "animated equation solving")
2. Frontend sends `POST /api/ai/generate-animation` with:
   - `prompt`: The user's description
   - `projectId`: Which project to save under
   - `provider`: Selected AI provider
   - `model`: Selected AI model
   - `apiKey` (optional): Custom user API key

3. Backend creates an `AnimationJob` record with status `pending`
4. API returns `202 Accepted` with `jobId` immediately
5. Worker process begins asynchronously:
   - **Step 1**: Calls selected AI provider with a specialized Manim prompt
   - **Step 2**: AI returns Python code with Manim animation
   - **Step 3**: Extracts pure code from LLM response (handles markdown fences)
   - **Step 4**: Writes Python file to temporary directory
   - **Step 5**: Executes Manim via `python3 -m manim render`
   - **Step 6**: If render fails, auto-retry (up to 10 times) with error feedback to LLM
   - **Step 7**: Upload rendered MP4 to Cloudinary
   - **Step 8**: Update job record with final status and video URL

6. Frontend polls `/api/animations/:jobId` to track progress
7. When complete, video displayed in gallery

#### **2.2.4 Multi-Provider AI Support**
```
Supported Providers:
├── Anthropic Claude (models: claude-3-opus, claude-3-sonnet, etc.)
├── Google Gemini (models: gemini-pro, gemini-1.5-pro, etc.)
├── Groq (fast inference)
├── OpenRouter (aggregator)
└── HuggingFace (open-source models)
```

**How It Works:**
- Provider registry pattern allows pluggable AI providers
- Each provider implements `generateText(request)` interface
- Users can provide custom API keys or use system defaults
- Fallback mechanism if primary provider fails

#### **2.2.5 Project Management**
```
CRUD Operations:
- Create: User creates new project with title + description
- Read: Fetch all user's projects or specific project details
- Update: Edit project title/description
- Delete: Remove project and all associated animations
```

Each project contains:
- `id`: Unique identifier
- `userId`: Owner of project
- `title`: Project name
- `description`: Optional description
- `animationJobs[]`: Array of animations in project
- `createdAt`, `updatedAt`: Timestamps

#### **2.2.6 Animation Gallery**
```
Public Gallery:
- Browse all animations across all users
- Filter by creation date
- Search by title
- View animation metadata (creator, date, status)
```

#### **2.2.7 Admin Dashboard**
```
Admin Controls:
├── User Management
│   ├── View all registered users
│   ├── Filter by role/status
│   └── Monitor user creation dates
├── Project Monitoring
│   ├── View all projects across platform
│   ├── Track animation job statistics
│   └── Monitor system load
└── System Health
    ├── Database status
    ├── API health checks
    └── Error logs
```

#### **2.2.8 Real-Time Status Updates**
```
Frontend Polling Mechanism:
User initiates job → Frontend stores jobId → 
Polls /api/animations/:jobId every 1-2 seconds →
Updates UI with status: pending → generating_code → rendering → uploading → done
```

Job Status States:
- `pending`: Waiting to process
- `processing`: Worker picked up job
- `generating_code`: AI is generating Python code
- `rendering`: Manim is rendering
- `uploading`: Uploading to cloud storage
- `done`: Complete, video available
- `failed`: Error occurred
- `expired`: Video retention period exceeded

#### **2.2.9 Donation System**
```
User clicks "Donate" → 
Selects amount + currency (BDT, USD, etc.) →
Backend initiates SSLCommerz payment gateway →
User redirects to payment page →
Callback to backend on success/failure →
Redirect back to frontend with transaction status
```

Database stores:
- `id`: Donation record
- `userId`: Who donated (optional, for guest donations)
- `amount`, `currency`
- `tranId`: Transaction ID from SSLCommerz
- `status`: pending/success/failed
- `createdAt`, `updatedAt`

#### **2.2.10 Error Handling & Auto-Retry**
```
Render Attempt 1 → Python Error → Extract Error Details →
Build Retry Prompt (include original error) →
LLM generates fixed code →
Render Attempt 2 → ... (repeat up to 10 times) →
If success: upload and complete
If all retries fail: Store user-friendly error message
```

---

## 3. System Architecture

### 3.1 Overall Architecture Pattern

**Frontend-Backend Separation with Asynchronous Job Processing**

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENT (Next.js)                     │
│  ├─ Pages (Dashboard, Gallery, Payment, Admin)          │
│  ├─ Components (AI Composer, Project Manager)           │
│  ├─ Hooks (useAIChat, useProjects, useAnimationJobs)   │
│  └─ Auth Context (Session management)                  │
└───────────────────┬─────────────────────────────────────┘
                    │ REST API + WebSocket (polling)
                    ↓
┌─────────────────────────────────────────────────────────┐
│              BACKEND (Express + Node.js)                 │
│  ├─ Routes (Modular: /api/users, /api/projects, etc.)  │
│  ├─ Controllers (Handle HTTP requests)                  │
│  ├─ Services (Business logic)                           │
│  ├─ Worker (Async animation processing)                 │
│  └─ Auth (Better Auth + Sessions)                       │
└───────────────────┬─────────────────────────────────────┘
                    │
        ┌───────────┼───────────┐
        ↓           ↓           ↓
    ┌────────┐ ┌────────┐ ┌──────────┐
    │ Database│ │ External│ │ Cloudinary │
    │ PostgreSQL│ │ AI APIs│ │ Storage    │
    └────────┘ └────────┘ └──────────┘
         ↓           ↓
    ┌────────────────────────┐
    │ Worker Process (Manim) │
    │ Python Code Execution  │
    │ Video Rendering        │
    └────────────────────────┘
```

### 3.2 How Components Interact

#### **Request-Response Cycle**

1. **Frontend**: User initiates action (generate animation)
2. **Client HTTP**: Sends `POST /api/ai/generate-animation` with prompt
3. **Backend Router**: `/api/ai` → `aiController`
4. **Controller**: Validates request, calls service layer
5. **Service**: Creates DB record, returns response
6. **Worker (Async)**: Begins processing in background
7. **Frontend Polling**: Every 1-2s, checks `/api/animations/:jobId`
8. **Polling Response**: Returns current job status and progress
9. **Completion**: Status changes to `done`, video URL provided
10. **Frontend Display**: Video shown in gallery or history

#### **Authentication Flow**

```
Registration/Login → Better Auth validates credentials →
Session created + stored in DB → Session cookie sent to frontend →
Subsequent requests include session cookie → 
Better Auth middleware verifies session →
Request proceeds if authenticated
```

#### **Data Consistency**

- **Database Transactions**: Atomic operations for project creation/deletion
- **Cascade Deletes**: Deleting a user cascades to their projects/animations
- **Job State Machine**: Status transitions are validated (can't go backwards)
- **Optimistic Locking**: Timestamps prevent race conditions

---

## 4. Project Structure

### 4.1 Directory Organization

```
/home/rafi/nextlevel/assignments/assignment5/
│
├── client/                          # Frontend (Next.js)
│   ├── src/
│   │   ├── app/                     # Next.js app directory
│   │   │   ├── layout.tsx           # Root layout
│   │   │   ├── page.tsx             # Landing page
│   │   │   ├── (auth)/              # Auth routes
│   │   │   ├── login/               # Login page
│   │   │   ├── register/            # Registration page
│   │   │   ├── dashboard/           # Main dashboard
│   │   │   ├── gallery/             # Animation gallery
│   │   │   ├── payment/             # Payment pages
│   │   │   └── admin/               # Admin dashboard
│   │   │
│   │   ├── components/              # Reusable React components
│   │   │   ├── AuthProvider.tsx     # Auth context provider
│   │   │   ├── Navbar.tsx           # Navigation bar
│   │   │   ├── LoadingSpinner.tsx   # Loader component
│   │   │   ├── ai/                  # AI chat components
│   │   │   │   ├── ChatCanvas.tsx
│   │   │   │   ├── ChatComposer.tsx
│   │   │   │   ├── ProjectCreateDialog.tsx
│   │   │   │   ├── GenerationHistory.tsx
│   │   │   │   ├── VideoPreview.tsx
│   │   │   │   └── JobStatusBadge.tsx
│   │   │   ├── gallery/             # Gallery components
│   │   │   │   ├── AnimationGrid.tsx
│   │   │   │   └── AnimationCard.tsx
│   │   │   └── ui/                  # Shadcn UI components
│   │   │
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── useAIChat.ts         # AI generation hook
│   │   │   ├── useProjects.ts       # Project management
│   │   │   ├── useAnimationJobs.ts  # Job tracking
│   │   │   └── useAPIKeyPersistence.ts
│   │   │
│   │   └── lib/                     # Utilities
│   │       ├── api.ts               # API client
│   │       ├── auth-client.ts       # Auth utilities
│   │       └── utils.ts             # Helper functions
│   │
│   ├── public/                      # Static assets
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   └── tailwind.config.js
│
├── server/                          # Backend (Express)
│   ├── src/
│   │   ├── server.ts                # Server entry point
│   │   ├── app.ts                   # Express app setup
│   │   │
│   │   ├── routes/                  # API route definitions
│   │   │   └── index.ts             # Route aggregator
│   │   │
│   │   ├── module/                  # Feature modules
│   │   │   ├── auth/                # Authentication
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.route.ts
│   │   │   │   └── auth.interface.ts
│   │   │   │
│   │   │   ├── user/                # User management
│   │   │   │   ├── user.controller.ts
│   │   │   │   ├── user.service.ts
│   │   │   │   ├── user.route.ts
│   │   │   │   └── user.interface.ts
│   │   │   │
│   │   │   ├── project/             # Project CRUD
│   │   │   │   ├── project.controller.ts
│   │   │   │   ├── project.service.ts
│   │   │   │   ├── project.route.ts
│   │   │   │   └── project.interface.ts
│   │   │   │
│   │   │   ├── animation/           # Animation job management
│   │   │   │   ├── animation.controller.ts
│   │   │   │   ├── animation.service.ts
│   │   │   │   ├── animation.worker.ts   # Manim rendering worker
│   │   │   │   ├── animation.route.ts
│   │   │   │   └── animation.interface.ts
│   │   │   │
│   │   │   ├── ai/                  # AI provider integration
│   │   │   │   ├── ai.service.ts
│   │   │   │   ├── ai.interface.ts
│   │   │   │   ├── ai.route.ts
│   │   │   │   ├── constants.ts     # Model catalog
│   │   │   │   ├── registry/        # Provider registry
│   │   │   │   └── providers/       # Individual providers
│   │   │   │       ├── gemini.provider.ts
│   │   │   │       ├── anthropic.provider.ts
│   │   │   │       ├── groq.provider.ts
│   │   │   │       ├── openrouter.provider.ts
│   │   │   │       └── huggingface.provider.ts
│   │   │   │
│   │   │   ├── payment/             # Payment processing
│   │   │   │   ├── payment.controller.ts
│   │   │   │   ├── payment.service.ts
│   │   │   │   ├── payment.route.ts
│   │   │   │   └── payment.interface.ts
│   │   │   │
│   │   │   └── admin/               # Admin operations
│   │   │       ├── admin.controller.ts
│   │   │       ├── admin.service.ts
│   │   │       ├── admin.route.ts
│   │   │       └── admin.interface.ts
│   │   │
│   │   ├── lib/                     # Core utilities
│   │   │   ├── auth.ts              # Better Auth setup
│   │   │   ├── prisma.ts            # Prisma client
│   │   │   └── cloudinary.ts        # Cloud storage client
│   │   │
│   │   ├── config/                  # Configuration
│   │   │   └── env.ts               # Environment variables
│   │   │
│   │   ├── utils/                   # Helper utilities
│   │   │   ├── catchAsync.ts        # Async error wrapper
│   │   │   └── sendResponse.ts      # Standard response format
│   │   │
│   │   └── errorHelpers/            # Error handling
│   │       ├── globalErrorHandler.ts
│   │       └── notFound.ts
│   │
│   ├── prisma/                      # Database schema
│   │   ├── schema.prisma            # Prisma schema
│   │   └── migrations/              # Migrations
│   │
│   ├── Dockerfile                   # Container configuration
│   ├── package.json
│   ├── tsconfig.json
│   └── install_manim.sh             # Manim setup script
│
├── README.md                        # Project overview
├── GEMINI.md                        # Design guidelines
└── PROJECT_DESCRIPTION.md           # This file
```

### 4.2 Purpose of Major Directories

| Directory | Purpose |
|-----------|---------|
| `client/src/app` | Next.js pages and routing |
| `client/src/components` | Reusable UI components |
| `client/src/hooks` | Custom data fetching and state hooks |
| `server/src/module` | Feature-specific business logic (auth, projects, etc.) |
| `server/src/lib` | Core utilities (database, auth, cloud storage) |
| `server/prisma` | Database schema and migrations |

---

## 5. Technology Stack

### 5.1 Frontend Stack

| Technology | Version | Purpose | Why Chosen |
|------------|---------|---------|-----------|
| **Next.js** | 16.x | React framework with SSR | Modern, SSR capabilities, built-in optimization |
| **React** | 19.x | UI library | Industry standard, component-based |
| **TypeScript** | 5.x | Type safety | Prevents runtime errors, better DX |
| **Tailwind CSS** | 4.x | Styling | Utility-first, fast development |
| **Shadcn/ui** | Latest | Component library | Pre-built, accessible components |
| **Better Auth** | 1.5.x | Authentication | Session management, secure auth |
| **Lucide React** | Latest | Icons | Lightweight SVG icons |
| **SweetAlert2** | 11.x | Notifications | User-friendly alerts |

**Frontend Architecture:**
- Client-side rendering with SSR for SEO
- API client wrapper for all backend calls
- Custom hooks for data fetching and caching
- React Context for auth state management
- Polling mechanism for real-time status updates

### 5.2 Backend Stack

| Technology | Version | Purpose | Why Chosen |
|------------|---------|---------|-----------|
| **Node.js** | 18+ | JavaScript runtime | Non-blocking I/O, fast development |
| **Express.js** | 4.x | Web framework | Lightweight, widely used, middleware ecosystem |
| **TypeScript** | 5.x | Type safety | Prevents runtime errors, better DX |
| **Prisma ORM** | 5.9.x | Database access | Type-safe queries, migrations, CLI tools |
| **PostgreSQL** | 12+ | Database | Reliable, relational, full-featured |
| **Better Auth** | 1.5.x | Authentication | Session-based auth, multi-provider support |
| **Cloudinary** | 2.x | Cloud storage | Image/video hosting, CDN, automatic optimization |
| **SSLCommerz** | LTS | Payment gateway | Bangladeshi payment processing |
| **Docker** | Latest | Containerization | Consistent environments, easy deployment |

**Backend Architecture:**
- Modular architecture with feature-based organization
- Service layer for business logic separation
- Controller layer for route handling
- Worker process for async animation rendering
- Error handling middleware for consistency
- Environment-based configuration

### 5.3 AI Provider Integration

| Provider | Models | Purpose | Algorithm |
|----------|--------|---------|-----------|
| **Google Gemini** | gemini-pro, gemini-1.5-pro | High-quality code generation | Transformer-based |
| **Anthropic Claude** | claude-3-opus, claude-3-sonnet | Long context understanding | Constitutional AI |
| **Groq** | Mixtral, Llama2 | Fast inference | Specialized hardware |
| **OpenRouter** | Multiple | Provider aggregation | API proxy |
| **HuggingFace** | Open-source models | Cost-effective option | Transformer-based |

### 5.4 Python & System Dependencies

| Tool | Purpose | Why |
|------|---------|-----|
| **Python 3.x** | Manim execution | Required for animation rendering |
| **Manim** | 2D animation library | Renders mathematical animations |
| **FFmpeg** | Video encoding | Converts images to video files |
| **LaTeX** (texlive) | Mathematical text rendering | Required by Manim for math expressions |
| **Cairo & Pango** | Graphics rendering | Underlying rendering backend |

---

## 6. Data Flow & Logic

### 6.1 Complete Animation Generation Flow

```
STEP 1: USER SUBMITS PROMPT
  ├─ User types: "Animate a sine wave transforming into a cosine wave"
  ├─ Frontend collects: prompt, projectId, provider, model
  └─ Frontend: POST /api/ai/generate-animation

STEP 2: JOB CREATION
  ├─ Backend validates request + creates AnimationJob (status: pending)
  ├─ Backend returns: 202 Accepted with { jobId }
  └─ Frontend stores jobId for polling

STEP 3: BACKGROUND PROCESSING BEGINS
  ├─ Worker picks up job async (fire-and-forget)
  ├─ Updates status: pending → processing
  └─ Retrieves AI provider + model from database

STEP 4: AI CODE GENERATION
  ├─ Worker calls LLM with specialized Manim prompt:
  │  "You are a Manim code generator. Output ONLY Python code..."
  ├─ LLM returns Python code (may include markdown fences)
  ├─ Worker extracts pure code (strips ```python blocks)
  ├─ Validates: must contain "class GeneratedScene"
  └─ Saves generated code to database
        Status: processing → generating_code

STEP 5: WRITE TO TEMPORARY FILE
  ├─ Creates /tmp/job_<jobId>/ directory
  ├─ Writes Python code to /tmp/job_<jobId>/scene.py
  └─ Status: generating_code → rendering

STEP 6: MANIM RENDERING
  ├─ Worker executes: "python3 -m manim render -ql scene.py GeneratedScene"
  ├─ Captures stdout/stderr
  ├─ 10-minute timeout (suitable for Render Free tier)
  └─ IF SUCCESS:
      └─ Go to STEP 7
     IF FAILURE:
      └─ Go to STEP 6A (AUTO-RETRY)

STEP 6A: AUTO-RETRY LOGIC (up to 10 times)
  ├─ Extract Python error from stderr
  ├─ Build retry prompt: "Your code failed with: {error}. Fix it."
  ├─ Send to same LLM provider
  ├─ Get updated code
  ├─ Write to file, render again
  ├─ If success after retry: continue to STEP 7
  └─ If all retries fail: Go to STEP 8A (Error handling)

STEP 7: UPLOAD TO CLOUD
  ├─ Find rendered mp4 in /tmp/job_<jobId>/media/videos/...
  ├─ Upload to Cloudinary bucket
  ├─ Get secure URL + public ID
  ├─ Set expiry: now + 7 days
  └─ Status: uploading → done

STEP 8: FINALIZE
  ├─ Update AnimationJob:
  │  ├─ status: done
  │  ├─ videoUrl: https://res.cloudinary.com/...
  │  ├─ expiresAt: now + 7 days
  │  └─ cloudinaryId: <public_id>
  ├─ Clean up temporary files
  └─ Job complete ✓

STEP 8A: ERROR HANDLING
  ├─ Convert technical error to user-friendly message
  ├─ Update AnimationJob:
  │  ├─ status: failed
  │  ├─ errorMessage: "Animation was too complex for our engine..."
  │  └─ generatedCode: (partially saved for inspection)
  └─ Frontend displays error

STEP 9: FRONTEND POLLING
  ├─ Frontend polls /api/animations/:jobId every 1-2 seconds
  ├─ Backend returns current job state
  │  └─ Status, progress, error messages, video URL when ready
  ├─ Frontend updates UI in real-time
  └─ When status = "done", display video and save to gallery
```

### 6.2 Authentication Flow

```
REGISTRATION
  ├─ User fills: email, password, name
  ├─ Frontend: POST /api/auth/register
  ├─ Backend validates email (must be unique)
  ├─ Hash password (Better Auth handles)
  ├─ Create user record in database
  ├─ Launch verification email (optional)
  └─ Return success

LOGIN
  ├─ User enters: email, password
  ├─ Frontend: POST /api/auth/login
  ├─ Backend validates credentials
  ├─ Create session record (session table)
  ├─ Generate session token
  ├─ Set secure HTTP-only cookie
  └─ Return user data + session

AUTHENTICATED REQUEST
  ├─ Frontend includes session cookie in request
  ├─ Backend middleware verifies session
  ├─ If valid: attach user to request object
  ├─ If invalid: return 401 Unauthorized
  └─ Proceed with request

LOGOUT
  ├─ Frontend: POST /api/auth/logout
  ├─ Backend invalidates session (delete from DB)
  ├─ Clear cookie
  └─ Redirect to login
```

### 6.3 Project Management Flow

```
CREATE PROJECT
  ├─ User clicks "New Project"
  ├─ Frontend: POST /api/projects
  │   Body: { title, description }
  ├─ Backend validates input
  ├─ Create project record with userId
  └─ Return projectId

LIST PROJECTS
  ├─ Frontend: GET /api/projects
  ├─ Backend queries: projects WHERE userId = current_user.id
  ├─ Return array of projects
  └─ Frontend displays in sidebar

VIEW PROJECT
  ├─ Frontend: GET /api/projects/:projectId
  ├─ Backend verifies user owns project (security check)
  ├─ Return project + associated animations
  └─ Display in main area

UPDATE PROJECT
  ├─ Frontend: PATCH /api/projects/:projectId
  │   Body: { title, description }
  ├─ Backend validates ownership
  ├─ Update record
  └─ Return updated project

DELETE PROJECT
  ├─ Frontend: DELETE /api/projects/:projectId
  ├─ Backend validates ownership
  ├─ Delete project (cascades to animations)
  ├─ Delete associated videos from Cloudinary
  └─ Return success
```

### 6.4 Admin Operations Flow

```
VIEW ALL USERS
  ├─ Frontend: GET /api/admin/users
  ├─ Backend checks: req.user.role === "ADMIN"
  ├─ Query all users with project/animation counts
  └─ Return user list

PROMOTE/DEMOTE USER
  ├─ Frontend: PATCH /api/admin/users/:userId/role
  │   Body: { role: "ADMIN" | "USER" }
  ├─ Backend validates requester is admin
  ├─ Update user.role
  └─ Return success

VIEW SYSTEM STATS
  ├─ Frontend: GET /api/admin/stats
  ├─ Backend aggregates:
  │   ├─ Total users
  │   ├─ Total projects
  │   ├─ Total animations
  │   ├─ Success/failure rates
  │   └─ Recent errors
  └─ Return statistics
```

---

## 7. API Design

### 7.1 Authentication Endpoints

```
POST /api/auth/register
Body: { email, password, name }
Response: { success, user, session }

POST /api/auth/login
Body: { email, password }
Response: { success, user, session }

POST /api/auth/logout
Response: { success }

GET /api/auth/session
Response: { user } or null
```

### 7.2 User Endpoints

```
GET /api/users/profile
Response: { id, email, name, image, role, createdAt }

PATCH /api/users/profile
Body: { name, image }
Response: { updated user }

GET /api/users/stats
Response: { projectCount, animationCount, donationTotal }
```

### 7.3 Project Endpoints

```
POST /api/projects
Body: { title, description }
Response: { id, title, description, userId, createdAt }

GET /api/projects
Response: [{ id, title, description, animationCount, ... }]

GET /api/projects/:projectId
Response: { id, title, animations: [...] }

PATCH /api/projects/:projectId
Body: { title, description }
Response: { updated project }

DELETE /api/projects/:projectId
Response: { success }
```

### 7.4 Animation Endpoints

```
POST /api/ai/generate-animation
Body: { projectId, prompt, provider, model, apiKey? }
Response: { 
  jobId,
  status: "pending",
  message: "Animation job created"
}
Status Code: 202 Accepted

GET /api/animations/:jobId
Response: {
  id,
  status,
  generatedCode,
  videoUrl,
  errorMessage,
  expiresAt,
  progress: 0-100,
  estimatedTimeRemaining
}

GET /api/projects/:projectId/animations
Response: [{
  id,
  projectId,
  prompt,
  status,
  videoUrl,
  createdAt
}]

DELETE /api/animations/:jobId
Response: { success }

POST /api/animations/:jobId/regenerate
Body: { provider, model }
Response: { newJobId, status: "pending" }
```

### 7.5 AI Provider Endpoints

```
GET /api/ai/providers
Response: ["gemini", "anthropic", "groq", "openrouter", "huggingface"]

GET /api/ai/models/:provider
Response: {
  gemini: ["gemini-pro", "gemini-1.5-pro"],
  anthropic: ["claude-3-opus", "claude-3-sonnet"],
  ...
}

POST /api/ai/validate-key
Body: { provider, apiKey }
Response: { valid: true/false }
```

### 7.6 Gallery Endpoints

```
GET /api/animations
Query: { limit, offset, sortBy }
Response: [{
  id,
  projectId,
  prompt,
  videoUrl,
  creatorName,
  createdAt
}]

GET /api/animations/trending
Response: [animations sorted by views/likes]

GET /api/animations/:jobId/view
(Increments view counter for analytics)
```

### 7.7 Payment Endpoints

```
POST /api/payment/initiate
Body: { amount, currency, name, email, userId? }
Response: {
  success: true,
  gatewayUrl: "https://sandbox.sslcommerz.com/...",
  tranId
}

POST /api/payment/success
(Callback from SSLCommerz)
Updates donation record, redirects to frontend

POST /api/payment/fail
(Callback from SSLCommerz)
Marks donation as failed, redirects to frontend

GET /api/payment/donations
Response: [{ id, amount, currency, status, createdAt }]
```

### 7.8 Admin Endpoints

```
GET /api/admin/users
Response: [{
  id,
  email,
  name,
  role,
  projectCount,
  animationCount,
  createdAt
}]

PATCH /api/admin/users/:userId/role
Body: { role: "ADMIN" | "USER" }
Response: { updated user }

GET /api/admin/stats
Response: {
  totalUsers,
  totalProjects,
  totalAnimations,
  successRate,
  avgRenderTime,
  recentErrors
}

GET /api/health
Response: { status: "ok", timestamp, uptime }
```

### 7.9 Response Format

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* response data */ }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "data": null,
  "error": {
    "code": "VALIDATION_ERROR",
    "details": []
  }
}
```

**Status Codes:**
- `200`: OK (successful GET/PATCH/DELETE)
- `201`: Created (successful POST)
- `202`: Accepted (async job accepted)
- `400`: Bad Request (validation error)
- `401`: Unauthorized (not authenticated)
- `403`: Forbidden (not authorized)
- `404`: Not Found
- `500`: Internal Server Error

---

## 8. Authentication & Security

### 8.1 Authentication Mechanism

**Session-Based Authentication with Better Auth:**

1. **User Registration**
   - Email and password submitted
   - Password hashed using bcrypt (Better Auth)
   - User record created in database
   - Verification email sent (optional flow)

2. **User Login**
   - Email and password validated
   - Session created with unique token
   - Session stored in database (table: `session`)
   - Session cookie sent to client (HTTP-only, Secure, SameSite)

3. **Authenticated Requests**
   - Client sends session cookie automatically with requests
   - Server middleware validates session:
     - Check if session exists in database
     - Check if session hasn't expired
     - Check if user still exists
   - User attached to request object (`req.user`)
   - Proceed or return 401 if invalid

4. **Session Expiry**
   - Sessions stored with `expiresAt` timestamp
   - Auto-invalidated after expiry
   - User must login again

### 8.2 Role-Based Access Control (RBAC)

**Two Roles:**
1. **USER** (default)
   - Can create/edit own projects
   - Can generate animations
   - Can view gallery
   - Can make donations

2. **ADMIN**
   - Can access admin dashboard
   - Can view all users
   - Can change user roles
   - Can view system statistics
   - Can view all projects/animations

**Implementation:**
- `user.role` column in database
- Middleware checks: `if (req.user.role !== "ADMIN") return 403`
- Protected routes require admin role

### 8.3 Security Considerations

| Threat | Mitigation |
|--------|------------|
| **SQL Injection** | Prisma ORM parameterized queries |
| **XSS Attacks** | React escapes JSX, CSP headers |
| **CSRF Attacks** | Better Auth session tokens, SameSite cookies |
| **Unauthorized Access** | Ownership validation on all user resources |
| **Brute Force Login** | Rate limiting (future enhancement) |
| **API Key Exposure** | Never log API keys, store encrypted, use env vars |
| **Video Privacy** | Cloudinary videos auto-delete after 7 days |
| **File Upload** | Only backend generates files (no user upload) |
| **Data Leakage** | Cascade deletes prevent orphaned data |

### 8.4 API Authentication

**How It Works:**
1. User/API client includes session cookie in requests
2. Better Auth middleware validates session
3. If valid, `req.user` contains: `{ id, email, role, ... }`
4. Routes check `req.user` for authorization
5. Public routes (gallery, landing) don't require auth

**Example Protected Route:**
```typescript
router.get('/api/projects/:projectId', (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  
  const project = await projectService.getById(projectId);
  if (project.userId !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  // Return project
});
```

### 8.5 Environment Variables & Secrets

**Never Committed to Git:**
- Database URLs
- API keys (Gemini, Claude, Groq, etc.)
- Cloudinary credentials
- SSLCommerz credentials
- Session secrets
- JWT secrets

**Stored in:** `.env.local` (development), Render/Vercel dashboard (production)

---

## 9. Deployment & Environment Setup

### 9.1 Development Environment

**Prerequisites:**
- Node.js 18+ installed
- PostgreSQL 12+ running locally (or Docker)
- Python 3.x with Manim installed
- Git for version control

**Setup Steps:**

1. **Clone & Install**
```bash
git clone <repo>
cd assignment5

# Backend
cd server
npm install
source .venv/bin/activate  # Activate Python virtual env with Manim
npm run prisma:generate

# Frontend
cd ../client
npm install
```

2. **Database Setup**
```bash
# Create PostgreSQL database
createdb flatmotion

# Generate Prisma client
cd server
npm run prisma:generate

# Run migrations
npm run prisma:migrate
```

3. **Environment Variables**

**Server `.env.local`:**
```
DATABASE_URL=postgresql://user:password@localhost:5432/flatmotion
BETTER_AUTH_URL=http://localhost:5000
BETTER_AUTH_SECRET=your_random_secret_here
TRUSTED_CLIENT_ORIGIN=http://localhost:3000

GEMINI_API_KEY=your_gemini_key
ANTHROPIC_API_KEY=your_claude_key
GROQ_API_KEY=your_groq_key
OPENROUTER_API_KEY=your_openrouter_key
HUGGINGFACE_API_KEY=your_hf_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

SSLCOMMERZ_STORE_ID=your_store_id
SSLCOMMERZ_STORE_PASSWORD=your_store_password
```

**Client `.env.local`:**
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. **Run Development Servers**
```bash
# Terminal 1: Backend
cd server
npm run dev
# Server runs on http://localhost:5000

# Terminal 2: Frontend
cd client
npm run dev
# Frontend runs on http://localhost:3000
```

### 9.2 Production Environment

**Technology Stack:**
- **Frontend**: Vercel (Next.js deployment)
- **Backend**: Render (Docker containerized)
- **Database**: PostgreSQL (managed)
- **Storage**: Cloudinary
- **CI/CD**: GitHub Actions (optional)

**Render Deployment (Backend):**

1. **Build Docker Image**
   - `server/Dockerfile` includes all system dependencies
   - Python 3, Manim, FFmpeg, LaTeX, Node.js
   - Final image size: ~2-3GB (heavy due to Manim)

2. **Deploy Steps**
   - Push code to GitHub
   - Create Render Web Service
   - Select GitHub repo
   - Set Environment to `Docker`
   - Set Root Directory to `server`
   - Add environment variables
   - Deploy (first build ~5-10 minutes)

3. **Environment Variables (Render Dashboard)**
```
DATABASE_URL=postgresql://...neon.tech/...
BETTER_AUTH_URL=https://flatmotion-server.onrender.com
BETTER_AUTH_SECRET=<random_secret>
TRUSTED_CLIENT_ORIGIN=https://flat-motion.vercel.app

GEMINI_API_KEY=...
ANTHROPIC_API_KEY=...
(etc.)

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

SSLCOMMERZ_STORE_ID=...
SSLCOMMERZ_STORE_PASSWORD=...
```

**Vercel Deployment (Frontend):**

1. **Connect GitHub Repo**
   - Import from GitHub
   - Select `client` as root directory
   - Build command: `next build`
   - Output directory: `.next`

2. **Environment Variables (Vercel Dashboard)**
```
NEXT_PUBLIC_API_URL=https://flatmotion-server.onrender.com/api
```

3. **Deploy**
   - Automatic on push to main
   - Preview deploys on pull requests

### 9.3 Database Setup (Production)

**Option 1: Neon (PostgreSQL as a Service)**
- Create account at neon.tech
- Create database
- Copy connection string to `DATABASE_URL`
- Prisma handles migrations automatically

**Option 2: Render Managed PostgreSQL**
- Create in Render dashboard
- Secure firewall rules
- Daily backups

**Initial Migration:**
```bash
# From local machine or CI/CD
npm run prisma:migrate deploy
npm run seed:admin  # Create initial admin user
```

### 9.4 Health Checks

**Backend Health Check:**
```
GET https://flatmotion-server.onrender.com/api/health
Response: { status: "ok", timestamp, uptime }
```

**Frontend Health Check:**
- Vercel provides deployment status
- Check if landing page loads

---

## 10. Scalability & Future Improvements

### 10.1 Current Limitations

| Limitation | Impact | Reason |
|-----------|--------|--------|
| **Synchronous Worker** | Blocks server thread | Manim rendering runs in same process |
| **No Job Queue** | Limited concurrency | Single worker handles all jobs |
| **Ephemeral Storage** | No persistence | `/tmp` directory shared |
| **Limited Retry Logic** | Manual user intervention | Auto-retry only within single job |
| **No Caching** | Redundant generations | Same prompt = regenerated every time |
| **Single Server** | Scaling issues | Cannot horizontally scale rendering |
| **Video Expiry** | No long-term storage | Videos deleted after 7 days |

### 10.2 Recommended Improvements

#### **1. Separate Worker Service (High Priority)**
```
Current: Express → Manim (blocks)
Improved:
  Express → Redis Queue → Worker Service → Manim
  - Decouples rendering from API
  - Worker can be scaled independently
  - Enables multiple concurrent renders
```

**Implementation:**
- Add BullMQ for job queue
- Create separate Worker service
- Deploy worker to Render background worker
- API only creates jobs and returns immediately

#### **2. Caching Layer (Medium Priority)**
```
Implement prompt → code caching:
- Store (prompt Hash) → (generated code) in Redis
- If same prompt requested, skip LLM call
- Cache invalidation per user preference
```

**Benefits:**
- Faster generation times
- Reduced LLM API costs
- Improved user experience

#### **3. Horizontal Scaling (High Priority)**
```
Current: Single Render instance
Improved: Multiple Render instances + Load balancer
  - App server (no rendering)
  - Worker servers pool
  - Managed Redis cache
```

**Implementation:**
- Move Manim to external workers
- Use container orchestration (Docker Swarm/Kubernetes)
- Implement auto-scaling based on queue depth

#### **4. Advanced Job Management (Medium Priority)**
```
Improvements:
- Pause/Resume jobs
- Priority queues (premium users first)
- Batch generation
- Scheduled jobs
- Job webhooks/notifications
```

#### **5. Analytics & Monitoring (Medium Priority)**
```
Track:
- Render success/failure rates
- Average render time
- Most popular prompts
- User engagement metrics
- API performance
- Error tracking (Sentry)
```

#### **6. Video Permanence (Low Priority)**
```
Current: 7-day expiry
Improved options:
- Premium users: permanent storage
- Archive system: move old videos to cold storage
- User choice: keep/delete
```

#### **7. Advanced Features (Low Priority)**
```
- Animation collaboration (multi-user projects)
- Comments/ratings on gallery
- Video remixing/editing
- Interactive animation parameters
- Export to various formats (WebM, GIF)
- Animation templates
```

#### **8. Performance Optimizations (Medium Priority)**
```
Frontend:
- Bundle size reduction
- Image/video lazy loading
- Component code splitting
- Service worker caching

Backend:
- Database query optimization
- Pagination for large datasets
- Compression middleware
- CDN for static assets
```

### 10.3 Scalability Roadmap

```
Phase 1 (Current): MVP with synchronous worker
  - Works for ~10-50 concurrent users
  - Simple to deploy
  - Manual scaling by duplicating servers

Phase 2 (Recommended): Async jobs + Redis queue
  - Works for ~100-500 concurrent users
  - Enables dedicated worker pool
  - Better resource utilization

Phase 3 (Optional): Kubernetes orchestration
  - Works for 1000+ concurrent users
  - Auto-scaling based on load
  - High availability setup

Phase 4 (Optional): Microservices architecture
  - Separate services: API, Workers, Analytics
  - Independent scaling per service
  - Event-driven architecture
```

### 10.4 Database Scaling

**Current:**
- Single PostgreSQL instance
- Suitable for ~1000 users

**Future Options:**
1. **Read Replicas**: Distribute read queries
2. **Partitioning**: Split large tables by userId
3. **Sharding**: Multiple databases by user range
4. **Data Warehousing**: Move historical data to separate storage

### 10.5 Cost Optimization (Production)

| Component | Current Cost | Optimization |
|-----------|--------------|--------------|
| **Render (Backend)** | ~$7-12/month | Scale down idle time |
| **PostgreSQL** | ~$30/month | Use shared instances initially |
| **Cloudinary** | ~$15-20/month | Implement storage lifecycle |
| **API Calls** | Varies | Cache generations, optimize prompts |
| **Infrastructure** | $50-60/month | Total for hobby tier |

**Scaling Costs:**
- 5x growth: ~$200-300/month
- 50x growth: ~$500-1000/month
- 500x growth: Requires architecture redesign

---

## 11. Summary

### 11.1 What is FlatMotion?

**FlatMotion** is a production-grade AI-powered animation studio that democratizes mathematical animation creation. Users describe animations in plain English, AI generates Python code using the Manim library, and the code is rendered into videos automatically.

### 11.2 Core Value Proposition

| For Users | For Developers |
|-----------|-----------------|
| Create professional animations without coding | Modern, scalable full-stack architecture |
| Experiment with mathematical concepts visually | Modular, well-organized codebase |
| Share animations in a social gallery | Multiple AI provider support |
| Zero setup or installation required | Production-ready deployment |
| Multi-provider AI for choice and reliability | Comprehensive error handling |

### 11.3 Technical Excellence

- **Frontend**: Modern Next.js with React 19, TypeScript, Tailwind CSS
- **Backend**: Robust Express.js with Prisma ORM, modular architecture
- **Database**: PostgreSQL with Prisma migrations and type safety
- **AI Integration**: Support for 5 major AI providers with fallback mechanisms
- **Rendering Engine**: Manim for professional mathematical animations
- **Cloud Infrastructure**: Containerized Docker deployment on Render
- **Security**: Session-based auth, RBAC, ownership validation

### 11.4 Key Differentiators

1. **Multi-Provider AI**: Not locked to single AI vendor
2. **Auto-Retry Logic**: Automatically fixes rendering errors via LLM feedback
3. **Async Job Processing**: Responsive UI even during long renders
4. **Cloud Storage Integration**: Automatic video hosting and CDN delivery
5. **Admin Dashboard**: System monitoring and user management
6. **Donation System**: Monetization ready for production

### 11.5 Business Model

**Current (Free Tier):**
- Unlimited animation generation (if API keys provided)
- Animations expire after 7 days
- Public gallery visibility
- Basic project management

**Future Premium (Optional):**
- Permanent video storage
- Dedicated worker priority
- Advanced features (batching, scheduling)
- Priority support
- Custom rendering options

### 11.6 Deployment Status

| Component | Status | URL |
|-----------|--------|-----|
| Frontend | ✅ Deployed | https://flat-motion.vercel.app |
| Backend | ✅ Deployed | https://flatmotion-server.onrender.com |
| Database | ✅ Configured | PostgreSQL (Neon/Render managed) |
| Storage | ✅ Integrated | Cloudinary CDN |
| Payments | ✅ Integrated | SSLCommerz |

### 11.7 How to Extend the Project

1. **Add New Feature**
   - Create new module in `server/src/module/[feature]/`
   - Add routes, controller, service, interface
   - Add database schema in Prisma
   - Create corresponding frontend hooks/components

2. **Add New AI Provider**
   - Create provider class extending `BaseProvider`
   - Register in `providerRegistry`
   - Add models to `MODEL_CATALOG`

3. **Improve Animation Quality**
   - Refine Manim system prompt
   - Add error-specific retry strategies
   - Implement prompt templates

4. **Enhance User Experience**
   - Better error messages
   - Animation previews
   - Advanced filtering in gallery
   - Real-time collaboration

### 11.8 Project Statistics

- **Frontend Files**: ~50+ React components
- **Backend Files**: ~30+ services/controllers
- **Database Models**: 7 core models (User, Account, Session, Project, AnimationJob, Donation, Verification)
- **API Endpoints**: 30+ routes
- **AI Providers**: 5 supported (Gemini, Claude, Groq, OpenRouter, HuggingFace)
- **Lines of Code**: ~5000+ (excluding node_modules)

---

## Appendix: Quick Reference

### A.1 Environment Variables Checklist

**Backend Required:**
- [ ] `DATABASE_URL`
- [ ] `BETTER_AUTH_URL`
- [ ] `BETTER_AUTH_SECRET`
- [ ] `TRUSTED_CLIENT_ORIGIN`
- [ ] `GEMINI_API_KEY` or other AI provider key
- [ ] `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- [ ] `SSLCOMMERZ_STORE_ID`, `SSLCOMMERZ_STORE_PASSWORD`

**Frontend Required:**
- [ ] `NEXT_PUBLIC_API_URL`

### A.2 Key Commands

```bash
# Backend
npm run dev                  # Start development server
npm run build               # Build TypeScript
npm run prisma:generate     # Generate Prisma client
npm run prisma:migrate      # Create migrations
npm run prisma:studio       # Open Prisma UI
npm run seed:admin          # Create admin user

# Frontend
npm run dev                 # Start Next.js dev server
npm run build              # Build for production
npm run lint               # Run ESLint
```

### A.3 Key Files

| File | Purpose |
|------|---------|
| `server/src/app.ts` | Express app setup, middleware |
| `server/src/module/animation/animation.worker.ts` | Manim rendering pipeline |
| `server/src/module/ai/ai.service.ts` | AI provider integration |
| `client/src/app/page.tsx` | Landing page |
| `client/src/app/dashboard/page.tsx` | Main dashboard |
| `client/src/hooks/useAnimationJobs.ts` | Job polling logic |
| `server/prisma/schema.prisma` | Database schema |

### A.4 Database Schema Relationships

```
User (1) → (N) Account
User (1) → (N) Session
User (1) → (N) Project
User (1) → (N) AnimationJob
User (1) → (N) Donation

Project (1) → (N) AnimationJob
```

---

## End of Document

This document provides comprehensive coverage of the FlatMotion project and should enable any developer or AI system to understand, maintain, extend, or rebuild the system independently.

**Last Updated**: April 2026  
**Version**: 1.0  
**Project Status**: Production Ready
