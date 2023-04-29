import React from 'react';
import { Spinner, Row, Col } from 'react-bootstrap';

const Loader = () => {
    return (
        <div 
            className='d-flex justify-content-center mt-5'
            style={{ height: '100vh' }}
        >
            <Row>
                <Col>
                    <Spinner
                        className='spinner-border spinner-border-lg spinner_msg'
                        role='status'
                        style={{ height: '8vh', width: '8vh' }}
                    >
                    </Spinner>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className='mx-3 spinner_msg'>
                        <h3>Fetching Pokemon...</h3>
                    </div>
                </Col>
            </Row>

        </div>
    )
}

export default Loader;