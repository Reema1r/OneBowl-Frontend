import React from 'react'
import { Link } from 'react-router'

function Home() {
    // I used Bulma and regular CSS to style the app
    return (
        <>
            <section className='hero is-medium'>
                <div className="hero-body">
                    <p className='title is-1 is-spaced'>Keep your favorite recipes<br /> organized and accessible anytime! </p>
                    <p className='subtitle is-3'> No more lost recipes, screenshots, or notes flipping. All your <br />favorite recipes in one place.</p>
                    <div>
                        <Link to={`/signup`} ><button className='button is-link is-rounded '>Get Started</button></Link>
                    </div>
                </div>
            </section >
        </>
    )
}

export default Home
