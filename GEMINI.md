# GEMINI.md

## Project Identity

This project is an AI-powered full-stack web application for generating and managing 2D animation videos, inspired by a "Cursor for 2D animation" idea.

The product goal is:
- a user writes a prompt
- the system generates a 2D animation workflow
- the user can manage, regenerate, edit, and organize animation projects
- the application must also satisfy a web development bootcamp assignment that requires auth, CRUD, RBAC, professional UI/UX, deployment, and a production-style structure

This is not just a toy AI generator. It should behave like a real SaaS-style product.

---

## Core Product Direction

The product should be treated as an **AI Animation Studio**.

Users should be able to:
- register and log in
- create projects
- generate animations from prompts
- view previously generated animations
- update project titles, prompts, and metadata
- delete projects or animations
- access a dashboard
- have role-based permissions

Admins should be able to:
- view and manage users
- moderate or delete projects/animations if needed
- perform higher-privilege actions not available to normal users

---

## Assignment Alignment

This project must fulfill the following academic requirements:

1. Authentication
2. CRUD operations
3. Role-based access control
4. Professional homepage with at least 4 sections
5. Responsive and polished UI/UX
6. Proper validation and error handling
7. Deployed frontend and backend
8. Clear README and maintainable code structure

When making decisions, prefer choices that help satisfy these assignment requirements.

---

## Important Product Modeling Rules

Do not reduce this project to "type prompt -> video appears".

The agent must think in terms of real data entities and CRUD.

### Main entities
- User
- Project
- Animation
- Admin-controlled resources

### CRUD expectations
#### Project CRUD
- create project
- list projects
- view project details
- update project title/details
- delete project

#### Animation CRUD
- create animation generation record
- list animations for a project
- view a specific animation
- update prompt/settings/regenerate metadata
- delete animation

#### User/Admin operations
- user profile access/update if needed
- admin can manage users and platform data

When implementing features, make sure CRUD is visible and demonstrable.

---

## Current Repository Structure

This repository is split into two main apps:

### Client
- Next.js frontend
- app router structure
- login/register/dashboard pages
- shared auth provider
- navbar and common UI
- lib/api.ts for backend communication
- lib/auth-client.ts for auth-related client logic

### Server
- Node.js + Express backend
- Prisma ORM
- PostgreSQL
- modular backend structure
- modules already include:
  - auth
  - user
  - admin
  - project
  - animation

Preserve and extend this structure instead of inventing a totally different architecture unless absolutely necessary.

---

## Technical Intent

### Frontend intent
The frontend should feel like a modern SaaS dashboard:
- clean landing page
- auth pages
- dashboard for projects/animations
- responsive UI
- consistent design system
- clear loading, success, and error states

### Backend intent
The backend should provide:
- auth APIs
- project APIs
- animation APIs
- admin APIs
- validation
- structured responses
- centralized error handling

### Database intent
Database design should support:
- users with roles
- projects owned by users
- animations belonging to projects
- metadata for prompts, status, results, timestamps

---

## Animation Feature Guidance

The long-term vision may involve Manim or a Manim-like rendering workflow, but the assignment version does not need a perfect production-grade render engine on day one.

Preferred implementation strategy:
1. First ensure auth, CRUD, dashboard, roles, and assignment requirements are solid
2. Then add animation generation workflow
3. If needed, use a staged approach:
   - prompt saved in DB
   - generated code or template stored
   - output video URL stored
   - rendering can be mocked, templated, or simplified early on

Do not over-engineer rendering at the cost of missing core assignment marks.

---

## What the Agent Should Optimize For

Always prioritize:
1. assignment compliance
2. working end-to-end functionality
3. clean code structure
4. understandable logic
5. stable CRUD flows
6. demo-ready product behavior

If there is a tradeoff between "fancy AI feature" and "reliable full-stack requirement", prefer the reliable full-stack requirement.

---

## Coding Rules

- Do not break the existing client/server separation
- Reuse the existing module structure
- Keep code simple and understandable
- Avoid introducing unnecessary complexity
- Prefer explicit types and predictable APIs
- Keep validation close to routes/modules
- Keep services focused on business logic
- Keep controllers thin
- Preserve Prisma-centric data flow on the server
- Prefer maintainable code over clever code

---

## UI Rules

The UI should feel professional and assignment-ready:
- responsive on mobile, tablet, and desktop
- consistent spacing and visual hierarchy
- meaningful empty states
- loading states for async actions
- proper form validation messages
- clear call-to-actions
- homepage must include navbar, footer, and minimum 4 sections

Suggested homepage sections:
- Hero
- Features
- How it works
- Pricing or plans
- Testimonials or use cases
- CTA section

---

## Error Handling Rules

Always include:
- form validation
- API error handling
- empty states
- loading indicators
- user-friendly messages

Do not leave raw server errors exposed to the user.

---

## Deployment Awareness

Design with deployment in mind:
- frontend likely hosted on Vercel
- backend may be hosted separately (for example Render or Railway)
- avoid assumptions that require a long-running local-only environment
- keep environment variables organized and explicit

---

## Agent Behavior Constraints

When changing code:
- do not randomly rename folders or modules
- do not remove existing auth/project/animation/admin/user structure unless there is a very strong reason
- do not introduce unrelated product ideas
- do not convert the app into a different domain like e-commerce, chat app, or social media app
- stay aligned with the AI Animation Studio vision

When suggesting features:
- keep them relevant to animation generation, project management, CRUD, RBAC, and assignment scoring

---

## Preferred Feature Roadmap

1. solid auth
2. role support
3. project CRUD
4. animation CRUD
5. dashboard UX
6. homepage polish
7. admin controls
8. generation workflow improvements
9. optional rendering enhancements

---

## Definition of Success

A successful version of this project is:
- a deployed full-stack app
- users can register/login
- users can create and manage projects
- users can create and manage animation entries
- admins have elevated control
- the app looks professional
- the app clearly demonstrates CRUD
- the app is suitable for assignment submission and portfolio use

Keep all code and suggestions aligned with that outcome.