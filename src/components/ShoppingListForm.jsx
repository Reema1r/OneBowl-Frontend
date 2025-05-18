import React from 'react'
import { useNavigate } from 'react-router'

function ShoppingListForm(props) {
    const navigate = useNavigate()
    // I used Bulma and regular CSS to style the app
    return (
        <>
            <h1 className='title is-3 mt-5 ml-3'> {props.titleVerb} Shopping List</h1>
            <form className='box' onSubmit={props.handleSubmit}>
                <div className="delete-page ">

                    <div className='field'>
                        <label htmlFor="name" className='label'>Shopping List Name </label>
                        <div className='control'>
                            <input
                                className='input'
                                id="name"
                                type="text"
                                name="name"
                                required={true}
                                value={props.recipeName}
                                onChange={event => props.setRecipeName(event.target.value)}
                            />
                        </div>
                    </div>

                    <div className='field'>
                        <div>
                            <label htmlFor="list_items" className='label'>Items </label>
                            <div className='control'>
                                <textarea
                                    className='textarea'
                                    id="list_items"
                                    name="list_items"
                                    rows={10}
                                    required={true}
                                    value={props.ingredients}
                                    onChange={event => props.setIngredients(event.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className=' buttons is-centered'>
                        <button className='button is-primary is-outlined is-rounded mr-4'>Save</button>
                        <button className='button is-info is-light is-rounded' onClick={() => navigate(-1)}>Cancel</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default ShoppingListForm
