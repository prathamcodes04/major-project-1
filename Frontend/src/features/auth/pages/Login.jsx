import { useState } from 'react'
import '../auth.form.scss'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Login = () => {
  
  const {loading, handleLogin} = useAuth();
  const navigate = useNavigate()

  // two-way binding
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async(event) => {
    event.preventDefault()
    await handleLogin({email, password})
    navigate("/")
  }

  if(loading){
    return (
      <main>
        <h1>Loading.......</h1>
      </main>
    )
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
              onChange={(e) => {setEmail(e.target.value)}}
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
              onChange={(e) => {setPassword(e.target.value)}}
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
          

        </form>

        <p className="auth-form-footer">
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>
      </section>
    </main>
  )
}

export default Login
