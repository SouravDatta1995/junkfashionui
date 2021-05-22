import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, FormControl, Row, Table} from "react-bootstrap";
import axios from "axios";
import {API_URL, defaultCustomer} from "../../Constants";
import CustomerModal from "./CustomerModal";

function Customer() {

    const [customerList, setCustomerList] = useState([defaultCustomer]);

    const [searchText, setSearchText] = useState("");
    const fetchAllCustomer = () => {
        axios.get(API_URL + "/customer").then(
            res => setCustomerList(res.data)
        ).catch(
            err => console.log(err)
        )
    }

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
        fetchAllCustomer()
    }
    const handleShow = () => setShow(true);

    useEffect(() => {
        let timeOut = setTimeout(() => {
            searchText === ""
                ? fetchAllCustomer()
                : axios.post(API_URL + "/customer/search",{customerName : searchText,customerPhone : searchText})
                    .then(res => setCustomerList(res.data))
                    .catch(err => console.log(err))
        }, 1000)
        return () => clearTimeout(timeOut)
    }, [searchText]);

    return (
        <Container>
            <Card className={"mb-3"}>
                <Card.Body>
                    <Row>
                        <Col>
                            <Button onClick={handleShow}>Add new customer</Button>
                        </Col>
                        <Col>
                            <FormControl type={"search"}
                                         onChange={e => setSearchText(e.target.value)} placeholder={"Type to search"}/>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Customer Name</th>
                    <th>Customer Phone</th>
                    <th>Customer Address</th>
                </tr>
                </thead>
                <tbody>

                {customerList.map(customer => <tr key={customer.id}>
                    <td>{customer.customerName}</td>
                    <td>{customer.customerPhone}</td>
                    <td>{customer.customerAddress}</td>
                </tr>)}
                </tbody>
            </Table>
            <CustomerModal show={show} onHide={handleClose}/>
        </Container>
    );
}

export default Customer;