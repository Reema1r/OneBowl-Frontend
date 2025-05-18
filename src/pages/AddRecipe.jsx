import React, { useState } from 'react'
import RecipeForm from '../components/RecipeForm'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { authorizedRequest } from '../lib/api'


function AddRecipe() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [instructions, setInstructions] = useState("")
    const [errorMessage, setMessage] = useState("")
    const navigate = useNavigate()
    const [recipeImage, setRecipeImage] = useState(null)

    const [ingredientsText, setIngredientsText] = useState("")

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

        // set default image when the url is null
        else {
            cloudinaryImageUrl = "https://res.cloudinary.com/dfqwudr0j/image/upload/v1746123466/default_image_fycdit.avif"
        }


        // sending the data to backend API
        try {
            const response = await authorizedRequest('post', '/recipes/', { name, description, instructions, img_url: cloudinaryImageUrl })



            // getting the created recipe id so I can use it to add ingredients to that recipe
            // https://stackoverflow.com/questions/68070186/how-to-get-the-id-of-a-post-request-in-react-hook-axios
            const createdRecipeID = response.data.id

            // handle the igredient text entered by the user by splitting it into many ingredients
            // https://forum.freecodecamp.org/t/newline-in-react-string-solved/68484
            const separatedIngredients = ingredientsText.split("\n")

            for (let ingredient of separatedIngredients) {
                await authorizedRequest('post', '/ingredients/', {
                    name: ingredient,
                    recipe: createdRecipeID
                })
            }

            setName("")
            setDescription("")
            setInstructions("")
            setIngredientsText("")
            navigate("/recipes")
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
                titleVerb='Add'
            />
        </>
    )
}

export default AddRecipe
