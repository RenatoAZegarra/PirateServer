import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const PirateForm = ({ pirates, setPirates }) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [treasure, setTreasure] = useState(0);
    const [phrase, setPhrase] = useState('');
    const [position, setPosition] = useState('Powder Monkey');
    const [pegleg, setPegleg] = useState(true);
    const [eyepatch, setEyepatch] = useState(true);
    const [hookhand, setHookhand] = useState(true);
    const [errors, setErrors] = useState([]);

    const nav = useNavigate()

    const createPirate = (event) => {
        event.preventDefault();

        const tempObjToSendToServer = {
            name,
            image,
            treasure,
            phrase,
            position,
            pegleg,
            eyepatch,
            hookhand
        }
        axios
            .post('http://localhost:8000/api/pirates', tempObjToSendToServer)
            .then((serverRes) => {
                console.log('✅', serverRes.data);
                setPirates([...pirates, serverRes.data]);
                nav('/pirates')
            })
            .catch((err) => {
                console.log('❌', err);
                const errorResponseObj = err.response.data.errors;
                const errorArr = Object.values(errorResponseObj).map((error) => error.message);
                setErrors(errorArr);
            });
    };

    return (
        <div style={{ background: 'red', padding: '20px' }}>
                <div style={{ textAlign: 'center', background: 'yellow'}}>
            <h1>Add Pirate</h1><Link to ="/pirates">Crew Board</Link>
            </div>
            {errors.map((err, index) => <p style={{color: "white"}}key={index}>{err}</p>)}
            <Form onSubmit={createPirate} >
                <Form.Group controlId="name">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="image">
                    <Form.Label>Image URL:</Form.Label>
                    <Form.Control
                        type="text"
                        value={image}
                        onChange={(event) => setImage(event.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="treasure">
                    <Form.Label>Number of treasures:</Form.Label>
                    <Form.Control
                        type="number"
                        value={treasure}
                        onChange={(event) => setTreasure(event.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="phrase">
                    <Form.Label>Catch phrase:</Form.Label>
                    <Form.Control
                        type="text"
                        value={phrase}
                        onChange={(event) => setPhrase(event.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="position">
                    <Form.Label>Position:</Form.Label>
                    <Form.Control
                        as="select"
                        value={position}
                        onChange={(event) => setPosition(event.target.value)}
                    >
                        <option value="Captain">Captain</option>
                        <option value="First Mate">First Mate</option>
                        <option value="Quarter Master">Quarter Master</option>
                        <option value="Bootswain">Bootswain</option>
                        <option value="Powder Monkey">Powder Monkey</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="pegleg">
                    <Form.Check
                        type="checkbox"
                        label="Pegleg"
                        checked={pegleg}
                        onChange={(event) => setPegleg(event.target.checked)}
                    />
                </Form.Group>

                <Form.Group controlId="eyepatch">
                    <Form.Check
                        type="checkbox"
                        label="Eyepatch"
                        checked={eyepatch}
                        onChange={(event) => setEyepatch(event.target.checked)}
                    />
                </Form.Group>

                <Form.Group controlId="hookhand">
                    <Form.Check
                        type="checkbox"
                        label="Hook hand"
                        checked={hookhand}
                        onChange={(event) => setHookhand(event.target.checked)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add Pirate
                </Button>
            </Form>
        </div>

    );
};

export default PirateForm;