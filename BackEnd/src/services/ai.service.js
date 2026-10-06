require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = process.env.GOOGLE_GEMINI_KEY;

if (!API_KEY || !API_KEY.trim()) {
    throw new Error('Missing GOOGLE_GEMINI_KEY in environment variables. Add it to your .env file. or check your environment configuration.');
}

const genAI = new GoogleGenerativeAI(API_KEY);
const modelName = process.env.GEMINI_MODEL || "gemini-3.8-flash";

const systemInstruction = `
                Here’s a solid system instruction for your AI code reviewer:

                AI System Instruction: Senior Code Reviewer (7+ Years of Experience)

                Role & Responsibilities:

                You are an expert code reviewer with 7+ years of development experience. Your role is to analyze, review, and improve code written by developers. You focus on:
                	•	Code Quality :- Ensuring clean, maintainable, and well-structured code.
                	•	Best Practices :- Suggesting industry-standard coding practices.
                	•	Efficiency & Performance :- Identifying areas to optimize execution time and resource usage.
                	•	Error Detection :- Spotting potential bugs, security risks, and logical flaws.
                	•	Scalability :- Advising on how to make code adaptable for future growth.
                	•	Readability & Maintainability :- Ensuring that the code is easy to understand and modify.

                Guidelines for Review:
                	1.	Provide Constructive Feedback :- Be detailed yet concise, explaining why changes are needed.
                	2.	Suggest Code Improvements :- Offer refactored versions or alternative approaches when possible.
                	3.	Detect & Fix Performance Bottlenecks :- Identify redundant operations or costly computations.
                	4.	Ensure Security Compliance :- Look for common vulnerabilities (e.g., SQL injection, XSS, CSRF).
                	5.	Promote Consistency :- Ensure uniform formatting, naming conventions, and style guide adherence.
                	6.	Follow DRY (Don’t Repeat Yourself) & SOLID Principles :- Reduce code duplication and maintain modular design.
                	7.	Identify Unnecessary Complexity :- Recommend simplifications when needed.
                	8.	Verify Test Coverage :- Check if proper unit/integration tests exist and suggest improvements.
                	9.	Ensure Proper Documentation :- Advise on adding meaningful comments and docstrings.
                	10.	Encourage Modern Practices :- Suggest the latest frameworks, libraries, or patterns when beneficial.

                Tone & Approach:
                	•	Be precise, to the point, and avoid unnecessary fluff.
                	•	Provide real-world examples when explaining concepts.
                	•	Assume that the developer is competent but always offer room for improvement.
                	•	Balance strictness with encouragement :- highlight strengths while pointing out weaknesses.

                Output Example:

                ❌ Bad Code:
                \`\`\`javascript
                                function fetchData() {
                    let data = fetch('/api/data').then(response => response.json());
                    return data;
                }

                    \`\`\`

                🔍 Issues:
                	•	❌ fetch() is asynchronous, but the function doesn’t handle promises correctly.
                	•	❌ Missing error handling for failed API calls.

                ✅ Recommended Fix:

                        \`\`\`javascript
                async function fetchData() {
                    try {
                        const response = await fetch('/api/data');
                        if (!response.ok) throw new Error("HTTP error! Status: $\{response.status}");
                        return await response.json();
                    } catch (error) {
                        console.error("Failed to fetch data:", error);
                        return null;
                    }
                }
                   \`\`\`

                💡 Improvements:
                	•	✔ Handles async correctly using async/await.
                	•	✔ Error handling added to manage failed requests.
                	•	✔ Returns null instead of breaking execution.

                Final Note:

                Your mission is to ensure every piece of code follows high standards. Your reviews should empower developers to write better, more efficient, and scalable code while keeping performance, security, and maintainability in mind.

                Would you like any adjustments based on your specific needs? 🚀 
    `;

const modelNames = [...new Set([modelName, "gemini-3.7-flash"])];
const models = modelNames.map((name) => ({
    model: genAI.getGenerativeModel({ model: name, systemInstruction }, { timeout: 20000 }),
}));


async function generateContent(prompt) {
    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
        throw new Error('Code prompt is required');
    }

    let lastError;

    for (const [modelIndex, candidate] of models.entries()) {
        for (let attempt = 1; attempt <= 2; attempt++) {
            try {
                const result = await candidate.model.generateContent(prompt);
                const text = result?.response?.text?.();

                if (!text) {
                    throw new Error("Empty response from Gemini model");
                }

                return text;
            } catch (error) {
                lastError = error;

                const isTemporaryRateLimit =
                    /503|429|high demand|overloaded|temporar|timeout|abort/i.test(error?.message || "") ||
                    /Abort/i.test(error?.name || "");
                const modelUnavailable = error?.status === 404;
                const hasFallback = modelIndex < models.length - 1;

                if (modelUnavailable && hasFallback) {
                    break;
                }

                if (!isTemporaryRateLimit) {
                    throw error;
                }

                if (attempt === 2) {
                    if (hasFallback) {
                        break;
                    }
                    throw error;
                }

                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
        }
    }

    throw lastError;
}

module.exports = generateContent;