import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'

import Home from './pages/Home'
import NavBar from './components/NavBar'
import MyRecipes from './pages/MyRecipes'
import AllShoppingLists from './pages/AllShoppingLists'
import NotFound from './components/NotFound'
import RecipeDetails from './pages/RecipeDetails'
import AddRecipe from './pages/AddRecipe'
import EditRecipe from './pages/EditRecipe'
import DeleteRecipe from './pages/DeleteRecipe'
import AddShoppingList from './pages/AddShoppingList'
import ShoppingListDetails from './pages/ShoppingListDetails'
import EditShoppingList from './pages/EditShoppingList'
import DeleteShoppingList from './pages/DeleteShoppingList'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Footer from './components/Footer'
import Logout from './pages/Logout'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {
  return (
    <>

      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/recipes' element={<MyRecipes />} />
            <Route path='/shoppingLists' element={<AllShoppingLists />} />
            <Route path='/recipes/:id' element={<RecipeDetails />} />
            <Route path='/recipes/new' element={<AddRecipe />} />
            <Route path='/recipes/:id/edit' element={<EditRecipe />} />
            <Route path='/recipes/:id/delete' element={<DeleteRecipe />} />
            <Route path='/recipes/:id/add-shopping-list' element={<AddShoppingList />} />
            <Route path='shoppinglist/:id' element={<ShoppingListDetails />} />
            <Route path='shoppinglist/:id/edit' element={<EditShoppingList />} />
            <Route path='shoppinglist/:id/delete' element={<DeleteShoppingList />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>

      </BrowserRouter>
      <div>
        <Footer />
      </div>

    </>



  )
}

export default App
