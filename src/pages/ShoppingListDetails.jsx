import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { Link } from 'react-router'
import { authorizedRequest } from '../lib/api'


function ShoppingListDetails() {
    const [listDetails, setListDetails] = useState(null)
    const { id } = useParams()
    const [errorMessage, setMessage] = useState('')
    const navigate = useNavigate()

    async function getListDetails() {
        try {
            const response = await authorizedRequest('get', `/shoppinglist/${id}/`)

            console.log(response)
            setListDetails(response.data)
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
        getListDetails()
        console.log(id)
    }, [])


    if (!listDetails) {
        return <div>{errorMessage}</div>
    }

    return (
        <>
            <section className='section'>
                <h1 className='title is-3'>Shopping List Details</h1>
                <div className='container'>
                    <div className='box'>
                        <h3 className='subtitle is-3'>{listDetails.name}</h3>
                        <div className='content'>
                            {listDetails.ingredients_list.split('\n').map((ingredient, index) => (
                                <p key={index}>{ingredient}<br /></p>
                            ))}
                        </div>
                        <div>
                            <Link to={`/shoppinglist/${listDetails.id}/edit`} ><button className='button is-info is-light is-rounded mr-4' > Edit</button></Link>
                            <Link to={`/shoppinglist/${listDetails.id}/delete`} ><button className='button is-danger is-outlined is-rounded'> Delete</button></Link>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

export default ShoppingListDetails
