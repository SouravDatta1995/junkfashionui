import React,{useState} from 'react';
import {API_URL, defaultCustomer, defaultProduct} from "../../Constants";
import axios from "axios";
import {Button, ButtonGroup, Form, FormControl, Modal} from "react-bootstrap";
import {AiOutlineClose, BiPencil, BiPlus} from "react-icons/all";

function CustomerModal(props) {
    const [updateState, setUpdateState] = useState(false);

    const updateToggleHandler = () => {
        setUpdateState(!updateState)
    }

    const [customer, setCustomer] = useState(defaultCustomer);

    const addNewCustomer = () => {
        axios.post(API_URL + "/customer/add", customer)
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
                    <FormControl type={"text"} placeholder={"Customer Name"} className={"mb-2"}
                                 value={customer.customerName}
                                 onChange={e => setCustomer({...customer, customerName: e.target.value})}/>
                    <FormControl type={"decimal"} placeholder={"Customer Phone"} className={"mb-2"}
                                 value={customer.customerPhone}
                                 onChange={e => setCustomer({...customer, customerPhone:e.target.value})}/>
                    <FormControl type={"decimal"} placeholder={"Customer Address"} className={"mb-2"}
                                 value={customer.customerAddress}
                                 onChange={e => setCustomer({...customer, customerAddress:e.target.value})}/>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={addNewCustomer}>Submit</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CustomerModal;