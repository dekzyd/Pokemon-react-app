import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useMatch } from 'react-router-dom';

// Components
import Loader from '../components/Loader';

const PokemonPage = () => {

    const match = useMatch("/pokemon/:userId");
    const id = match.params.userId;
    const [pokemonDetails, setPokemonDetails] = useState();
    const [loading, setLoading] = useState(true);

    const getPokemon = async (id) => {
        const details = await getPokemonData(id);
        setPokemonDetails(details.data);
        setLoading(false);
    }
    
    const getPokemonData = async (id) => {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        return res;
    }

    useEffect(() => {
        getPokemon(id);
        console.log(pokemonDetails)
    }, [])



    return (
        <>
            { loading ? (
                <Loader/>
            ) : (
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Card 
                            className='my-3 p-3 rounded text-center shadow p-3 mb-5 bg-white'
                            style={{ border: 'none' }}>
                            
                            <Link to={`/pokemon/${pokemonDetails.id}`}>
                                <Card.Img 
                                    style={{ width: '15rem' }}
                                    src={pokemonDetails.sprites.front_default}
                                    variant='top'
                                />
                            </Link>
                            <Card.Body className={`${pokemonDetails.types[0].type.name} rounded text-white`}>
                                <Link to={`/pokemon/${pokemonDetails.id}`} className='link-name'>
                                    <Card.Title as='div'>
                                        <strong># {pokemonDetails.id} {pokemonDetails.name.charAt(0).toUpperCase() + pokemonDetails.name.slice(1)}</strong>
                                    </Card.Title>
                                </Link>
                            </Card.Body>

                        </Card>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Card className='p-3 rounded text-center shadow p-3 mb-5 bg-white' style={{ border: 'none' }}>
                            <Card.Body>
                                <Card.Text>
                                    <Row>
                                        {pokemonDetails.types.map(t => (
                                            <Col key={t.type.name}>
                                                <div className={`${t.type.name} rounded px-4 py-1`} style={{ color: 'white' }}>
                                                    {t.type.name.toUpperCase()}
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Card.Img style={{ width: '15rem' }} src={pokemonDetails.sprites.front_default}/>
                                            <Card.Text>Normal Form</Card.Text>
                                        </Col>
                                        <Col>
                                            <Card.Img style={{ width: '15rem' }} src={pokemonDetails.sprites.front_shiny}/>
                                            <Card.Text>Shiny Form</Card.Text>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <div 
                                                className='px-4 py-1 rounded' 
                                                style={{ border: '1px black solid' }}>
                                                Abilities
                                            </div>
                                        </Col>
                                    </Row>
                                
                                    {/* test */}
                                    <Row>
                                            <Col className='rounded px-4 py-1 stat-name' xs={6} sm={6} md={6} lg={6} xl={6}>
                                                <p>Species</p>
                                                <p>Height</p>
                                                <p>Weight</p>
                                                <p>Abilities</p>
                                                
                                            </Col>
                                            <Col className='rounded px-4 py-1 stat-detail' xs={6} sm={6} md={6} lg={6} xl={6}>
                                                <p>{pokemonDetails.species.name.charAt(0).toUpperCase() + pokemonDetails.species.name.slice(1)}</p>
                                                <p>{pokemonDetails.height}</p>
                                                <p>{pokemonDetails.weight}</p>
                                                <p>{pokemonDetails.abilities.map(d => (
                                                    <span>{d.ability.name.charAt(0).toUpperCase() + d.ability.name.slice(1) + ". "} </span>
                                                ))}</p>
                                            </Col>
                                    </Row>
                                   
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </>
    )

}

export default PokemonPage;