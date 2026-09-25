# AI Resume Analyzer

🔗 **[Live Demo](https://airesumeanalyzer.puter.site/)**

AI Resume Analyzer is a learning project built with React, TypeScript, React Router, and Puter.js.

The app lets a user sign in with Puter, upload a PDF resume, provide information about the job they are applying for, and receive AI-generated resume feedback. Uploaded resumes and their analysis results can be viewed again from the home page.

This is my first genuinely useful app while practicing React concepts, TypeScript, file handling, PDF processing, and a cloud backend through Puter.js.

## What the App Does

- Signs users in with a Puter account.
- Accepts one PDF resume up to 20 MB.
- Collects the company name, job title, and job description.
- Uploads the original PDF to Puter File System.
- Converts the first PDF page into a PNG preview in the browser.
- Uploads the preview image to Puter File System.
- Sends the resume image and job information to Puter AI.
- Requests structured feedback including:
  - Overall score
  - ATS score and tips
  - Tone and style feedback
  - Content feedback
  - Structure feedback
  - Skills feedback
- Saves resume metadata and feedback in Puter Key-Value Storage.
- Displays previous submissions as resume cards.

## Learning Goals

This project was built to practice:

- React components and reusable UI.
- React hooks such as `useState`, `useEffect`, and custom Zustand hooks.
- TypeScript interfaces for resume and AI feedback data.
- React Router route configuration and navigation.
- Protected pages based on authentication state.
- File uploads and drag-and-drop input with `react-dropzone`.
- PDF rendering with `pdfjs-dist`.
- Browser object URLs for displaying files returned from storage.
- Calling a cloud AI API from a frontend application.
- Persisting structured JSON data in a key-value store.
- Responsive layouts with Tailwind CSS.

## Tech Stack

- React 19
- TypeScript
- React Router 8
- Vite
- Tailwind CSS 4
- Zustand
- Puter.js
- Puter Authentication
- Puter File System
- Puter Key-Value Storage
- Puter AI
- `pdfjs-dist`
- `react-dropzone`

## How the Data Flow Works

1. `app/root.tsx` loads Puter.js from `https://js.puter.com/v2/`.
2. The `usePuterStore` Zustand store waits for Puter.js and checks the user's authentication state.
3. Unauthenticated users are redirected to `/auth`.
4. The upload page sends the selected PDF to Puter File System.
5. `pdf2img.ts` renders the first PDF page to a PNG image in the browser.
6. The PNG is uploaded to Puter File System as well.
7. The app saves the resume paths and job information under a key such as `resume:<id>`.
8. Puter AI analyzes the uploaded image using the prompt in `app/constants/index.ts`.
9. The JSON feedback is saved back to the same KV record.
10. The user is redirected to `/resume/:id`, where the stored files and feedback are displayed.

## Getting Started

### Prerequisites

- Node.js and npm installed.
- A Puter account.
- A modern browser with JavaScript enabled.

### Installation

```bash
git clone <your-repository-url>
cd AiResumeAnalyzer
npm install
```

### Run the development server

```bash
npm run dev
```

Open the local URL printed by React Router/Vite, then sign in with Puter before uploading a resume.

### Other scripts

```bash
npm run typecheck   # Generate React Router types and run TypeScript checks
npm run build       # Create a production build
npm run start       # Serve the production build
```

## Project Structure

```text
app/
├── components/
│   ├── FileUploader.tsx   # PDF drag-and-drop input
│   ├── NavBar.tsx         # Shared navigation
│   ├── Resume.tsx         # Resume preview and feedback page
│   ├── ResumeCard.tsx     # Saved resume card on the home page
│   ├── ScoreCircle.tsx     # Visual score component
│   └── Upload.tsx         # Upload and analysis workflow
├── constants/
│   └── index.ts           # AI response format and prompt builder
├── lib/
│   ├── pdf2img.ts         # PDF first-page conversion
│   ├── puter.ts           # Typed Puter.js Zustand store
│   └── utils.ts           # Small shared utilities
├── routes/
│   ├── auth.tsx           # Puter sign-in page
│   └── home.tsx           # Saved resumes home page
├── app.css                # Tailwind styles and shared components
└── root.tsx               # App shell and Puter.js initialization
```

## Important Implementation Details

### Puter integration

Puter is used as the backend service. The app does not currently have a separate Express, Node, or database server. The wrapper in `app/lib/puter.ts` keeps authentication, file storage, AI calls, and KV operations behind one typed Zustand store.

The Puter script is loaded in `app/root.tsx`:

```html
<script src="https://js.puter.com/v2/"></script>
```

### Resume storage

Each analyzed resume is saved as JSON in Puter KV storage with a key similar to:

```text
resume:<generated-id>
```

The stored record contains the original PDF path, image path, job information, and generated feedback.

### PDF preview

Only the first page of the PDF is converted into an image for preview and AI analysis. The original PDF is still uploaded separately so it can be opened from the review page.

## Current Limitations

- The AI analysis currently uses the first page image rather than the complete PDF.
- The app depends on the Puter.js CDN being available in the browser.
- Feedback assumes the AI returns valid JSON matching the requested format.
- Object URLs are created for downloaded files and could be revoked later as a cleanup improvement.
- Error handling and loading states can be expanded for production use.
- The current UI is intentionally simple because this project is focused on learning the application flow.

## Ideas for Future Improvements

- Analyze every page of a multi-page resume.
- Add delete and rename actions for saved resumes.
- Add filtering by company or job title.
- Improve validation for missing job information.
- Add stronger runtime validation for AI responses.
- Add tests for PDF conversion, Puter calls, and feedback parsing.
- Add an error boundary or retry UI around failed uploads and AI requests.
- Add a polished dashboard with feedback charts and improvement history.

## Why This Project Matters

This project is useful because it connects several concepts that are often learned separately:

```text
React UI
	-> user input and file upload
TypeScript
	-> shared data shapes and safer API wrappers
Puter.js
	-> authentication, storage, key-value data, and AI
PDF.js
	-> browser-side document processing
React Router
	-> navigation and protected application pages
```

It is a practical foundation for learning how a frontend can become a complete application by connecting UI state, browser APIs, cloud services, and typed data models.
