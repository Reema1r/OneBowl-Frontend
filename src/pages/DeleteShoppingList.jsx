import React from 'react'
import { useParams } from 'react-router'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { authorizedRequest } from '../lib/api'


export default function DeleteShoppingList() {
    const { id } = useParams()
    const [errorMessage, setMessage] = useState("")
    const navigate = useNavigate()

    async function deleteShoppingList() {
        try {
            const response = await authorizedRequest('delete', `/shoppinglist/${id}/`)

            if (response.status === 204) {
                navigate('/shoppinglists')
            }

        } catch (error) {
            setMessage("Something went wrong while deleting the shopping list. Please try again later.")

        }
    }

    return (
        <>
            <section>
                <div className="delete-page ">
                    <div className='container '>
                        <h2 className='title is-3 mt-6'>Are you sure you want to delete this shopping list?</h2>
                        <div className=' buttons is-centered'>
                            <button className='button is-danger is-outlined is-rounded mr-4' onClick={deleteShoppingList}>Yes, Delete</button>
                            <button className='button is-info is-light is-rounded mr-4' onClick={() => navigate(-1)}>Cancel</button>
                        </div>
                        <p>{errorMessage}</p>
                    </div>
                </div>
            </section>
        </>
    )
}
