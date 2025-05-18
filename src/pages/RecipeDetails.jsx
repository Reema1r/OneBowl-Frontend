import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router'
import { authorizedRequest } from '../lib/api'


function RecipeDetails() {

    const [recipe, setRecipe] = useState(null)
    const { id } = useParams()
    const [errorMessage, setMessage] = useState('')
    const navigate = useNavigate()

    async function getRecipe() {
        try {
            const response = await authorizedRequest('get', `/recipes/${id}/`)

            console.log(response)
            setRecipe(response.data)
        }

        catch (error) {
            if (error.status === 404) {
                navigate("/notFound")
            }
            else {
                setMessage("Oops! Something went wrong. Please refresh or try again later.")
            }
        }
    }

    useEffect(() => {
        getRecipe()
        console.log(id)
    }, [])

    if (!recipe) {
        return <div>{errorMessage}</div>
    }

    return (
        <>
            <section className='section'>
                <h1 className='title is-3 '>Recipe Details</h1>
                <div className='container'>
                    <div className='box'>
                        <h3 className='subtitle is-3'>{recipe.name}</h3>
                        <p>{recipe.description}</p>

                        {/* image */}
                        <div className='has-text-centered mt-6'>
                            {
                                recipe.img_url
                                    ?
                                    <figure className='image is-inline-block recipe-img'>
                                        <img src={recipe.img_url} />
                                    </figure>
                                    :
                                    null
                            }
                        </div>

                        {/* Ingredients */}
                        <h4 className='subtitle is-5 mt-6' >Ingredients</h4>
                        <div className='mb-4'>
                            <ul>
                                {recipe.ingredients.map((ingredient) => (
                                    <li key={ingredient.id}> 🥄 {ingredient.name}</li>
                                ))}
                            </ul>
                        </div>
                        <Link to={`/recipes/${recipe.id}/add-shopping-list`} >Missing an ingredient? create a shopping list</Link>

                        {/* Instructions */}
                        <h4 className='subtitle is-5 mt-6' >Instructions</h4>
                        <div className='mb-6'>
                            {recipe.instructions.split("\n").map((instruction, index) => (
                                <p key={index}>📃 {instruction}</p>
                            ))}
                        </div>

                        <div>
                            <Link to={`/recipes/${recipe.id}/edit`} ><button className='button is-info is-light is-rounded mr-4'> Edit </button></Link>
                            <Link to={`/recipes/${recipe.id}/delete`} ><button className='button is-danger is-outlined is-rounded'> Delete </button></Link>

                        </div>


                    </div>
                </div>
            </section>
        </>
    )
}

export default RecipeDetails
