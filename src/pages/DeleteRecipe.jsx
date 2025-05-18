import React from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { authorizedRequest } from '../lib/api'


function DeleteRecipe() {
    const { id } = useParams()
    const [errorMessage, setMessage] = useState("")
    const navigate = useNavigate()

    async function deleteRecipe() {
        try {
            const response = await authorizedRequest('delete', `/recipes/${id}/`)

            if (response.status === 204) {
                navigate('/recipes')
            }

        } catch (error) {
            setMessage("Something went wrong while deleting the recipe. Please try again later.")

        }
    }
    return (
        <>
            <section>
                <div className="delete-page ">
                    <div className='container '>
                        <h2 className='title is-3 mt-6'>Are you sure you want to delete this recipe?</h2>
                        <div className=' buttons is-centered'>
                            <button className='button is-danger is-outlined is-rounded mr-4' onClick={deleteRecipe}>Yes, Delete</button>
                            <button className='button is-info is-light is-rounded' onClick={() => navigate(-1)}>Cancel</button>
                        </div>
                        <p>{errorMessage}</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default DeleteRecipe
