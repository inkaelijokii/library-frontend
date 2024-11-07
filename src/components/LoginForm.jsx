import { useState } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../queries"
import PropTypes from "prop-types"

const LoginForm = ({ show, setToken }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const token = data.login.value
      setToken(token)
      localStorage.setItem("user-token", token)
    },
  })

  if (!show) return null

  const handleSubmit = async (event) => {
    event.preventDefault()
    await login({ variables: { username, password } })
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Username <input value={username} onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          Password <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
        </div>
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