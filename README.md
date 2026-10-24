# 🤖 AI Code Review

An AI-powered code review web application that uses **Google Gemini** to analyze source code and provide actionable feedback on code quality, performance, security, maintainability, and best practices.

The application provides a simple developer-focused workspace where users can write or paste JavaScript code, submit it for review, and receive an AI-generated review in a structured Markdown format.

---

## ✨ Features

* 🤖 **AI-powered code review** using Google Gemini
* 💻 **Interactive JavaScript code editor**
* 🎨 **Real-time syntax highlighting** with Prism.js
* 📝 **Markdown-based AI review rendering**
* 🔍 Code quality and best-practice analysis
* ⚡ Asynchronous API communication using Axios
* 🔄 Automatic retry handling for temporary Gemini failures
* 🔁 Fallback Gemini model support
* 🛡️ Input validation and error handling
* 📱 Responsive UI for desktop and mobile
* ⏳ Loading states while AI generates the review
* 🚨 User-friendly error messages
* 🔐 API key management using environment variables

---

## 🖥️ Application Preview

The application provides a two-panel code review workspace:

```text
┌─────────────────────────────────────────────────────────────┐
│                    GEMINI-POWERED                           │
│  Code review                              [Review code]     │
│  Paste your code and get actionable feedback.              │
├───────────────────────────┬─────────────────────────────────┤
│                           │                                 │
│      Your code            │             Review              │
│                           │                                 │
│  function sum() {         │  🔍 Code Analysis               │
│    return 1 + 1           │                                 │
│  }                        │  Issues                         │
│                           │  Recommendations                │
│                           │  Improvements                   │
│                           │                                 │
└───────────────────────────┴─────────────────────────────────┘
```

On smaller screens, the two panels automatically stack vertically for a responsive experience.

---

## 🛠️ Tech Stack

### Frontend

* **React 19**
* **Vite**
* **JavaScript (ES6+)**
* **Axios**
* **React Simple Code Editor**
* **Prism.js**
* **React Markdown**
* **Rehype Highlight**
* **Highlight.js**
* **CSS3**

### Backend

* **Node.js**
* **Express.js**
* **REST API**
* **CORS**
* **dotenv**
* **Google Generative AI SDK**

### AI

* **Google Gemini**
* Generative AI
* AI-powered code analysis
* Prompt engineering
* Automated code review
* Code quality analysis

### Development Tools

* Git
* GitHub
* VS Code
* npm
* Vite

---

## 🏗️ Project Structure

```text
Ai_code-review/
│
├── BackEnd/
│   │
│   ├── Server.js
│   ├── package.json
│   │
│   └── src/
│       ├── app.js
│       │
│       ├── controllers/
│       │   └── ai.controller.js
│       │
│       ├── routes/
│       │   └── ai.routes.js
│       │
│       └── services/
│           └── ai.service.js
│
├── Frontend/
│   │
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   │
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   │
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       ├── main.jsx
│       │
│       └── assets/
│           ├── hero.png
│           ├── react.svg
│           └── vite.svg
│
├── .gitignore
└── README.md
```

---

# 🔄 How the Application Works

The application follows a simple frontend → backend → AI → frontend architecture.

```text
                  USER
                    │
                    ▼
          ┌──────────────────┐
          │   React + Vite   │
          │    Frontend      │
          └────────┬─────────┘
                   │
                   │ Axios POST
                   │ /ai/get-review
                   ▼
          ┌──────────────────┐
          │  Express Server  │
          │     Backend      │
          └────────┬─────────┘
                   │
                   ▼
          ┌──────────────────┐
          │ AI Controller    │
          └────────┬─────────┘
                   │
                   ▼
          ┌──────────────────┐
          │   AI Service     │
          └────────┬─────────┘
                   │
                   │ Google Gemini API
                   ▼
          ┌──────────────────┐
          │  Gemini Model    │
          │   Code Review    │
          └────────┬─────────┘
                   │
                   │ AI Response
                   ▼
          ┌──────────────────┐
          │ Express Backend  │
          └────────┬─────────┘
                   │
                   ▼
          ┌──────────────────┐
          │ React Frontend   │
          │ Markdown +       │
          │ Syntax Highlight │
          └──────────────────┘
```

---

# 🧠 AI Code Review

The backend contains a dedicated AI service responsible for communicating with Google's Generative AI API.

The AI is instructed to behave like an experienced senior code reviewer and focus on:

* Code quality
* Maintainability
* Readability
* Performance
* Security
* Scalability
* Error handling
* Best practices
* DRY principles
* SOLID principles
* Code complexity
* Testing considerations
* Documentation
* Modern development practices

The AI is also instructed to provide constructive feedback and, where appropriate, recommend improved or refactored code.

---

# 🔌 API

## POST `/ai/get-review`

Generates an AI-powered review for the submitted source code.

### Request

```http
POST /ai/get-review
Content-Type: application/json
```

### Request Body

```json
{
  "code": "function sum() { return 1 + 1 }"
}
```

### Successful Response

```json
{
  "review": "AI generated code review..."
}
```

---

## ❌ Error Handling

The backend validates the submitted code before sending it to Gemini.

If no valid code is provided:

```http
400 Bad Request
```

The application also handles temporary Gemini availability issues such as:

* `429` — Rate limit
* `503` — Service unavailable
* Timeout errors
* Aborted requests
* Unavailable Gemini models

Temporary failures can be retried automatically before returning an error to the frontend.

---

# 🔁 Gemini Model Fallback & Retry

One of the important backend features is the handling of temporary AI service failures.

The AI service:

1. Loads the Gemini API key from environment variables.
2. Initializes the Google Generative AI client.
3. Uses the configured Gemini model.
4. Attempts the request.
5. Retries temporary failures.
6. Falls back to another configured Gemini model when necessary.
7. Returns the generated review to the controller.

This helps make the application more resilient to temporary model availability and rate-limit issues.

---

# 🎨 Code Editor

The frontend uses:

**React Simple Code Editor**

combined with:

**Prism.js**

to provide an interactive JavaScript code-editing experience with syntax highlighting.

Example:

```javascript
function sum() {
  return 1 + 1;
}
```

The editor maintains the source code using React's `useState` hook.

---

# 📝 AI Response Rendering

AI-generated reviews are returned as Markdown.

The frontend uses:

* `react-markdown`
* `rehype-highlight`
* `highlight.js`

to render structured AI responses.

This allows the review to contain:

* Headings
* Lists
* Code blocks
* Inline code
* Highlighted source code
* Structured recommendations

---

# 📦 Main Dependencies

## Frontend

```json
{
  "axios": "^1.20.0",
  "prismjs": "^1.30.0",
  "react": "^19.2.8",
  "react-dom": "^19.2.8",
  "react-markdown": "^10.1.0",
  "react-simple-code-editor": "^0.14.1",
  "rehype-highlight": "^7.0.2"
}
```

## Backend

```json
{
  "@google/generative-ai": "^0.24.1",
  "cors": "^2.8.6",
  "dotenv": "^18.0.1",
  "express": "^5.2.1"
}
```

---

# ⚙️ Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/Mohdshaan021/Ai_code-review.git
```

Navigate into the project:

```bash
cd Ai_code-review
```

---

## 2. Backend Setup

Navigate to the backend:

```bash
cd BackEnd
```

Install dependencies:

```bash
npm install
```

---

## 3. Configure Gemini API

Create a `.env` file inside the `BackEnd` directory:

```env
GOOGLE_GEMINI_KEY=your_gemini_api_key
```

You can optionally configure the Gemini model:

```env
GEMINI_MODEL=gemini-3.8-flash
```

> **Important:** Never commit your Gemini API key to GitHub.

---

## 4. Start the Backend

```bash
npm start
```

The backend runs on:

```text
http://localhost:3000
```

---

## 5. Frontend Setup

Open another terminal and navigate to:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will provide the local frontend URL in the terminal.

---

# 🧪 Available Scripts

## Frontend

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Backend

### Start Server

```bash
npm start
```

---

# 🔐 Environment Variables

The backend uses `dotenv` to load environment variables.

| Variable            | Description           | Required |
| ------------------- | --------------------- | -------- |
| `GOOGLE_GEMINI_KEY` | Google Gemini API key | Yes      |
| `GEMINI_MODEL`      | Gemini model name     | No       |

Example:

```env
GOOGLE_GEMINI_KEY=your_api_key_here
GEMINI_MODEL=gemini-3.8-flash
```

---

# 🛡️ Security Considerations

The Gemini API key is kept on the backend rather than exposed directly to the React frontend.

The project uses:

* Environment variables
* `.gitignore`
* Backend-side API communication
* Input validation
* Error handling
* CORS configuration

**Never expose your Gemini API key in frontend source code or commit your `.env` file to GitHub.**

---

# 📱 Responsive Design

The UI is designed to work across different screen sizes.

### Desktop

The code editor and review panel appear side-by-side:

```text
┌──────────────────┬──────────────────┐
│                  │                  │
│    Your Code     │      Review      │
│                  │                  │
└──────────────────┴──────────────────┘
```

### Mobile

The panels automatically stack:

```text
┌──────────────────┐
│    Your Code     │
└──────────────────┘
          ↓
┌──────────────────┐
│      Review      │
└──────────────────┘
```

---

# 🧩 Key Technical Concepts

This project demonstrates practical knowledge of:

* React Hooks
* React State Management
* Component-Based Architecture
* Vite
* REST API Development
* Express.js Routing
* Node.js
* Axios
* Asynchronous JavaScript
* Promises and `async/await`
* API Integration
* Google Gemini API
* Generative AI
* Prompt Engineering
* AI Code Analysis
* Error Handling
* API Request Validation
* Retry Mechanisms
* Model Fallback
* Environment Variables
* CORS
* Markdown Rendering
* Syntax Highlighting
* Responsive Web Design
* Git & GitHub

---

# 🎯 Project Objective

The goal of this project is to demonstrate how **Generative AI can be integrated into a full-stack JavaScript application** to create a practical developer tool.

Instead of manually reviewing every aspect of a piece of code, developers can submit their code and receive AI-generated feedback covering areas such as:

> **Quality → Bugs → Security → Performance → Maintainability → Best Practices**

This makes the application useful as both a development assistant and a learning tool for programmers.

---

# 🔮 Future Improvements

Potential improvements for future versions include:

* [ ] Support for multiple programming languages
* [ ] User authentication
* [ ] Review history
* [ ] Database integration
* [ ] Save previous code reviews
* [ ] Code quality score
* [ ] Side-by-side original vs. improved code
* [ ] GitHub repository integration
* [ ] GitHub Pull Request review integration
* [ ] AI-generated optimized code
* [ ] Streaming AI responses
* [ ] Rate limiting
* [ ] Improved API security
* [ ] Production deployment
* [ ] User-specific dashboards
* [ ] Export AI reviews as PDF/Markdown

---

# 🚀 Future Architecture

The project can be extended into a more complete developer platform:

```text
                         ┌───────────────┐
                         │    GitHub     │
                         └───────┬───────┘
                                 │
                                 ▼
┌──────────────┐         ┌────────────────┐
│    React     │ ──────► │ Node + Express │
│   Frontend   │         │    Backend     │
└──────────────┘         └───────┬────────┘
                                 │
                     ┌───────────┼───────────┐
                     ▼           ▼           ▼
                  Gemini      Database    GitHub API
                     │
                     ▼
              AI Code Review
```

---

# 👨‍💻 Author

## Mohd Shaan


