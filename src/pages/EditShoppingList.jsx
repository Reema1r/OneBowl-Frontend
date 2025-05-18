import React from 'react'
import ShoppingListForm from '../components/ShoppingListForm'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { authorizedRequest } from '../lib/api'


function EditShoppingList() {
    const [ingredients, setIngredients] = useState("")
    const [recipeName, setRecipeName] = useState("")
    const [recipeID, setRecipeID] = useState("")
    const [errorMessage, setMessage] = useState("")
    const { id } = useParams()
    const navigate = useNavigate()


    async function getCurrentShoppingListData() {
        try {
            const response = await authorizedRequest('get', `/shoppinglist/${id}`)

            console.log("Shopping list data:", response.data)
            setIngredients(response.data.ingredients_list)
            setRecipeName(response.data.name)
            setRecipeID(response.data.recipe)
        }

        catch {
            setMessage("Oops! Something went wrong. Please refresh or try again later.")
        }
    }

    useEffect(() => {
        getCurrentShoppingListData()
    }, [])

    async function handleSubmit(event) {
        event.preventDefault()

        try {
            const response = await authorizedRequest('patch', `/shoppinglist/${id}/`, { ingredients_list: ingredients, recipe: recipeID, name: recipeName })

            console.log("Shopping list updated")
            navigate(`/shoppinglist/${id}/`)
        }
        catch {
            setMessage("Oops! Something went wrong. Please refresh or try again later.")
        }
    }

    return (
        <>
            <ShoppingListForm
                ingredients={ingredients}
                setIngredients={setIngredients}
                handleSubmit={handleSubmit}
                recipeName={recipeName}
                setRecipeName={setRecipeName}
                titleVerb='Edit'
            />
        </>
    )
}

export default EditShoppingList
