import React, {useState} from 'react';
import {Button, ButtonGroup, Form, FormControl, Modal} from "react-bootstrap";
import {AiOutlineClose, BiPencil, BiPlus} from "react-icons/all";
import axios from "axios";
import {API_URL, defaultProduct} from "../../Constants";

function InventoryModal(props) {

    const [updateState, setUpdateState] = useState(false);

    const updateToggleHandler = () => {
        setUpdateState(!updateState)
    }

    const [product, setProduct] = useState(defaultProduct);

    const addNewProduct = () => {
        axios.post(API_URL + "/product/add", product)
            .then(
                res => {
                    alert(res.data)
                    props.onHide()

                }
            )
            .catch(
                err => alert("Failed to add product")
            )
    }

    return (
        <Modal {...props} centered>
            <Modal.Header>
                <Modal.Title>Add product</Modal.Title>
                <ButtonGroup>
                    {updateState ? <Button variant={"success"} onClick={updateToggleHandler}
                                           className={"shadow-none"}><BiPlus/></Button> :
                        <Button variant={"warning"} onClick={updateToggleHandler} className={"shadow-none"}><BiPencil/></Button>}
                    <Button variant={"danger"} className={"shadow-none m-0"}
                            onClick={props.onHide}><AiOutlineClose/></Button>
                </ButtonGroup>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormControl type={"text"} placeholder={"Product Name"} className={"mb-2"}
                                 value={product.productName}
                                 onChange={e => setProduct({...product, productName: e.target.value})}/>
                    <FormControl type={"decimal"} placeholder={"Buying Price"} className={"mb-2"}
                                 value={product.productPrice}
                                 onChange={e => setProduct({...product, productPrice: Number(e.target.value)})}/>
                    <FormControl type={"decimal"} placeholder={"Selling Price"} className={"mb-2"}
                                 value={product.sellingPrice}
                                 onChange={e => setProduct({...product, sellingPrice: Number(e.target.value)})}/>
                    <FormControl type={"number"} placeholder={"Stock"} className={"mb-2"}
                                 value={product.stock}
                                 onChange={e => setProduct({...product, stock: Number(e.target.value)})}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={addNewProduct}>Submit</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default InventoryModal;