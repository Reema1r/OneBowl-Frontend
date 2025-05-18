import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { setTokens } from '../lib/api'
import axios from 'axios'

function Login() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const [error, setError] = useState("")

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError("")

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/token/`, formData)
            setTokens({
                access: response.data.access,
                refresh: response.data.refresh
            })
            navigate("/recipes")
        } catch (err) {
            console.log(err)
            setError("Invalid username or password")
        }
    }

    // I used Bulma and regular CSS to style the app
    return (
        < section className='hero is-fullheight' >
            <div className="hero-body">
                <div className="column is-half is-offset-one-quarter">

                    <form onSubmit={handleSubmit} className="box login-form-box" >
                        <label className='label login-form-label' >Login</label>

                        <div className='field'>
                            <label className='label'>Username</label>
                            <div className='control'>

                                <input
                                    className='input '
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className='field'>
                            <label className='label'>Password</label>
                            <div className='control'>
                                <input
                                    className='input'
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {<p className="help is-danger">{error}</p>}
                        <div className='login-div'>
                            <div className="field">
                                <button className='button is-success is-rounded' type="submit">Login</button>
                            </div>
                            <div className='field has-text-centered'>
                                <Link to="/signup">New here? Create an account</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section >

    )
}

export default Login