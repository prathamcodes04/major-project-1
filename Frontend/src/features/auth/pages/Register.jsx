import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import '../auth.form.scss'
import { useAuth } from '../hooks/useAuth'


const Register = () => {

  const {loading, handleRegister} = useAuth()
  const navigate = useNavigate()

  // two way binding
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async(event) => {
    event.preventDefault()
    await handleRegister({username, email, password})
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
    <main className="register-page">
      <section className="register-card">
        <h1>Create an account</h1>
        <p className="register-description">Testing registration form</p>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-form-group">
            <label htmlFor="register-username">Username</label>
            <input
              onChange={(e) => {setUsername(e.target.value)}}
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
            onChange={(e) => {setEmail(e.target.value)}}
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
              onChange={(e) => {setPassword(e.target.value)}}
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
        </form>

        <p className="register-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </section>
    </main>
  )
}

export default Register
