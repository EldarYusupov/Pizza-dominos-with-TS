import React from "react";
import './scss/app.scss'
import {Routes, Route} from 'react-router-dom'
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import Cart from './pages/Cart.tsx'
import FullPizza from "./pages/FullPizza.tsx";
import MainLayout from "./componentns/layouts/MainLayout.tsx";




function App() {


    return (
        <Routes>
            <Route path="/" element={<MainLayout/>}>
                <Route path='' element={<Home/>}/>
                <Route path='*' element={<NotFound/>}/>
                <Route path='cart' element={<Cart/>}/>
                <Route path='pizza/:id' element={<FullPizza/>}/>
            </Route>
        </Routes>

    );
}

export default App;
