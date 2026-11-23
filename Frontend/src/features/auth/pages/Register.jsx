import { useState } from 'react'
import { Link } from 'react-router'
import '../auth.form.css'

const Register = () => {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="register-page">
      <section className="register-card">
        <h1>Create an account</h1>
        <p className="register-description">Testing registration form</p>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-form-group">
            <label htmlFor="register-username">Username</label>
            <input
              type="text"
              id="register-username"
              name="username"
              placeholder="Choose a username"
              autoComplete="username"
              required
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="register-email">Email</label>
            <input
              type="email"
              id="register-email"
              name="email"
              placeholder="Enter email address"
              autoComplete="email"
              required
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="register-password">Password</label>
            <input
              type="password"
              id="register-password"
              name="password"
              placeholder="Create a password"
              autoComplete="new-password"
              required
            />
          </div>

          <button className="register-submit" type="submit">
            Create account
          </button>
          {submitted && (
            <p className="register-status" role="status">
              Test form submitted. Authentication is not connected.
            </p>
          )}
        </form>

        <p className="register-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </section>
    </main>
  )
}

export default Register
