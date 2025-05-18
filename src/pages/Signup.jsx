import { useState } from 'react'
import axios from 'axios'
import { setTokens } from '../lib/api'
import { useNavigate } from 'react-router'
import { Link } from 'react-router'

function Signup() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/signup/`,
                { username, email, password }
            )

            console.log(response.data)
            setTokens(response.data)
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }
    // I used Bulma and regular CSS to style the app
    return (
        < section className='hero is-fullheight' >
            <div className="hero-body">
                <div className="column is-half is-offset-one-quarter">


                    <form onSubmit={handleSubmit} className="box signup-form-box">
                        <label className='label login-form-label' >Sign Up</label>

                        <div className='field'>
                            <label className='label'>Username</label>
                            <div className='control'>
                                <input
                                    className='input'
                                    type="text"
                                    placeholder="Username"
                                    name="username"
                                    onChange={event => setUsername(event.target.value)}
                                    value={username}
                                />
                            </div>
                        </div>

                        <div className='field'>
                            <label className='label'>Password</label>
                            <div>
                                <input
                                    className='input'
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    onChange={event => setPassword(event.target.value)}
                                    value={password}
                                />
                            </div>
                        </div>

                        <div className='field'>
                            <label className='label'>Email</label>
                            <div>
                                <input
                                    className='input'
                                    type="text"
                                    placeholder="email"
                                    name="email"
                                    onChange={event => setEmail(event.target.value)}
                                    value={email}
                                />
                            </div>
                        </div>

                        <div className='login-div'>
                            <div className="field">
                                <button className='button is-success is-rounded' type="submit">Sign Up!</button>
                            </div>
                            <div className='field has-text-centered'>
                                <Link to="/login">Already have an account?</Link>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </section >

    )
}

export default Signup