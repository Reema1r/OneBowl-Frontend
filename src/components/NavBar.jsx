import React from 'react'
import { Link } from 'react-router'
import { useLocation } from 'react-router'

function NavBar() {
    // get the current url path
    const location = useLocation()
    console.log(location.pathname)

    const isHome = location.pathname === "/"
    const isLoggedIn = localStorage.getItem('access_token')

    // I used Bulma 
    return (
        <>
            <nav className="navbar" role="navigation" aria-label="main navigation">

                <div className="navbar-brand">
                    <Link className="navbar-item" to="/">
                        <img src="/logo.png" alt="One Bowl App Logo" style={{ height: '120px', width: 'auto', maxHeight: 'none', marginRight: '10px' }} />
                    </Link>
                </div>
                <div className="navbar-menu">
                    <div className="navbar-start">

                        {/* show Home link only when the the user is not logged in */}
                        {!isLoggedIn && (<Link className="navbar-item" to="/">Home</Link>)}

                        {/* show Recipe , Shopping Lists and Logout links only when the the user is logged in */}
                        {isLoggedIn && (
                            <>
                                <Link className="navbar-item" to="/recipes"> Recipes</Link>
                                <Link className="navbar-item" to="/shoppingLists"> Shopping Lists</Link>
                                <Link className="navbar-item" to="/logout"> <button className='button is-rounded'>Logout</button></Link>
                            </>)}

                        {/* show Login and Signup links only when the the user is not logged in */}
                        <div className='navbar-end'>
                            {!isLoggedIn && isHome && (
                                <>
                                    <Link className="navbar-item" to="/login"><button className="button is-rounded">Login</button></Link>
                                    <Link className="navbar-item" to="/signup"><button className="button is-link is-rounded">Signup</button></Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>

            </nav > </>
    )
}

export default NavBar
