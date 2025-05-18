import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { authorizedRequest } from '../lib/api'

function RecipeList() {

    const [recipes, setRecipes] = useState([])

    async function getAllRecipes() {
        try {
            const response = await authorizedRequest('get', '/recipes/')
            if (!response || !response.data) {
                console.error("No response.")
                return
            }
            setRecipes(response.data)
        }
        catch (error) {
            console.error('Error fetching recipes:', error)
        }

    }

    useEffect(() => {
        getAllRecipes()
    }, [])

    // I used Bulma and regular CSS to style the app
    return (
        <>
            <section className="section">
                <div className="container">
                    <div className="level">
                        <div className="level-left">
                            <h2 className='is-size-2'>My Recipes</h2>
                        </div>

                        <div className="level-right">
                            <Link to="/recipes/new" ><button className="button is-info is-light is-rounded"> New Recipe</button></Link>
                        </div>
                    </div>

                    {recipes.length === 0 ? (
                        <p>No recipes found.</p>
                    ) : (

                        <div className="columns is-multiline">
                            {recipes.map(recipe => (
                                <div className="column is-one-third" key={recipe.id}>
                                    <Link to={`/recipes/${recipe.id}`}>
                                        <div className="card equal-height">
                                            <div className="card-image">
                                                <figure className="image is-4by3">
                                                    <img
                                                        src={recipe.img_url}
                                                        alt={recipe.name}
                                                    />
                                                </figure>
                                            </div>
                                            <div className="card-content">
                                                <p className="title is-4">{recipe.name}</p>
                                            </div>

                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </section >
        </>

    )
}


export default RecipeList
