# AI Animation Studio: Technical Documentation & Production Readiness Analysis

This document provides a deep dive into the architecture, implementation, and production considerations of the AI Animation Studio system.

---

## 1. System Overview

### 1.1 High-Level Flow
The system follows a linear pipeline from user prompt to a rendered video hosted in the cloud.

1.  **User Input**: User submits a text prompt via the Dashboard.
2.  **Job Creation**: The Backend (Express) creates an [AnimationJob](file:///home/rafi/nextlevel/assignments/assignment5/server/src/module/animation/animation.worker.ts#63-187) record in PostgreSQL via Prisma with status `pending`.
3.  **Background Processing**: The controller triggers the [processAnimationJob](file:///home/rafi/nextlevel/assignments/assignment5/server/src/module/animation/animation.worker.ts#63-187) worker asynchronously (fire-and-forget).
4.  **LLM Generation**: The worker calls the `aiService` with a specialized **Manim System Prompt**. The LLM returns raw Python code.
5.  **Code Extraction**: The system extracts the Python code from the LLM response, stripping markdown fences and conversational text.
6.  **Local Rendering**: The worker writes the code to a temporary `.py` file and executes `manim` via a system sub-process (`python3 -m manim`).
7.  **Cloud Storage**: The resulting `.mp4` file is uploaded to **Cloudinary**.
8.  **Completion**: The DB record is updated with the video URL and status `done`.

### 1.2 Mid-Level Flow (Data & Control)
- **API Response**: The API returns a `202 Accepted` immediately after creating the job, providing the `jobId` so the frontend can poll for status.
- **Worker States**:
    - `pending` (initial)
    - `processing` (worker started)
    - `generating_code` (calling LLM)
    - `rendering` (running Manim CLI)
    - `uploading` (sending to Cloudinary)
    - `done` or `failed` (terminal states)
- **Async Execution**: Currently, workers run within the main Express process. There is no external message broker (like Redis/SQS), meaning a server restart during rendering will lose in-flight jobs.

### 1.3 Low-Level (Code-Level Map)

| Module / File | Responsibility | Key Components |
| :--- | :--- | :--- |
| [animation.controller.ts](file:///home/rafi/nextlevel/assignments/assignment5/server/src/module/animation/animation.controller.ts) | API Entry Points | [generateAnimation](file:///home/rafi/nextlevel/assignments/assignment5/server/src/module/animation/animation.controller.ts#14-44), [getJob](file:///home/rafi/nextlevel/assignments/assignment5/server/src/module/animation/animation.controller.ts#47-75), [regenerateAnimation](file:///home/rafi/nextlevel/assignments/assignment5/server/src/module/animation/animation.controller.ts#102-133) |
| [animation.worker.ts](file:///home/rafi/nextlevel/assignments/assignment5/server/src/module/animation/animation.worker.ts) | Orchestration | [processAnimationJob](file:///home/rafi/nextlevel/assignments/assignment5/server/src/module/animation/animation.worker.ts#63-187), `MANIM_SYSTEM_PROMPT`, [extractPythonCode](file:///home/rafi/nextlevel/assignments/assignment5/server/src/module/animation/animation.worker.ts#39-60) |
| [animation.service.ts](file:///home/rafi/nextlevel/assignments/assignment5/server/src/module/animation/animation.service.ts) | DB / CRUD | [createJob](file:///home/rafi/nextlevel/assignments/assignment5/server/src/module/animation/animation.service.ts#26-56), [updateJob](file:///home/rafi/nextlevel/assignments/assignment5/server/src/module/animation/animation.service.ts#79-96), [mapStatus](file:///home/rafi/nextlevel/assignments/assignment5/server/src/module/animation/animation.service.ts#11-23) (expiry logic) |
| [ai.service.ts](file:///home/rafi/nextlevel/assignments/assignment5/server/src/module/ai/ai.service.ts) | LLM Abstraction | Registry-based provider management |
| `providers/*.provider.ts` | Provider Logic | Gemini, Groq, OpenRouter, Anthropic, HuggingFace |
| `lib/cloudinary.ts` | External Storage | `uploadVideo`, `deleteVideo` |

---

## 2. LLM Integration

### 2.1 Prompt Construction
The prompt is constructed by combining the user's input with a strict `MANIM_SYSTEM_PROMPT` located in [animation.worker.ts](file:///home/rafi/nextlevel/assignments/assignment5/server/src/module/animation/animation.worker.ts).

**Constraints enforced:**
- **Code Only**: "Output ONLY raw Python code... DO NOT include any conversational text."
- **Class Naming**: Scene must be named `GeneratedScene`.
- **Duration**: Limit to 10 seconds.
- **Self-Contained**: No external files or network calls.

### 2.2 Prompt Injection & Guardrails
- **Templates**: The system prompt acts as a template/guardrail.
- **Output Parsing**: [extractPythonCode](file:///home/rafi/nextlevel/assignments/assignment5/server/src/module/animation/animation.worker.ts#39-60) uses a regex `match(/``[(?:python)?\s*([\s\S]*?)](file:///home/rafi/nextlevel/assignments/assignment5/server/src/module/animation/animation.controller.ts#47-75)``/i)` to find code blocks. If no block is found, it fallbacks to searching for `from manim`.
- **Validation**: Minimal. It checks if the code contains `class GeneratedScene`. It does **not** perform static analysis or linting before execution.

### 2.3 Output Handling
The system handles the LLM output by:
1. Stripping non-code text.
2. Saving to a temporary file.
3. Attempting execution. If Manim fails (e.g., SyntaxError in generated code), the worker catches the error and updates the job status to `failed` with the error message.

---

## 3. API Key & Provider Architecture

### 3.1 Design Shift
Initially, the system likely required users to provide their own keys. The current design makes them **optional**.

### 3.2 Key Resolution Logic
In [processAnimationJob](file:///home/rafi/nextlevel/assignments/assignment5/server/src/module/animation/animation.worker.ts#63-187), the key is resolved as:
`apiKey: req.body.apiKey ?? getProviderApiKey(provider)`

- If the user provides a key in the UI, it is used.
- Otherwise, the server uses its own environment variables (`GEMINI_API_KEY`, etc.).

### 3.3 Security Implications
- **Exposure**: API keys sent from the frontend are transmitted in the request body. Ensure HTTPS is strictly enforced.
- **Storage**: Server-side keys are stored in `.env`. They are **not** hardcoded in the source.
- **Abuse**: Without rate-limiting, a user could drain the server-side API budget by repeatedly calling the generate endpoint.

---

## 4. Rendering Pipeline (Manim Execution)

- **Execution**: Uses `child_process.execFile` to call `python3 -m manim`.
- **Arguments**: `-ql` (Low quality, 480p 15fps) for speed, `--media_dir` to specify output location.
- **Timeout**: Hardcoded at **120 seconds**.
- **File Flow**:
    1. Worker creates `/tmp/manim-job-{jobId}`.
    2. Writes `scene.py`.
    3. Manim creates sub-directories (e.g., `media/videos/scene/480p15/`).
    4. Worker recursively searches for the `.mp4` file.

---

## 5. Subtle / Hidden Behaviors

- **Expiry Logic**: Videos are marked as `expired` in the UI after **7 days**, although they remain in Cloudinary until manually cleaned or if the DB record is deleted.
- **Silent Fallback**: If the LLM generates slightly conversational text *before* the code (e.g., "Sure, here is your code:"), the [extractPythonCode](file:///home/rafi/nextlevel/assignments/assignment5/server/src/module/animation/animation.worker.ts#39-60) function handles it, but if it generates code *after* conversational text without fences, it might fail.
- **Recursive Search**: [findMp4File](file:///home/rafi/nextlevel/assignments/assignment5/server/src/module/animation/animation.worker.ts#190-208) assumes the first `.mp4` found is the correct one. Multiple scenes in one file might lead to non-deterministic results if not careful (though prompt enforces one class).

---

## 6. Production Readiness (Render Deployment)

### 6.1 Current Limitations
- **Environment**: Depends on `manim`, `ffmpeg`, and standard Python libraries being pre-installed on the host. Standard Node.js environments (like Render's default) do not have these.
- **Storage**: The `/tmp` directory is ephemeral and shared. High concurrency could lead to disk space issues.
- **CPU Usage**: Manim rendering is CPU-intensive. Running it inside the web server process will degrade API performance for other users.

### 6.2 Required Changes
1.  **Containerization**: Move to a Docker-based deployment. The Dockerfile must include Node.js, Python3, Manim, and FFmpeg.
2.  **External Worker**: Decouple the worker from the Express app. Use **Redis + BullMQ** to manage a job queue.
3.  **Resource Limits**: Define CPU/Memory limits for rendering jobs to prevent server crashes.

### 6.3 Architecture Recommendation
> [!IMPORTANT]
> For a professional SaaS, do not run Manim inside the Express process.
> 
> **Recommended Stack:**
> - **Primary API**: Express on Render (Web Service).
> - **Queue**: Redis (Render Managed Redis).
> - **Worker Service**: A separate Render "Background Worker" running the Manim-enabled Docker image.
> - **Storage**: Cloudinary (already implemented).

---

## 7. Animation Quality Issues

### 7.1 Root Causes
- **Spatial Reasoning**: LLMs lack an internal "canvas" view. They don't know the exact pixel dimensions of a `Text` object relative to an `Arrow`.
- **Basic Prompting**: The system prompt is generic. It doesn't provide layout best practices (e.g., "use `.next_to()` instead of absolute coordinates").
- **Depth**: LLMs default to "Hello World" style circles/squares because they are "safe" and less likely to fail syntax-wise.

### 7.2 Improvements
- **Prompt Engineering**: Provide the LLM with "Layout Rules" (e.g., "Always use `buff=0.5` between objects", "Use `VGroup` for alignment").
- **Few-Shot Prompting**: Include complex examples of well-laid-out scenes in the system prompt.
- **Validation Step**: Add a "Code Review" turn where a second LLM or a rule-based script checks for common layout errors (e.g., overlapping coordinates).

---

## 8. Improvement Roadmap

### Phase 1: Quick Wins (Short-term)
- Improve `MANIM_SYSTEM_PROMPT` with better layout instructions.
- Add basic code validation (check for common syntax errors) before running Manim.

### Phase 2: Production Stability (Medium-term)
- Move to Dockerized deployment.
- Implement Redis/BullMQ for job management.
- Add user rate-limiting to protect API budget.

### Phase 3: Advanced Features (Long-term)
- **Live Preview**: Stream Manim logs to the frontend via WebSockets.
- **Human-in-the-loop**: Allow users to edit the generated Python code in a web IDE before rendering.
- **Multi-Scene**: Support longer, multi-stage animations with scene transition logic.
