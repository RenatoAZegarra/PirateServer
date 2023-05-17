import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Main = ({ pirates, setPirates }) => {
    // get the data right away
    useEffect(() => {
        // make the call to the server
        axios
            .get('http://localhost:8000/api/pirates')
            .then((serverRes) => {
                console.log('✅ SERVER SUCCESS => ', serverRes.data);
                const sortedPirates = serverRes.data.sort((a, b) => a.name.localeCompare(b.name));
                setPirates(sortedPirates);
            })
            .catch((err) => {
                console.log('❌ SERVER ERROR', err);
            });
    }, []);

    // Delete
    const deletePirate = (pirateId) => {
        console.log('delete', pirateId);
        axios
            .delete(`http://localhost:8000/api/pirates/${pirateId}`)
            .then((res) => {
                console.log(res.data);
                setPirates(pirates.filter((pirate) => pirate._id !== pirateId));
            })
            .catch((err) => console.log(err));
    };
    return (
        <Container style={{ background: 'yellow' }}>
            <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>
                Pirate Crew
            </h1>
                <Link to="/pirate/new" className="btn btn-primary ml-auto">Add Pirate</Link>
            </div>
            <Row style={{ background: 'red', padding: '20px' }}>
                {pirates.map((pirate) => (
                    <Col sm={6} md={4} lg={3} key={pirate._id}>
                        <Card className="mb-4">
                            <Card.Img variant="top" src={pirate.image} alt={pirate.name} />
                            <Card.Body>
                                <Card.Title>{pirate.name}</Card.Title>
                                <div className="d-flex justify-content-between">
                                    <Link to={`/pirate/${pirate._id}`} className="btn btn-primary">View Pirate</Link>
                                    <Button variant="danger" onClick={() => deletePirate(pirate._id)}>Walk the Plank</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Main;