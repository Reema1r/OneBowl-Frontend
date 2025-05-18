import React from 'react'
import { useNavigate } from 'react-router'

function RecipeForm(props) {
    const navigate = useNavigate()

    // I used Bulma and regular CSS to style the app
    return (
        <>
            <h1 className='title is-3 mt-5  ml-3'>{props.titleVerb} Recipe</h1>
            <form className='box' onSubmit={props.handleSubmit}>
                <div className="delete-page ">

                    <div className='field'>
                        <label htmlFor="name" className='label'>Recipe Name </label>
                        <div className='control'>
                            <input
                                className='input'
                                id="name"
                                type="text"
                                name="name"
                                required={true}
                                value={props.name}
                                onChange={event => props.setName(event.target.value)}
                            />
                        </div>
                    </div>

                    <div className='field'>
                        <label htmlFor="description" className='label'>Description </label>
                        <div className='control'>
                            <textarea
                                className='textarea'
                                id="description"
                                name="description"
                                rows={4}
                                required={true}
                                value={props.description}
                                onChange={event => props.setDescription(event.target.value)}
                            />
                        </div>
                    </div>

                    <div className='field'>
                        <label htmlFor="ingredients" className='label'>Ingredients </label>
                        <div className='control'>
                            <textarea
                                className='textarea'
                                id="ingredients"
                                name="ingredients"
                                rows={10}
                                required={true}
                                value={props.ingredientsText}
                                onChange={event => props.setIngredientsText(event.target.value)}

                            />
                        </div>
                    </div>

                    <div className='field'>
                        <label htmlFor="instructions" className='label'>Instructions </label>
                        <div className='control'>
                            <textarea
                                className='textarea'
                                id="instructions"
                                name="instructions"
                                rows={10}
                                required={true}
                                value={props.instructions}
                                onChange={event => props.setInstructions(event.target.value)}
                            />
                        </div>
                    </div>

                    <div className='field'>
                        <label htmlFor="image" className='label'>Image </label>
                        <div className='control'>
                            <input
                                className='input'
                                id="image"
                                type='file'
                                accept='image/*'
                                onChange={event => props.setRecipeImage(event.target.files[0])}
                            />
                        </div>
                    </div>

                    <div className=' buttons is-centered'>
                        <button className='button is-primary is-outlined is-rounded mr-4'>Save</button>
                        <button className='button is-info is-light is-rounded' onClick={() => navigate(-1)}>Cancel</button>

                    </div>

                    {/* <button type='submit'>Save</button> */}
                </div>
            </form>

        </>
    )
}

export default RecipeForm
