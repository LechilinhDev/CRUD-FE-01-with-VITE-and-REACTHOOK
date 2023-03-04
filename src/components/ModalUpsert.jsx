import axios from '../../axios';
import { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


const ModalUpsert = (props) => {

    const [tutorial, setTutorial] = useState({
        id: "",
        title: "",
        description: "",
        published: ""
    });

    const { getListTutorials, setShowModal, action, show, dataModal } = props;
    useEffect(() => {
        if (dataModal && dataModal.id) {
            setTutorial(dataModal);
        }
    }, [dataModal])

    const handleSubmit = async () => {
        if (action === 'C') {
            await axios.post('/', { ...tutorial })
        } else {
            await axios.put(`/${tutorial.id}`, { ...tutorial })
        }
        getListTutorials();
        setShowModal(false);
        setTutorial({
            id: "",
            title: "",
            description: "",
            published: ""
        })

    }
    const handleInputChange = (event) => {
        setTutorial({
            ...tutorial,
            [event.target.name]: event.target.value
        });


    }

    return (

        <>

            <Modal show={show} onHide={() => setShowModal(false)} >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {action === 'C' ? 'Create a new Tutorial' : 'Update the Tutorial'}

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="Form.ControlInputTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Mastering Reactjs"
                                name='title'
                                autoFocus
                                value={tutorial.title}
                                onChange={(event) => handleInputChange(event)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="Form.ControlInput.Description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="React and Vite..."
                                name='description'
                                value={tutorial.description}
                                autoFocus
                                onChange={(event) => handleInputChange(event)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Publish:</Form.Label>
                            <Form.Select
                                aria-label="Default select example"
                                name='published'
                                value={tutorial.published}
                                onChange={(event) => handleInputChange(event)}
                            >

                                <option value={true}>True</option>
                                <option value={false}>false</option>
                            </Form.Select>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmit()}>SaveChange</Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}

export default ModalUpsert