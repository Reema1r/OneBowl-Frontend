import React, { useEffect, useState } from 'react'
import RecipeForm from '../components/RecipeForm'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import { authorizedRequest } from '../lib/api'


function EditRecipe() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [instructions, setInstructions] = useState("")
    const [errorMessage, setMessage] = useState("")
    const navigate = useNavigate()
    const { id } = useParams()
    const [recipeImage, setRecipeImage] = useState(null)
    const [ingredientsText, setIngredientsText] = useState("")

    async function getCurrentRecipetData() {
        try {
            //get the recipe details using the id, and set it to the form fields
            const response = await authorizedRequest('get', `/recipes/${id}/`)

            setName(response.data.name)
            setDescription(response.data.description)
            setInstructions(response.data.instructions)
            setRecipeImage(response.data.img_url)

            // get all ingredients then filter the ingredients to keep only the ones associated with the recipe ID
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
            const ingredientResponse = await authorizedRequest('get', `/ingredients/`)

            const allIngredients = ingredientResponse.data
            const recipeIngredients = allIngredients.filter(ingredient => ingredient.recipe === parseInt(id))
            console.log("these are the ingredients", recipeIngredients)

            setIngredientsText(recipeIngredients.map(ingredient => ingredient.name).join("\n"))
        }
        catch {
            setMessage("Oops! Something went wrong. Please refresh or try again later.")
        }
    }
    useEffect(() => {
        getCurrentRecipetData()
    }, [])


    // handle data submit
    async function handleSubmit(event) {
        event.preventDefault()

        // to handle image upload
        let cloudinaryImageUrl = ""
        if (recipeImage) {
            const formData = new FormData()
            formData.append("file", recipeImage)
            formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)

            try {
                const cloudinaryResponse = await axios.post(
                    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
                    formData
                )
                cloudinaryImageUrl = cloudinaryResponse.data.secure_url
            } catch (error) {
                setMessage("Image upload failed. Please try again.")

            }
        }

        const recipeData = { name, description, instructions }

        // check if the user upload a new image then it will be added to recipeData, otherwise it will keep the exsisting one
        if (cloudinaryImageUrl) {
            recipeData.img_url = cloudinaryImageUrl
        }
        else if (recipeImage) {
            recipeData.img_url = recipeImage
        }


        try {
            const response = await authorizedRequest('patch', `/recipes/${id}/`, { name, description, instructions, img_url: cloudinaryImageUrl || recipeImage })

            // handle ingredients update
            const ingredientResponse = await authorizedRequest('get', `/ingredients/`)

            const allIngredients = ingredientResponse.data
            const recipeIngredients = allIngredients.filter(ingredient => ingredient.recipe === parseInt(id))

            console.log(recipeIngredients)
            for (let ingredient of recipeIngredients) {
                await authorizedRequest('delete', `/ingredients/${ingredient.id}/`)
            }

            const separatedIngredients = ingredientsText.split("\n").map(ingredient => ingredient.trim()).filter(ingredient => ingredient.length > 0)
            console.log("Sending ingredient data: ", separatedIngredients)
            for (let ingredient of separatedIngredients) {
                await authorizedRequest('post', '/ingredients/', { name: ingredient, recipe: id })

            }

            setName("")
            setDescription("")
            setInstructions("")
            navigate(`/recipes/${id}`)
        }

        catch (error) {
            setMessage("Oops! Something went wrong. Please refresh or try again later.")
        }
    }

    return (
        <>
            <RecipeForm
                name={name}
                setName={setName}
                description={description}
                setDescription={setDescription}
                instructions={instructions}
                setInstructions={setInstructions}
                handleSubmit={handleSubmit}
                setRecipeImage={setRecipeImage}
                ingredientsText={ingredientsText}
                setIngredientsText={setIngredientsText}
                titleVerb='Edit'

            />
        </>
    )
}

export default EditRecipe
