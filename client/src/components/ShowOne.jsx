import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'


const ShowOne = (props) => {
    // state vars to display
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [treasure, setTreasure] = useState(0);
    const [phrase, setPhrase] = useState('');
    const [position, setPosition] = useState('Powder Monkey');
    const [pegleg, setPegleg] = useState(true);
    const [eyepatch, setEyepatch] = useState(true);
    const [hookhand, setHookhand] = useState(true);


    // get the id from the :id in the route
    const { id } = useParams();


    useEffect(() => {
        // go to the server route, get the obj
        axios.get(`http://localhost:8000/api/pirates/${id}`)
            .then(serverRes => {
                setName(serverRes.data.name)
                setImage(serverRes.data.image)
                setTreasure(serverRes.data.treasure)
                setPhrase(serverRes.data.phrase)
                setPosition(serverRes.data.position)
                setPegleg(serverRes.data.pegleg)
                setEyepatch(serverRes.data.eyepatch)
                setHookhand(serverRes.data.hookhand)
            })
            .catch(serverErr => console.log(serverErr))
    }, [id])
    return (
        <div style={{ textAlign: 'center', background: 'yellow'}}>
        <div className="mt-5" style={{ textAlign: 'center', background: 'yellow', padding: '10px' }}>
            <h1>{name}</h1>
        </div>
        <div style={{ background: 'red', padding: '20px' }}>
            <Card className="my-4">
                <Row>
                    <Col md={6}>
                        <div className=" align-items-center" style={{textAlign:'center'}}>
                            <Image src={image} alt={name} fluid rounded className="w-75 h-75" />
                            <h2>"{phrase}"</h2>
                        </div>
                    </Col>
                    <Col md={6}>
                        <Card.Body style={{textAlign:'center'}}>
                            <Card.Text><h3>About</h3></Card.Text>
                            <div>
                                <p>Position: {position}</p>
                                <p>Treasures: {treasure}</p>
                                <p>Peg Leg: {pegleg ? 'Yes' : 'No'}</p>
                                <p>Eye Patch: {eyepatch ? 'Yes' : 'No'}</p>
                                <p>Hook Hand: {hookhand ? 'Yes' : 'No'}</p>
                            </div>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </div>
            <Link to = {'/pirates'}>View All Pirates</Link>
        </div>
    );
};


export default ShowOne