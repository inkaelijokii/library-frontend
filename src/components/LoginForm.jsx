import { useState } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../queries"
import PropTypes from "prop-types"

const LoginForm = ({ show, setToken }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [login] = useMutation(LOGIN)

  const handleLogin = async (event) => {
    event.preventDefault()
    const result = await login({ variables: { username, password } })
    if (result) {
      setToken(result.data.login.value)
      localStorage.setItem('user-token', result.data.login.value)
    }
  }

  if (!show) return null

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input value={username} onChange={({ target }) => setUsername(target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} placeholder="Password" />
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
    show: PropTypes.bool.isRequired,
    setToken: PropTypes.bool.isRequired
}

export default LoginForm