import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, FormControl, Row, Table} from "react-bootstrap";
import axios from "axios";
import {API_URL, defaultProduct} from "../../Constants";
import InventoryModal from "./InventoryModal";

function Inventory() {

    const [productList, setProductList] = useState([defaultProduct]);

    const [searchText, setSearchText] = useState("");
    const fetchAllProduct = () => {
        axios.get(API_URL + "product/").then(
            res => setProductList(res.data)
        ).catch(
            err => console.log(err)
        )
    }

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
        fetchAllProduct()
    }
    const handleShow = () => setShow(true);

    useEffect(() => {
        let timeOut = setTimeout(() => {
            searchText === ""
                ? fetchAllProduct()
                : axios.post(API_URL + "/product/search", {productName: searchText})
                    .then(res => setProductList(res.data))
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
                            <Button onClick={handleShow}>Add new item</Button>
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
                    <th>Product Name</th>
                    <th>Product Price</th>
                    <th>Selling Price</th>
                    <th>Stock</th>
                </tr>
                </thead>
                <tbody>

                {productList.map(product => <tr key={product.id}>
                    <td>{product.productName}</td>
                    <td>{product.productPrice}</td>
                    <td>{product.sellingPrice}</td>
                    <td>{product.stock}</td>
                </tr>)}
                </tbody>
            </Table>
            <InventoryModal show={show} onHide={handleClose}/>
        </Container>
    );
}

export default Inventory;