import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import ModalUpsert from './ModalUpsert';
import axios from '../../axios';
const TableList = () => {
    const [listTutorials, setListTutorials] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState('C');
    const [dataModal, setDataModal] = useState({});
    useEffect(() => {
        getListTutorials();
    }, [])

    const getListTutorials = async () => {
        const res = await axios.get("/");
        setListTutorials(res);
    }
    const handleDelete = async (id) => {
        if (confirm(`Are you sure to delete this tutorial, id = ${id}`)) {
            await axios.delete(`/${id}`);
            await getListTutorials();
        }
    }
    const handleEdit = async (id) => {

    }

    return (
        <>
            <Button variant="primary" onClick={() => {
                setShowModal(true);
                setAction('C')
            }}>
                Create New Tutorial
            </Button>
            <ModalUpsert
                getListTutorials={getListTutorials}
                show={showModal}
                action={action}
                setShowModal={setShowModal}
                dataModal={dataModal}
            />
            <Table striped bordered hover className='mt-2'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Publish</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listTutorials.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                                <td>{"" + item.published}</td>
                                <td>
                                    <Button className="btn btn-warning mx-3 d-inline-block" onClick={() => {
                                        handleEdit(item.id)
                                        setAction('U')
                                        setShowModal(true);

                                        setDataModal(item);
                                    }

                                    }>Edit</Button>
                                    <Button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</Button>
                                </td>
                            </tr>
                        )
                    })}


                </tbody>
            </Table>

        </>

    )
}

export default TableList;