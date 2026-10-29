import { useState } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import editorModule from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import axios from 'axios'
import './App.css'

const Editor = editorModule.default
const API_BASE_URL = (
  import.meta.env.VITE_API_URL || 'https://ai-code-review-indol-one.vercel.app'
).replace(/\/+$/, '')
const starterCode = `function sum() {
  return 1 + 1
}`

function App() {
  const [code, setCode] = useState(starterCode)
  const [review, setReview] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function reviewCode() {
    if (!code.trim()) {
      setError('Add some code before requesting a review.')
      setReview('')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await axios.post(`${API_BASE_URL}/ai/get-review`, { code }, { timeout: 90000 })
      setReview(response.data.review)
    } catch (requestError) {
      setReview('')
      setError(
        requestError.response?.data?.message ||
        (typeof requestError.response?.data === 'string' ? requestError.response.data : '') ||
        'Could not generate a review. Check that the backend is running and try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">GEMINI-POWERED</p>
          <h1>Code review</h1>
          <p className="subtitle">Paste your code and get actionable feedback.</p>
        </div>
        <button
          className="review-button"
          type="button"
          onClick={reviewCode}
          disabled={isLoading}
        >
          {isLoading ? 'Reviewing…' : 'Review code'}
        </button>
      </header>

      <section className="review-workspace" aria-label="Code review workspace">
        <div className="panel code-panel">
          <div className="panel-heading">
            <h2>Your code</h2>
            <span>JavaScript</span>
          </div>
          <div className="editor">
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={value => prism.highlight(value, prism.languages.javascript, 'javascript')}
              padding={16}
              textareaId="code-input"
              textareaClassName="code-input"
              aria-label="Code to review"
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 14,
                minHeight: '100%',
                width: '100%',
              }}
            />
          </div>
        </div>

        <div className="panel result-panel" aria-live="polite">
          <div className="panel-heading">
            <h2>Review</h2>
            {isLoading && <span>Working…</span>}
          </div>
          {error ? (
            <p className="feedback error-message" role="alert">{error}</p>
          ) : review ? (
            <div className="review-content">
              <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
            </div>
          ) : (
            <p className="feedback">Your review will appear here.</p>
          )}
        </div>
      </section>
    </main>
  )
}

export default App
