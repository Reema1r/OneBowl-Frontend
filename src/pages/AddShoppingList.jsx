import React, { useState, useEffect } from 'react'
import ShoppingListForm from '../components/ShoppingListForm'
import { useNavigate, useParams } from 'react-router'
import { authorizedRequest } from '../lib/api'


function AddShoppingList() {

    const { id } = useParams()
    const [ingredients, setIngredients] = useState("")
    const [errorMessage, setMessage] = useState("")
    const [recipeName, setRecipeName] = useState("")
    const navigate = useNavigate()

    async function getRecipeIngredients() {
        try {
            const response = await authorizedRequest('get', `/recipes/${id}/`)

            const ingredientText = response.data.ingredients.map(ingredient => ingredient.name).join("\n")
            console.log(ingredientText)

            setIngredients(ingredientText)
            setRecipeName(response.data.name)
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
        getRecipeIngredients()
        console.log(id)
    }, [])



    async function handleSubmit(event) {
        event.preventDefault()

        try {
            const response = await authorizedRequest('post', '/shoppinglist/', { ingredients_list: ingredients, recipe: id, name: `Shopping List for ${recipeName}` })


            console.log("Shopping list created")
            navigate("/shoppingLists")

        }
        catch {
            setMessage("Oops! Something went wrong. Please refresh or try again later.")
        }
    }


    return (
        <>
            <ShoppingListForm
                setIngredients={setIngredients}
                ingredients={ingredients}
                handleSubmit={handleSubmit}
                setRecipeName={setRecipeName}
                titleVerb='Add'
            />
        </>
    )
}

export default AddShoppingList
