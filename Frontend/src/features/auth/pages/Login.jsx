import { useState } from 'react'
import '../auth.form.scss'
import { Link } from 'react-router'

const Login = () => {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="auth-page">
      <section className="auth-form-card">
        <h1>Login</h1>
        <p className="auth-form-description">Testing login form</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              autoComplete="email"
              required
            />
          </div>
          <div className="auth-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              autoComplete="current-password"
              required
            />
          </div>

          <button className="auth-form-submit" type="submit">
            Login
          </button>
          {submitted && (
            <p className="auth-form-status" role="status">
              Test form submitted. Authentication is not connected.
            </p>
          )}

        </form>

        <p className="auth-form-footer">
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>
      </section>
    </main>
  )
}

export default Login
