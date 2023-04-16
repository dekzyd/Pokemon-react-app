import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useMatch } from 'react-router-dom';

// Bootstrap
import { Card, Row, Col } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ProgressBar from 'react-bootstrap/ProgressBar';

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
    }, [])



    return (
        <>
            { loading ? (
                <Loader/>
            ) : (
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Card 
                            className='my-3 p-3 rounded text-center shadow p-3 mb-5 bg-white '
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

                                    
                                
                                    {/* pokemon details */}

                                    <Tabs
                                    defaultActiveKey="about"
                                    id="uncontrolled-tab-example"
                                    className="mb-3 mt-5"
                                    >
                                        <Tab eventKey="about" title="About">
                                            <div className='stat_container'>
                                                <Row>
                                                    <Col className='px-4 py-1 stat-name' xs={2} sm={2} md={2} lg={2} xl={2}>
                                                        <p>Species</p>
                                                    </Col>
                                                    <Col xs={1} sm={1} md={1} lg={1} xl={1} >
                                                    </Col>
                                                    <Col className='px-4 py-1 stat-detail' xs={8} sm={8} md={8} lg={8} xl={8}>
                                                        <p>{pokemonDetails.species.name.charAt(0).toUpperCase() + pokemonDetails.species.name.slice(1)}</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col className='px-4 py-1 stat-name' xs={2} sm={2} md={2} lg={2} xl={2}>
                                                        <p>Height</p>
                                                    </Col>
                                                    <Col xs={1} sm={1} md={1} lg={1} xl={1} ></Col>
                                                    <Col className='px-4 py-1 stat-detail' xs={8} sm={8} md={8} lg={8} xl={8}>
                                                        <p>{pokemonDetails.height}</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col className='px-4 py-1 stat-name' xs={2} sm={2} md={2} lg={2} xl={2}>
                                                        <p>Weight</p>
                                                    </Col>
                                                    <Col xs={1} sm={1} md={1} lg={1} xl={1} ></Col>
                                                    <Col className='px-4 py-1 stat-detail' xs={8} sm={8} md={8} lg={8} xl={8}>
                                                        <p>{pokemonDetails.weight}</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col className='px-4 py-1 stat-name' xs={2} sm={2} md={2} lg={2} xl={2}>
                                                        <p>Abilities</p>                                                     
                                                    </Col>
                                                    <Col xs={1} sm={1} md={1} lg={1} xl={1} ></Col>
                                                    <Col className='px-4 py-1 stat-detail' xs={8} sm={8} md={8} lg={8} xl={8} >
                                                        <p>{pokemonDetails.abilities.map(d => (
                                                            <span>{d.ability.name.charAt(0).toUpperCase() + d.ability.name.slice(1) + ". "} </span>
                                                        ))}</p>
                                                    </Col>
                                                    
                                                </Row>
                                            </div>
                                        </Tab>
                                        <Tab eventKey="base stat" title="Base stat">
                                            <div className='stat_container'>
                                            {/* HP */}
                                                <Row>
                                                    <Col className='stat-name px-4 py-1' xs={2} sm={2} md={2} lg={2} xl={2}>
                                                        <p>HP</p>
                                                    </Col>
                                                    <Col className='stat-numbers px-4 py-1' xs={1} sm={1} md={1} lg={1} xl={1}>
                                                        <p>{pokemonDetails.stats[0].base_stat}</p>
                                                    </Col>
                                                    <Col className='px-4 py-2' xs={8} sm={8} md={8} lg={8} xl={8}>
                                                        <ProgressBar variant={pokemonDetails.stats[0].base_stat < 50 ? "danger" : "info"} now={pokemonDetails.stats[0].base_stat} />
                                                    </Col>
                                                </Row>
                                            {/* attack */}
                                                <Row>
                                                    <Col className='stat-name px-4 py-1' xs={2} sm={2} md={2} lg={2} xl={2}>
                                                        <p>Attack</p>
                                                    </Col>
                                                    <Col className='stat-numbers px-4 py-1' xs={1} sm={1} md={1} lg={1} xl={1}>
                                                        <p>{pokemonDetails.stats[1].base_stat}</p>
                                                    </Col>
                                                    <Col className='px-4 py-2' xs={8} sm={8} md={8} lg={8} xl={8}>
                                                        <ProgressBar variant={pokemonDetails.stats[1].base_stat < 50 ? "danger" : "info"} now={pokemonDetails.stats[1].base_stat} />
                                                    </Col>
                                                </Row>
                                            {/* defense */}
                                                <Row>
                                                    <Col className='stat-name px-4 py-1' xs={2} sm={2} md={2} lg={2} xl={2}>
                                                        <p>Defense</p>
                                                    </Col>
                                                    <Col className='stat-numbers px-4 py-1' xs={1} sm={1} md={1} lg={1} xl={1}>
                                                        <p>{pokemonDetails.stats[2].base_stat}</p>
                                                    </Col>
                                                    <Col className='px-4 py-2' xs={8} sm={8} md={8} lg={8} xl={8}>
                                                        <ProgressBar variant={pokemonDetails.stats[2].base_stat < 50 ? "danger" : "info"} now={pokemonDetails.stats[2].base_stat} />
                                                    </Col>
                                                </Row>
                                            {/* sp. atk */}
                                                <Row>
                                                    <Col className='stat-name px-4 py-1' xs={2} sm={2} md={2} lg={2} xl={2}>
                                                        <p>Sp. Atk</p>
                                                    </Col>
                                                    <Col className='stat-numbers px-4 py-1' xs={1} sm={1} md={1} lg={1} xl={1}>
                                                        <p>{pokemonDetails.stats[3].base_stat}</p>
                                                    </Col>
                                                    <Col className='px-4 py-2' xs={8} sm={8} md={8} lg={8} xl={8}>
                                                        <ProgressBar variant={pokemonDetails.stats[3].base_stat < 50 ? "danger" : "info"} now={pokemonDetails.stats[3].base_stat} />
                                                    </Col>
                                                </Row>
                                            {/* sp.def */}
                                                <Row>
                                                    <Col className='stat-name px-4 py-1' xs={2} sm={2} md={2} lg={2} xl={2}>
                                                        <p>Sp. Def</p>
                                                    </Col>
                                                    <Col className='stat-numbers px-4 py-1' xs={1} sm={1} md={1} lg={1} xl={1}>
                                                        <p>{pokemonDetails.stats[4].base_stat}</p>
                                                    </Col>
                                                    <Col className='px-4 py-2' xs={8} sm={8} md={8} lg={8} xl={8}>
                                                        <ProgressBar variant={pokemonDetails.stats[4].base_stat < 50 ? "danger" : "info"} now={pokemonDetails.stats[4].base_stat} />
                                                    </Col>
                                                </Row>
                                            {/* speed */}
                                                <Row>
                                                    <Col className='stat-name px-4 py-1' xs={2} sm={2} md={2} lg={2} xl={2}>
                                                        <p>Speed</p>
                                                    </Col>
                                                    <Col className='stat-numbers px-4 py-1' xs={1} sm={1} md={1} lg={1} xl={1}>
                                                        <p>{pokemonDetails.stats[5].base_stat}</p>
                                                    </Col>
                                                    <Col className='px-4 py-2' xs={8} sm={8} md={8} lg={8} xl={8}>
                                                        <ProgressBar variant={pokemonDetails.stats[5].base_stat < 50 ? "danger" : "info"} now={pokemonDetails.stats[5].base_stat} />
                                                    </Col>
                                                </Row>                                              
                                                                                               
                                            </div>
                                        </Tab>
                                    </Tabs>

                                    
                                   
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