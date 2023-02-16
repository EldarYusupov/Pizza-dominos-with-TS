import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

const FullPizza: React.FC = () => {
    const {id} = useParams()
    const [pizza, setPizza] = useState<{
        imageUrl:string,
        title:string,
        price:number
    }>([])

    useEffect(() => {
        async function fetchPizza() {
           const {data} = await axios.get('https://63dbce38c45e08a0434e7f8c.mockapi.io/items/' + id)
            setPizza(data)
        }
        fetchPizza()
    }, [])
    return (
        <div className="container">
            <img src={pizza.imageUrl} alt=""/>
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} грн.</h4>
        </div>
    );
};

export default FullPizza;