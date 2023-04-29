import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";

// Components
import Pokemon from './Pokemon';
import Loader from './Loader';

const Homepage = () => {

    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getPokemonList = async () => {

    
    try {
        let pokemonArray = [];
        for(let i = 1; i <= 151; i++){
            pokemonArray.push(await getPokemonData(i)); 
    }
        setPokemon(pokemonArray);
        setLoading(false);
    }
    catch (error) {
        setLoading(false);
        setError(error.message);
        }
    }

    const getPokemonData = async (id) => {
        try {
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            return res;
        } 
        catch (error) {
            throw new Error(`${error.message}`);
        }
    }

    useEffect(() => {
        getPokemonList();
    }, [])

    return (
        <>
            {error ? (
                <Row>
                    <Col className="error_msg" xs={12} sm={12} md={12} lg={12} xl={12}>
                        <h2>Failed to get data: {error} </h2>
                    </Col>
                </Row>
            ) : loading ? (
                <Loader />
            ) : (
                <Row>
                    {pokemon.map(p => (
                    <Col key={p.data.name} xs={12} sm={12} md={4} lg={4} xl={4}>
                        <Pokemon pokemon={p.data} />
                    </Col>
                    ))}
                </Row>
                )}
        </>
    );
}

export default Homepage;