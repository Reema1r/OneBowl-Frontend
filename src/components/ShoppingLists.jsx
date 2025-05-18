import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { authorizedRequest } from '../lib/api'

function ShoppingLists() {
    const [lists, setLists] = useState([])

    async function getAllShoppingLists() {
        try {
            const response = await authorizedRequest('get', '/shoppinglist/')

            if (!response || !response.data) {
                console.error("No response.")
                return
            }
            setLists(response.data)
            console.log(response)
        }
        catch (error) {
            console.error('Error fetching recipes:', error)
        }
    }
    useEffect(() => {
        getAllShoppingLists()
    }, [])

    // I used Bulma and regular CSS to style the app
    return (
        <>
            <section className="section">
                <div className="container">
                    <div className="level">
                        <div className="level-left">
                            <h2 className='is-size-2'>My Shopping Lists</h2>
                        </div>
                    </div>

                    {lists.length === 0 ? (
                        <p>No shopping lists found.</p>
                    ) : (

                        < div className="columns is-multiline">
                            {lists.map(list => (
                                <div className="column is-one-third" key={list.id}>
                                    <Link to={`/shoppinglist/${list.id}`}>
                                        <div className="card equal-height">

                                            <div className="card-image">
                                                <figure className="image is-4by3">
                                                    <img
                                                        src={"/list.jpg"}
                                                        alt={list.name}
                                                    />
                                                </figure>
                                            </div>

                                            <div className="card-content">
                                                <p className="title is-4">{list.name}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div >
                    )}
                </div>
            </section>
        </>
    )
}

export default ShoppingLists
